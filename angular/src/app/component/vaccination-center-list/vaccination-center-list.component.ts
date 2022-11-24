import { Component, OnInit } from '@angular/core';
import { VaccinationCenter } from '../vaccination-center/vaccination-center';
import { VaccinationService } from '../../service/vaccination.service';

@Component({
  selector: 'app-vaccination-center-list',
  templateUrl: './vaccination-center-list.component.html',
  styleUrls: ['./vaccination-center-list.component.scss']
})
export class VaccinationCenterListComponent implements OnInit {

  centers!: VaccinationCenter[];

  selected?: VaccinationCenter;

  search_entry!: String;

  constructor(private service: VaccinationService) { }

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
    });
  }

  /*
  onChangedName(center: VaccinationCenter){
    delete this.selected;
    this.centers.splice(this.centers.indexOf(center,1))
  }
  */
}
