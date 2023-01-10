package org.polytech.covid.repository;

import java.util.List;

import org.polytech.covid.entity.Appointment;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment,Integer>{
    
    @Query("from Appointment v where id_patient = :id_patient")
    public List<Appointment> findByPatientId(@Param("id_patient") Integer id_patient);
}