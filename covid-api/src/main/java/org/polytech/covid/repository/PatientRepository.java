package org.polytech.covid.repository;

import java.util.Optional;

import org.polytech.covid.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientRepository extends JpaRepository<Patient,Integer>{
    public Optional<Patient> findById(Integer id);
}
