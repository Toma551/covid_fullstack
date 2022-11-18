package org.polytech.covid.service;

import java.util.List;
import java.util.Optional;

import org.polytech.covid.entity.Doctor;
import org.polytech.covid.repository.DoctorRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class DoctorService implements UserDetailsService {
    private static Logger log = LoggerFactory.getLogger(DoctorService.class);
    private final DoctorRepository doctorRepository;
    
    @Autowired
    public DoctorService(final DoctorRepository doctorRepository, PasswordEncoder passwordEncoder) {
        this.doctorRepository = doctorRepository;
    }

    @Override
    public UserDetails loadUserByUsername(final String login)
            throws UsernameNotFoundException {
        log.info("recuperation de {}", login);
    
        Optional<Doctor> optionalUtilisateur = doctorRepository.findByLogin(login);
        if (optionalUtilisateur.isPresent()) {
            Doctor utilisateur = optionalUtilisateur.get();
            return new User(utilisateur.getLogin(), utilisateur.getPassword(), List.of());
        } else {
            throw new UsernameNotFoundException("L'utilisateur" + login + " n'existe pas");
        }

    }
}
