import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable } from 'rxjs';
import { Doctor } from '../component/admin-page/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  getAllDoctors(): Observable<Doctor[]>{
    return this.httpClient.get<Doctor[]>("api/admin/doctors",{observe: 'response'})
      .pipe(
        map((resp)=>{
          if(!!resp.body){
            return resp.body
          }
          return []
        })
    );
  }

  getDoctorById(id_doctor:number): Observable<Doctor>{
    return this.httpClient.get<Doctor>("api/admin/doctor",{
      params: {
        "id_doctor": id_doctor
      }
    });

  }
}
