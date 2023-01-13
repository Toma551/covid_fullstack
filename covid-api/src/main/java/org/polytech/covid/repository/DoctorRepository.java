package org.polytech.covid.repository;

import java.util.List;
import java.util.Optional;

import org.polytech.covid.entity.Doctor;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor,Integer>{
    public List<Doctor> findAllByNameIgnoreCaseLike(String doctor);
    
    Optional<Doctor> findByLogin(final String email);

    String findRole(final String id);
}
