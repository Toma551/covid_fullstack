package org.polytech.covid.controller;

//import java.util.Arrays;
import java.util.List;
import java.time.Duration;

import io.github.bucket4j.*;
import org.polytech.covid.entity.VaccinationCenter;
import org.polytech.covid.repository.VaccinationCenterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PublicVaccinationCenterRestController {
    
    //rajoute 10 tokens toutes les minutes
    Refill refill = Refill.intervally(10, Duration.ofMinutes(1));
    //capacité max de 10 token
    Bandwidth limit = Bandwidth.classic(10, refill);
    Bucket bucket = Bucket.builder().addLimit(limit).build();

    @Autowired
    private VaccinationCenterRepository centerRepository;

    @GetMapping(path = "api/public/centers")
    public ResponseEntity<List<VaccinationCenter>> getVaccinationCenter(
            @RequestParam(value="city", required=false) String city) {
                if(bucket.tryConsume(1)) {
                    if(city == null)
                        return ResponseEntity.ok(centerRepository.findAllCenters());
                    else
                        return ResponseEntity.ok(centerRepository.findAllByCityIgnoreCaseLike(city+"%"));
                }        
                else
                    return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).build();
            }  
    @GetMapping(path = "api/public/center")
    public VaccinationCenter getVaccinationCenter(        
            @RequestParam("id") Integer id) {
                //return centerRepository.findAll();
                return centerRepository.findById(id).orElse(null);
            }
}
