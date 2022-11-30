package org.polytech.covid.controller;

import org.polytech.covid.entity.Patient;
import org.polytech.covid.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PublicPatientRestController {
    @Autowired
    private PatientRepository patientRepository;

    @GetMapping(path = "api/admin/patient")
    public Patient getPatient(
            @RequestParam("id_patient") Integer id_patient) {
                return patientRepository.findById(id_patient).orElse(null);
            }
}
