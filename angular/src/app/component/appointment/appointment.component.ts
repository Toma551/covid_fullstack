import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VaccinationCenter } from '../vaccination-center/vaccination-center';
import { VaccinationService } from '../../service/vaccination.service';
import { Appointment } from './appointment';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {

  center!: VaccinationCenter;
  appointment: Appointment = {id_appointment:2, date: new Date('2022-09-12'), id_vaccination_center: 1, id_patient:1};

  constructor(private route: ActivatedRoute, private service: VaccinationService) { }

  ngOnInit(): void {
    const id_vaccination_center = Number(this.route.snapshot.paramMap.get('id_vaccination_center'));
    this.service.getVaccinationCenterById(id_vaccination_center).subscribe(resultCenter=>{
      this.center = resultCenter;
    });
  }

  createAppointment(newAppointment: Appointment) {
    this.service.postAppointment(newAppointment).subscribe(appointment=>{
      this.appointment = appointment;
    });
  }

}
