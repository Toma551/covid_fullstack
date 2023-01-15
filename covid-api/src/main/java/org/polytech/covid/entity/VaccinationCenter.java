package org.polytech.covid.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;

@Entity
public class VaccinationCenter {
    public VaccinationCenter() {
    }

    public VaccinationCenter(Integer id_vaccination_center, String name, String adresse, String postal_code, String city,
            List<Appointment> appointments) {
        this.id_vaccination_center = id_vaccination_center;
        this.name = name;
        this.adresse = adresse;
        this.postal_code = postal_code;
        this.city = city;
        this.appointments = appointments;
    }

    @Id
    @GeneratedValue
    private Integer id_vaccination_center;
    private String name;
    private String adresse;
    private String postal_code;
    private String city;

    @OneToMany(mappedBy = "center")
    @JsonIgnore
    private List<Appointment> appointments;

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getAdresse() {
        return adresse;
    }
    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }
    public String getPostal_code() {
        return postal_code;
    }
    public void setPostal_code(String postal_code) {
        this.postal_code = postal_code;
    }
    public String getCity() {
        return city;
    }
    public void setCity(String city) {
        this.city = city;
    }
    public Integer getId_vaccination_center() {
        return id_vaccination_center;
    }
    public void setId_vaccination_center(Integer id_vaccinationCenter) {
        this.id_vaccination_center = id_vaccinationCenter;
    }


}
