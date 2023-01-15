package org.polytech.covid.controller;

import java.util.List;

import org.polytech.covid.entity.Appointment;
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
    public Doctor getDoctor(
            @RequestParam("id_doctor") Integer id_doctor) {
                return doctorRepository.findById(id_doctor).orElse(null);
            }

    @GetMapping(path = "api/admin/doctors")
    public List<Doctor> getDoctors() {
                return doctorRepository.findAllDoctors();
            }

    @GetMapping(path = "api/doctor")
    public Integer user(@RequestParam("login") String login) {
        Doctor doctor = new Doctor();
        doctor = doctorRepository.findByLogin(login+"%").orElse(null);
        return doctor.getId_doctor();
    }

    // @GetMapping(path = "api/doctor/rdv")
    // public List<Appointment> getAppointements(
    //     @RequestParam("login") String login){

    //     }

}
