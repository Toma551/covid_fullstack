package org.polytech.covid.repository;

import java.util.List;
import java.util.Optional;

import org.checkerframework.checker.nullness.Opt;
import org.polytech.covid.entity.VaccinationCenter;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;

@Repository
public interface VaccinationCenterRepository extends JpaRepository<VaccinationCenter,Integer>{
    public List<VaccinationCenter> findAllByCityIgnoreCaseLike(String city);

    public Optional<VaccinationCenter> findById(Integer id);

    @Query("from VaccinationCenter")
    public List<VaccinationCenter> findAllCenters();
    /*
    @Query("from VaccinationCenter v where v.city like :city")
    public List<VaccinationCenter> findAllByCity(@Param("city") String city);
    */  

}   
