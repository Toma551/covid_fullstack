import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from 'src/app/admin-page/doctor';
import { DoctorService } from 'src/app/service/doctor.service';


@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {

  @Input() doctor?: Doctor


  URL?: String|null;

  constructor(private route: ActivatedRoute, private service: DoctorService) { }

  ngOnInit(): void {
    const name = String(this.route.snapshot.paramMap.get('name'));
    console.log("nom du beau gosse : " + name);
    //this.center = this.service.getVaccinationCenterById(id_vaccination_center);
    this.URL = this.route.snapshot.paramMap.get('name');
    this.service.getDoctorByName(name).subscribe(resultDoctor=>{
      this.doctor = resultDoctor;
    });
  }

}
