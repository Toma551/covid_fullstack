import { Component, OnInit } from '@angular/core';
import { VaccinationCenter } from '../vaccination-center/vaccination-center';
import { VaccinationService } from '../../service/vaccination.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vaccination-center-list',
  templateUrl: './vaccination-center-list.component.html',
  styleUrls: ['./vaccination-center-list.component.scss']
})
export class VaccinationCenterListComponent implements OnInit {

  centers!: VaccinationCenter[];

  selected?: VaccinationCenter;

  search_entry!: String;

  word = '';
  infos = '';

  constructor(
    private service: VaccinationService,
    private readonly http: HttpClient, 
    private readonly router: Router
    ) { }

  ngOnInit(): void {
    this.service.getAllVaccinationCenter().subscribe(resultCenters=>{
      //console.log(resultCenters);
      this.centers = resultCenters;
    });
  }

  isSpecialCenter(center: VaccinationCenter){
    return center.city == "Nancy";
  }

  selectCenter(center: VaccinationCenter){
    this.selected=center;
  }

  onDeleted(center: VaccinationCenter){
    delete this.selected;
    this.centers.splice(this.centers.indexOf(center,1))
  }

  searchCenterById(search_entry: String){
    this.service.getVaccinationCenterById(Number(search_entry)).subscribe(resultCenters=>{
      this.selected = resultCenters;
    });
  }

  searchCenterByCity(search_entry: String){
    this.service.getVaccinationCenterByCity(search_entry.toString()).subscribe(resultCenters=>{
      this.centers = resultCenters;
    })
    this.http.get<any>('api/public/infos/429', {observe: 'response'})
    .subscribe({
      next: (resp) => {
      console.log(resp);
      console.log(resp.headers.keys());
      const nbToken =  resp.headers.get('X-Rate-Limit-Remaining')
      this.infos = `${nbToken} tokens restant`
    },
    error:  (err) => {
      console.error(err);
      console.log(err.headers.keys());
      const temps =  err.headers.get('x-rate-limit-retry-after-seconds')
      this.infos = `Ressayer après ${temps} secondes`;
    }
  });
  }



  /*
  onChangedName(center: VaccinationCenter){
    delete this.selected;
    this.centers.splice(this.centers.indexOf(center,1))
  }
  */
  
}
