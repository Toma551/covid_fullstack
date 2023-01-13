package org.polytech.covid.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity(name = "UTILISATEUR")
public class Utilisateur {
    @Id
    @GeneratedValue
    private Long id;
    private String login;
    private String password;
    private String role;
    
    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Long getId() {
        return id;
    }
    
    public void setId(final Long id) {
        this.id = id;
    }
    
    public String getLogin() {
        return login;
    }
    
    public void setLogin(final String email) {
        this.login = email;
    }
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(final String password) {
        this.password = password;
    }
    
}
