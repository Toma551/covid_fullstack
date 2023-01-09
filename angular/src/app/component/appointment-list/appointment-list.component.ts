import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Appointment } from '../appointment/appointment';
import { AppointmentService } from 'src/app/service/appointment.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent implements OnInit {

  appointments!: Appointment[];


  selected?: Appointment;

  search_entry!: String;

  word = '';
  infos = '';
  constructor(
              private service: AppointmentService,
              private readonly http: HttpClient,
              private readonly router: Router
            ) {}

  ngOnInit(): void {
    this.service.getAllAppointments().subscribe(resultCenters=>{
      this.appointments = resultCenters;
    });
  }


  selectCenter(appointment: Appointment){
    if(this.selected!=appointment){
      this.selected=appointment;
    }
    else{
      delete this.selected;
    }
  }

  onDeleted(appointment: Appointment){
    delete this.selected;
    this.appointments.splice(this.appointments.indexOf(appointment,1))
  }

}
