package org.polytech.covid.repository;

import java.util.List;
import java.util.Optional;

import org.polytech.covid.entity.Doctor;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor,Integer>{
    public List<Doctor> findAllByNameIgnoreCaseLike(String doctor);
    
    @Query("from Doctor v where v.login like :login")
    public Optional<Doctor> findByLogin(@Param("login") String login);
}
