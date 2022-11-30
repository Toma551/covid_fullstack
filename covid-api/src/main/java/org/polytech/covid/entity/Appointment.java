package org.polytech.covid.entity;

import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Appointment {
    @Id
    private Integer id_appointment;

    @ManyToOne(optional = false)
    @JoinColumn(name ="id_patient", nullable = false, foreignKey = @ForeignKey(name = "fk_id_patient")) 
    private Patient patient;

    @ManyToOne(optional = false)
    @JoinColumn(name ="id_vaccinationCenter", nullable = false, foreignKey = @ForeignKey(name = "fk_id_vaccinationCenter")) 
    private VaccinationCenter center;

    private String date;

    public Appointment(Integer id_appointment, Patient patient, VaccinationCenter center, String date) {
        this.id_appointment = id_appointment;
        this.patient = patient;
        this.center = center;
        this.date = date;
    }

    public String getDate() {
        return date;
    }
    public void setDate(String date) {
        this.date = date;
    }
    public Integer getId_appointment() {
        return id_appointment;
    }
    public void setId_appointment(Integer id_appointment) {
        this.id_appointment = id_appointment;
    }
    public Patient getPatient() {
        return patient;
    }
    public void setPatient(Patient patient) {
        this.patient = patient;
    }
    public VaccinationCenter getCenter() {
        return center;
    }
    public void setCenter(VaccinationCenter center) {
        this.center = center;
    }

    
    
}
