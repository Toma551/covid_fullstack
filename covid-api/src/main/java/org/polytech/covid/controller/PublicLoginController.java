package org.polytech.covid.controller;

import org.polytech.covid.entity.Utilisateur;
import org.polytech.covid.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import io.micrometer.core.instrument.MeterRegistry;

@RestController

public class PublicLoginController {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    MeterRegistry meterRegistry;
    
    public PublicLoginController(MeterRegistry meterRegistry) {
        this.meterRegistry = meterRegistry;
    }
    
    @GetMapping(path = "api/login")
    public ResponseEntity<Void>  sendOK() {
        meterRegistry.counter("nbLooged").increment();
        return ResponseEntity.ok().build();
    }

    // @GetMapping(path = "api/role")
    // public ResponseEntity<String> sendRole(@RequestParam("username") String username) {
    //      {
    //         Utilisateur utilisateur = utilisateurRepository.findByLogin(username).get();
    //         String role = utilisateur.getRole();
    //         //return ResponseEntity.ok(utilisateurRepository.findByLogin(username).get());
    //         return ResponseEntity.ok(role);
    // }
    // }

    @GetMapping(path = "api/role")
    public String sendRole(@RequestParam("username") String username) {
         {
            Utilisateur utilisateur = utilisateurRepository.findByLogin(username).get();
            String role = utilisateur.getRole();
            //return ResponseEntity.ok(utilisateurRepository.findByLogin(username).get());
            System.out.println("L'utilisateur : "+ username + " a pour rôle : " + role);
            return role;
    }
    }
}

