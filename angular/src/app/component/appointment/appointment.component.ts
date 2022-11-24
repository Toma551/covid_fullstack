import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VaccinationCenter } from '../vaccination-center/vaccination-center';
import { VaccinationService } from '../../service/vaccination.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {

  center!: VaccinationCenter;

  constructor(private route: ActivatedRoute, private service: VaccinationService) { }

  ngOnInit(): void {
    const id_vaccination_center = Number(this.route.snapshot.paramMap.get('id_vaccination_center'));
    this.service.getVaccinationCenterById(id_vaccination_center).subscribe(resultCenter=>{
      this.center = resultCenter;
    });
  }

}
