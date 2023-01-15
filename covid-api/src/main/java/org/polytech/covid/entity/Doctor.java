package org.polytech.covid.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.ForeignKey;

@Entity
public class Doctor{
    @Id
    private Integer id_doctor;
    private String name;
    private String mail;
    private String telephone;
    @JsonIgnore
    private String login; 
    @JsonIgnore 
    private String password;

    public String getLogin() {
        return login;
    }
    public void setLogin(String login) {
        this.login = login;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
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
    public Integer getId_doctor() {
        return id_doctor;
    }
    public void setId_doctor(Integer id_doctor) {
        this.id_doctor = id_doctor;
    }
    
    
}
