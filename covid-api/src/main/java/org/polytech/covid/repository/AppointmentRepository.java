package org.polytech.covid.repository;

import java.util.List;
import org.polytech.covid.entity.Appointment;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment,Integer>{
}