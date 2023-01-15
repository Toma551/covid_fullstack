import { Component, OnInit } from '@angular/core';
import { Doctor } from './doctor';
import { DoctorService } from '../../service/doctor.service';
import { PatientService } from '../../service/patient.service';
import { Patient } from './patient';


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  doctors!: Doctor[];
  patients!: Patient[];

  selected?: Doctor;
  selected_patient?: Patient;

  constructor(
    private service: DoctorService,
    private service_patient: PatientService
  ) { }

  ngOnInit(): void {
    this.service.getAllDoctors().subscribe(resultDoctors=>{
      this.doctors = resultDoctors;
      console.log("docteurs : " + this.doctors)
    });

    this.service_patient.getAllPatients().subscribe(resultPatients=>{
      this.patients = resultPatients;
      console.log("patients : " + this.patients)
    });
  }

  selectDoctor(doctor: Doctor){
    if(this.selected!=doctor){
      console.log("sélectionné");
      this.selected=doctor;
      console.log(this.selected);
    }
    else{
      delete this.selected;
    }
  }

  selectPatient(patient: Patient){
    if(this.selected_patient!=patient){
      console.log("sélectionné");
      this.selected_patient=patient;
      console.log(this.selected_patient);
    }
    else{
      delete this.selected_patient;
    }
  }

}
