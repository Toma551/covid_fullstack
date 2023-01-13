package org.polytech.covid.repository;

import java.util.List;
import java.util.Optional;

import org.polytech.covid.entity.Appointment;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment,Integer>{

    public Optional<Appointment> findByDate(String Date);
    
    @Query("from Appointment v where id_patient = :id_patient")
    public List<Appointment> findByPatientId(@Param("id_patient") Integer id_patient);
}