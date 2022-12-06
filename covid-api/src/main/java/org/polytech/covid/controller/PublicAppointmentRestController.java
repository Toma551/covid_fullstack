package org.polytech.covid.controller;

import java.util.List;
import java.util.Optional;

import org.polytech.covid.entity.Appointment;
import org.polytech.covid.entity.Patient;
import org.polytech.covid.repository.AppointmentRepository;
import org.polytech.covid.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class PublicAppointmentRestController {
    @Autowired
    private AppointmentRepository appointmentRepository;
    private PatientRepository patientRepository;
    
    // @GetMapping(path = "api/admin/appointment")
    // public List<Appointment> getAppointment(
    //         @RequestParam("date") String date) {
    //             return appointmentRepository.findAllByDateIgnoreCaseLike(date+"%");
    //         }

    @GetMapping(path = "api/admin/appointment")
    public void postAppointment(        
            @RequestParam("id_appointment") Integer id_appointment,
            @RequestParam("date") String date,
            @RequestParam("id_vaccination_center") Integer id_vaccination_center,
            @RequestParam("id_patient") Integer id_patient) {
                Patient patient = new Patient();
                patient = patientRepository.findById(id_patient).get();
                Appointment appointment = new Appointment(id_appointment,date,id_vaccination_center,patient);
                appointmentRepository.save(appointment);
            }
}