import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable } from 'rxjs';
import { Patient } from '../admin-page/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  getAllPatients(): Observable<Patient[]>{
    return this.httpClient.get<Patient[]>("api/admin/patients",{observe: 'response'})
      .pipe(
        map((resp)=>{
          if(!!resp.body){
            return resp.body
          }
          return []
        })
    );
  }

  getPatientById(id_patient:number): Observable<Patient>{
    return this.httpClient.get<Patient>("api/admin/patient",{
      params: {
        "id_patient": id_patient
      }
    });
    //return this.CENTERS.find(center=> center.id_vaccination_center == id)
}}
