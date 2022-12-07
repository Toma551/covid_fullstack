package org.polytech.covid.controller;

import java.util.List;
import java.util.Map;

import org.polytech.covid.entity.Appointment;
import org.polytech.covid.entity.Patient;
import org.polytech.covid.entity.VaccinationCenter;
import org.polytech.covid.repository.AppointmentRepository;
import org.polytech.covid.repository.PatientRepository;
import org.polytech.covid.repository.VaccinationCenterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class PublicAppointmentRestController {
    @Autowired
    private AppointmentRepository appointmentRepository;
    private PatientRepository patientRepository;
    private VaccinationCenterRepository vaccinationCenterRepository;

    @GetMapping(path = "api/public/appointments")
    public List<Appointment> getAllAppointments(){
        return appointmentRepository.findAll();
    }

    @PostMapping(path = "api/public/booking")
    public ResponseEntity<Appointment> postAppointment(@RequestParam Map<String, String> requestParams) {
                Integer id_patient = Integer.parseInt(requestParams.get("id_patient"));
                Integer id_vaccination_center= Integer.parseInt(requestParams.get("id_vaccination_center"));
                String date= requestParams.get("date");
                Integer id_appointment = Integer.parseInt(requestParams.get("id_appointment"));
                Patient patient = new Patient();
                patient = patientRepository.findById(id_patient).get();
                VaccinationCenter vaccination_center = new VaccinationCenter();
                vaccination_center = vaccinationCenterRepository.findById(id_vaccination_center).get();
                Appointment appointment = new Appointment(id_appointment,patient,vaccination_center,date);
                appointmentRepository.save(appointment);
                return new ResponseEntity<Appointment>(appointment, HttpStatus.CREATED);
            }

    // @PostMapping(path = "api/public/booking")
    // public void postAppointment(        
    //         @RequestParam(name="id_appointment") Integer id_appointment,
    //         @RequestParam(name="date") String date,
    //         @RequestParam(name="id_vaccination_center") Integer id_vaccination_center,
    //         @RequestParam(name="id_patient") Integer id_patient) {
    //             Patient patient = new Patient();
    //             patient = patientRepository.findById(id_patient).get();
    //             VaccinationCenter vaccination_center = new VaccinationCenter();
    //             vaccination_center = vaccinationCenterRepository.findById(id_vaccination_center).get();
    //             Appointment appointment = new Appointment(id_appointment,patient,vaccination_center,date);
    //             appointmentRepository.save(appointment);
    //         }
}