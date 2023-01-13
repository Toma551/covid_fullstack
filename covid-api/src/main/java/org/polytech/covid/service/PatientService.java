package org.polytech.covid.service;
import java.util.List;
import java.util.Optional;

import org.polytech.covid.entity.Patient;
import org.polytech.covid.repository.PatientRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

public class PatientService implements UserDetailsService {
    private static Logger log = LoggerFactory.getLogger(PatientService.class);
    private final PatientRepository patientRepository;
    
    @Autowired
    public PatientService(final PatientRepository patientRepository, PasswordEncoder passwordEncoder) {
        this.patientRepository = patientRepository;
    }

    @Override
    public UserDetails loadUserByUsername(final String login)
            throws UsernameNotFoundException {
        log.info("recuperation du patient {}", login);
    
        Optional<Patient> optionalUtilisateur = patientRepository.findByLogin(login);
        if (optionalUtilisateur.isPresent()) {
            Patient utilisateur = optionalUtilisateur.get();
            return new User(utilisateur.getLogin(), utilisateur.getPassword(), List.of());
        } else {
            throw new UsernameNotFoundException("L'utilisateur" + login + " n'existe pas");
        }
    }
}
