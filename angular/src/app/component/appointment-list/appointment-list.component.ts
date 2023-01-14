import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Appointment } from '../appointment/appointment';
import { AppointmentService } from 'src/app/service/appointment.service';
import { VaccinationService } from 'src/app/service/vaccination.service';
import { VaccinationCenter } from '../vaccination-center/vaccination-center';
import { LoginService } from 'src/app/service/login.service';
import { NgxPermission } from 'ngx-permissions/lib/model/permission.model';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent implements OnInit {

  appointments!: Appointment[];
  selected?: Appointment;
  center?: VaccinationCenter;
  id_user: number;
  appointment: Appointment;

  word = '';
  infos = '';
  constructor(
              private service: AppointmentService,
              private vaccinationService: VaccinationService,
              private loginService: LoginService,
              private httpClient: HttpClient,
              private ngxPermissionsService: NgxPermissionsService
            ) {}

  ngOnInit(): void {

    this.httpClient.get<number>("api/user",{
      params: {"login": this.loginService.getUtilisateur()}})
      .subscribe(id_patient=>{this.id_user = id_patient;});
    console.log(this.id_user)
    this.service.getAppointmentsByPatient(this.id_user).subscribe(resultAppointments=>{this.appointments = resultAppointments;});

    this.service.getAllAppointments().subscribe(resultAppointments=>{this.appointments = resultAppointments;});
    this.ngxPermissionsService.loadPermissions(['DEVELOPER'])

  }


  selectAppointment(appointment: Appointment){
    if(this.selected!=appointment){
      this.selected=appointment;
      console.log(this.selected.id_vaccination_center);
      this.getVaccinationCenter(appointment.id_vaccination_center);
      if (this.center != null)
        console.log(this.center.name);
    }
    else{
      delete this.selected;
    }
  }

  deleteAppointment(appointment: Appointment){
    this.service.deleteAppointmentById(appointment.id_appointment);
  }

  getVaccinationCenter(id?: number){
    if(id != null)
      return this.vaccinationService.getVaccinationCenterById(id).subscribe(resultCenter=>{
        this.center = resultCenter;
      });
    else
      return null;
  }

  onDeleted(appointment: Appointment){
    delete this.selected;
    this.appointments.splice(this.appointments.indexOf(appointment,1))
  }

}
