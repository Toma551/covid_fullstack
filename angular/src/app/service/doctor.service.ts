import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable } from 'rxjs';
import { Doctor } from '../admin-page/doctor';

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

  getDoctorByName(name:string): Observable<Doctor>{
    return this.httpClient.get<Doctor>("api/admin/doctor",{
      params: {
        "name": name
      }
    });
    //return this.CENTERS.find(center=> center.id_vaccination_center == id)
  }
}
