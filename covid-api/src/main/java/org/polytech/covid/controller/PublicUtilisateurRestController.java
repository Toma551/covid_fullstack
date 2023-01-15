package org.polytech.covid.controller;
import java.util.List;

import org.apache.tomcat.websocket.Util;
import org.polytech.covid.entity.Doctor;
import org.polytech.covid.entity.Utilisateur;
import org.polytech.covid.repository.DoctorRepository;
import org.polytech.covid.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PublicUtilisateurRestController {
    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @GetMapping(path = "api/user")
    public Integer user(@RequestParam("login") String login) {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur = utilisateurRepository.findByLogin(login+"%").orElse(null);
        return utilisateur.getId();
    }
    
}
