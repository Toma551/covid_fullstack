import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VaccinationCenter } from '../vaccination-center/vaccination-center';
import { Appointment } from './appointment';
import { AppointmentService } from 'src/app/service/appointment.service';
import {formatDate} from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/app/service/login.service';


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
  providers: [ { provide: LOCALE_ID, useValue: 'fr-FR'} ]
})
export class AppointmentComponent implements OnInit {

  center!: VaccinationCenter;
  appointment: Appointment = {id_appointment:2, date: "01/01/2000", id_vaccination_center: 1, id_patient:0};
  temp?: Appointment[];

  constructor(private route: ActivatedRoute,
              private readonly router: Router,
              private httpClient: HttpClient,
              private loginService: LoginService,
              private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    const id_vaccination_center = Number(this.route.snapshot.paramMap.get('id_vaccination_center'));
    this.appointment.id_vaccination_center = id_vaccination_center;

    this.httpClient.get<number>("api/user",{
      params: {"login": this.loginService.getUtilisateur()}})
      .subscribe(id_patient=>{this.appointment.id_patient = id_patient;});
  }

  setDateOnChange(event: any) {
    this.appointment.date = formatDate(event.target.value,'dd/MM/yyyy', 'en-US');
  }

  createAppointment(newAppointment: Appointment) {
    this.appointmentService.postAppointment(newAppointment).subscribe(appointment=>{this.appointment = appointment;});
    // this.appointmentService.getAppointmentByDate(newAppointment.date).subscribe(appointment => {this.temp = appointment});
    // console.log(this.temp);
    // if(this.temp == null) {
    //   console.log("AJOUT RDV")
    //   this.appointmentService.postAppointment(newAppointment).subscribe(appointment=>{this.appointment = appointment;});
    //   this.router.navigate(['waiting']);
    // }
    // else
    //   console.log("RDV EXISTE DEJA")

  }

}
