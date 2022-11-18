package org.polytech.covid.controller;

import java.util.List;

import org.polytech.covid.entity.Appointment;
import org.polytech.covid.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class PublicAppointmentRestController {
    @Autowired
    private AppointmentRepository appointmentRepository;

    @GetMapping(path = "api/admin/appointment")
    public List<Appointment> getAppointment(
            @RequestParam("date") String date) {
                return appointmentRepository.findAllByDateIgnoreCaseLike(date+"%");
            }
}
