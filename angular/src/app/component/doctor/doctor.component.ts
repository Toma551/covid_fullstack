import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from 'src/app/component/admin-page/doctor';
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
    const id_doctor = Number(this.route.snapshot.paramMap.get('id_doctor'));
    this.URL = this.route.snapshot.paramMap.get('id_doctor');
    this.service.getDoctorById(id_doctor).subscribe(resultDoctor=>{
      this.doctor = resultDoctor;
    });
  }

}
