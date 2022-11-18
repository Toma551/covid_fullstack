package org.polytech.covid.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Patient{
    @Id
    private Integer id_patient;
    private String lastname;
    private String fullname;
    private String birthDate;
    private String mail;
    private String telephone;

    public String getMail() {
        return mail;
    }
    public void setMail(String mail) {
        this.mail = mail;
    }
    public String getTelephone() {
        return telephone;
    }
    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }
    public String getBirthDate() {
        return birthDate;
    }
    public void setBirthDate(String birthDate) {
        this.birthDate = birthDate;
    }
    public String getLastname() {
        return lastname;
    }
    public void setLastname(String lastname) {
        this.lastname = lastname;
    }
    public String getFullname() {
        return fullname;
    }
    public void setFullname(String fullname) {
        this.fullname = fullname;
    }
    public Integer getId_patient() {
        return id_patient;
    }
    public void setId_patient(Integer id_patient) {
        this.id_patient = id_patient;
    }
}
