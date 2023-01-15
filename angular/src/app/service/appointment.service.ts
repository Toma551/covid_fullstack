import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Appointment } from '../component/appointment/appointment';
import { VaccinationCenter } from '../component/vaccination-center/vaccination-center';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  getAllAppointments(): Observable<Appointment[]>{
    return this.httpClient.get<Appointment[]>("api/public/all_appointments",{observe: 'response'})
      .pipe(
        map((resp)=>{
          if(!!resp.body){
            return resp.body
          }
          return []
        }),
        catchError((err) => {
          console.log(err.status)
          const temps =  err.headers.get('x-rate-limit-retry-after-seconds')
          this.router.navigate(['waiting']);
          return []
        })
    );
  }

  getAppointmentsByPatient(id_patient:number): Observable<Appointment[]>{
    return this.httpClient.get<Appointment[]>("api/public/appointments",{
      params: {
        "id_patient": id_patient
      }
    });
  }

  getAppointmentByDate(Date:string): Observable<any>{
    return this.httpClient.get("api/public/appointment",{
      params: {
        "date": Date
      }
    });
  }

  getAppointmentByDateAndCenterId(Date:string,id_vaccination_center: number): Observable<any>{
    return this.httpClient.get("api/public/appointment",{
      params: {
        "date": Date,
        "id_vaccination_center": id_vaccination_center
      }
    });
  }


  postAppointment(newAppointment: Appointment) {
    return this.httpClient.get<Appointment>('api/public/booking',
    {params:
      {
        "id_patient": newAppointment.id_patient,
        "id_vaccination_center": newAppointment.id_vaccination_center,
        "date": newAppointment.date,
      }
     })
  }

  deleteAppointmentById(id_appointment: number) {
    console.log(id_appointment)
    this.httpClient.get<Appointment>("api/public/delete_appointment",
    {params: {
        "id_appointment": id_appointment
      }
    });
  }

}
