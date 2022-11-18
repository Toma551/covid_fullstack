package org.polytech.covid.controller;

//import java.util.Arrays;
import java.util.List;

import org.polytech.covid.entity.VaccinationCenter;
import org.polytech.covid.repository.VaccinationCenterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PublicVaccinationCenterRestController {
    
    @Autowired
    private VaccinationCenterRepository centerRepository;

    /* 
    private static final List<VaccinationCenter> CENTERS = Arrays.asList(
        new VaccinationCenter(1,"test","addr","54","nancy",null),
        new VaccinationCenter(2,"test2","addr2","55","verdun",null),
        new VaccinationCenter()
    );*/

    @GetMapping(path = "api/public/centers")
    public List<VaccinationCenter> getVaccinationCenter(
            @RequestParam(value="city", required=false) String city) {
                if(city == null)
                    return centerRepository.findAllCenters();
                else
                    return centerRepository.findAllByCityIgnoreCaseLike(city+"%");
            }  
    @GetMapping(path = "api/public/center")
    public VaccinationCenter getVaccinationCenter(        
            @RequestParam("id") Integer id) {
                //return centerRepository.findAll();
                return centerRepository.findById(id).orElse(null);
            }
}
