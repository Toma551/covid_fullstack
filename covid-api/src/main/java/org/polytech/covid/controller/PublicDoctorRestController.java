package org.polytech.covid.controller;

import java.util.List;

import org.polytech.covid.entity.Doctor;
import org.polytech.covid.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@RestController
public class PublicDoctorRestController {
    @Autowired
    private DoctorRepository doctorRepository;

    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @GetMapping(path = "api/admin/doctor")
    public List<Doctor> getDoctor(
            @RequestParam("name") String name) {
                return doctorRepository.findAllByNameIgnoreCaseLike(name+"%");
            }

    @GetMapping(path = "api/user")
    public Doctor user(@RequestParam("login") String login) {
        return doctorRepository.findByLogin(login+"%").orElse(null);
    }
    @GetMapping(path = "api/encodage")
    public String password(@RequestParam("password") String password) {
        System.out.println("Encodage !!!!");
        return encoder.encode("titi");
    }

}
