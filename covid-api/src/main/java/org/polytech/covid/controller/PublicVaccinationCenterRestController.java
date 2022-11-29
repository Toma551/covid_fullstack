package org.polytech.covid.controller;

//import java.util.Arrays;
import java.util.List;
import io.github.bucket4j.*;
import org.polytech.covid.entity.VaccinationCenter;
import org.polytech.covid.repository.VaccinationCenterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.time.Duration;

import org.polytech.covid.dto.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.time.Duration;

@RestController
public class PublicVaccinationCenterRestController {
    
    @Autowired
    private VaccinationCenterRepository centerRepository;

    //rajoute 10 tokens toutes les minutes
    Refill refill = Refill.intervally(10, Duration.ofMinutes(1));
    //capacité max de 10 token
    Bandwidth limit = Bandwidth.classic(10, refill);
    Bucket bucket = Bucket.builder().addLimit(limit).build();
    final String remainning = "X-Rate-Limit-Remaining";
    final String retryAfter = "X-Rate-Limit-Retry-After-Seconds";
    
    
    /* 
    private static final List<VaccinationCenter> CENTERS = Arrays.asList(
        new VaccinationCenter(1,"test","addr","54","nancy",null),
        new VaccinationCenter(2,"test2","addr2","55","verdun",null),
        new VaccinationCenter()
    );*/

    @GetMapping(path = "api/public/centers")
    public ResponseEntity<List<VaccinationCenter>> getVaccinationCenter(
            // @RequestParam(value="city", required=false) String city) {
            //     if(city == null)
            //         return centerRepository.findAllCenters();
            //     else
            //         return centerRepository.findAllByCityIgnoreCaseLike(city+"%");     
            // }  



            @RequestParam(value="city", required=false) String city) {
                if(bucket.tryConsume(1)) {
                    if(city == null)
                        return ResponseEntity.ok(centerRepository.findAllCenters());
                    else
                        return ResponseEntity.ok(centerRepository.findAllByCityIgnoreCaseLike(city+"%"));
                }
                return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).build();
                         
                }  



    @GetMapping(path = "api/public/center")
    public VaccinationCenter getVaccinationCenter(        
            @RequestParam("id") Integer id) {
                //return centerRepository.findAll();
                return centerRepository.findById(id).orElse(null);
            }


    @CrossOrigin(exposedHeaders = {remainning, retryAfter})
    @GetMapping(path = "api/public/infos/429")
    public ResponseEntity<Data> infos() {
        HttpHeaders headers = new HttpHeaders();
        ConsumptionProbe probe = bucket.tryConsumeAndReturnRemaining(2);

        if(probe.isConsumed()) {
            headers.add("X-Rate-Limit-Remaining", Long.toString(probe.getRemainingTokens()));
            return ResponseEntity.ok()
                    .headers(headers)
                    .body(new Data("infos"));
        }

        long delaiEnSeconde = probe.getNanosToWaitForRefill() / 1_000_000_000;
        headers.add("X-Rate-Limit-Retry-After-Seconds",String.valueOf(delaiEnSeconde));
        return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                .headers(headers)
                .build();
    }
}
