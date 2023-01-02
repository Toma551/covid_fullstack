import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Appointment } from '../component/appointment/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private httpClient: HttpClient, private router: Router) { }
/*
  postAppointment(appointment: Appointment): Observable<Appointment>{
    const headers= new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    return this.httpClient.post<Appointment>("api/public/test", {
      params: {
        "id_patient": appointment.id_patient,
        "id_vaccination_center": appointment.id_vaccination_center,
        "date": appointment.date,
        "id_appointment": appointment.id_appointment
      }
    },
    {'headers': headers}
    );
  }
*/
  postAppointment(newAppointment: Appointment) {
    return this.httpClient.get<Appointment>('api/public/test',
    {params:
      {
        "id_patient": newAppointment.id_patient,
        "id_vaccination_center": newAppointment.id_vaccination_center,
        "date": newAppointment.date,
        "id_appointment": newAppointment.id_appointment
      }
     })
}
}
