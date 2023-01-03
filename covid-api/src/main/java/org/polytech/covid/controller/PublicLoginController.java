package org.polytech.covid.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import io.micrometer.core.instrument.MeterRegistry;

@RestController

public class PublicLoginController {

    MeterRegistry meterRegistry;
    
    public PublicLoginController(MeterRegistry meterRegistry) {
        this.meterRegistry = meterRegistry;
    }
    
    @GetMapping(path = "api/login")
    public ResponseEntity<Void>  sendOK() {
        meterRegistry.counter("nbLooged").increment();
        return ResponseEntity.ok().build();
    }
}
