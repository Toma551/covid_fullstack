import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VaccinationService } from '../../service/vaccination.service';
import { VaccinationCenter } from './vaccination-center';

@Component({
  selector: 'app-vaccination-center',
  templateUrl: './vaccination-center.component.html',
  styleUrls: ['./vaccination-center.component.scss']
})
export class VaccinationCenterComponent implements OnInit {

  @Input() center?: VaccinationCenter;
  @Output()   deleted= new EventEmitter<VaccinationCenter>();
  //@Output()   changedName= new EventEmitter<VaccinationCenter>();

  URL?: String|null;

  constructor(private route: ActivatedRoute, private service: VaccinationService) { }

  ngOnInit(): void {
    const id_vaccination_center = Number(this.route.snapshot.paramMap.get('id_vaccination_center'));
    //this.center = this.service.getVaccinationCenterById(id_vaccination_center);
    this.URL = this.route.snapshot.paramMap.get('id_vaccination_center');
    this.service.getVaccinationCenterById(id_vaccination_center).subscribe(resultCenter=>{
      this.center = resultCenter;
    });
  }

  /*
  changeName(){
    this.deleted.emit(this.center);
  }

  clearName(){
    this.center.name = "";
  }
  */

  delete(){
    this.deleted.emit(this.center);
  }
}
