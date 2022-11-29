import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable } from 'rxjs';
import { VaccinationCenter } from '../component/vaccination-center/vaccination-center';

@Injectable({
  providedIn: 'root'
})
export class VaccinationService {

  CENTERS: VaccinationCenter[] = [
    {id_vaccination_center:1, name:"Hôpital Central",adresse:"9 Rue Lionnois",postal_code:"54000",city:"Nancy"/*,openingDate: new Date('2022-09-12')*/},
    {id_vaccination_center:2, name:"Grand centre de vaccination",adresse:"2 Rue du pont",postal_code:"57000",city:"Metz"/*,openingDate:new Date('2021-02-24')*/}
  ]

  constructor(
    private httpClient: HttpClient,
    private readonly router: Router
    ) { }

  getAllVaccinationCenter(): Observable<VaccinationCenter[]>{
    return this.httpClient.get<VaccinationCenter[]>("api/public/centers",{observe: 'response'}).pipe(
      map((resp)=>{
        if(!!resp.body){
          return resp.body
        }
        return []
      }),
      catchError((err) => {
        console.log(err.status)
        const temps =  err.headers.get('x-rate-limit-retry-after-seconds')
        this.router.navigate(['infos']);
        return []
      })
    );
  }
  /*
  createAppointment(appointment: Appointment): Observable<Appointment>{
    return this.httpClient.post("api/public/booking", appointment);
  }
  */
  getVaccinationCenterById(id_vaccination_center:number): Observable<VaccinationCenter>{
    return this.httpClient.get<VaccinationCenter>("api/public/center",{
      params: {
        "id": id_vaccination_center
      }
    });
    //return this.CENTERS.find(center=> center.id_vaccination_center == id)
  }

  getVaccinationCenterByCity(city:string): Observable<VaccinationCenter[]>{
    return this.httpClient.get<VaccinationCenter[]>("api/public/centers",{
      params: {
        "city": city
      }
    });
  }

}
