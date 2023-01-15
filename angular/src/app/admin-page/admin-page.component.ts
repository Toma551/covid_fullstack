import { Component, OnInit } from '@angular/core';
import { Doctor } from './doctor';
import { DoctorService } from '../service/doctor.service';


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  doctors!: Doctor[];

  selected?: Doctor;

  constructor(
    private service: DoctorService,
  ) { }

  ngOnInit(): void {
    this.service.getAllDoctors().subscribe(resultDoctors=>{
      this.doctors = resultDoctors;
      console.log("docteurs : " + this.doctors)
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

}
