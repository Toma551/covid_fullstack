package org.polytech.covid.controller;

import java.util.List;

import org.polytech.covid.entity.Doctor;
import org.polytech.covid.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PublicDoctorRestController {
    @Autowired
    private DoctorRepository doctorRepository;

    @GetMapping(path = "api/admin/doctor")
    public List<Doctor> getDoctor(
            @RequestParam("name") String name) {
                return doctorRepository.findAllByNameIgnoreCaseLike(name+"%");
            }
}
