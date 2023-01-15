import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Patient } from 'src/app/component/admin-page/patient';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

  @Input() patient?: Patient

  URL?: String|null;

  constructor(private route: ActivatedRoute, private service: PatientService) { }

  ngOnInit(): void {
    const id_patient = Number(this.route.snapshot.paramMap.get('id_patient'));
    this.URL = this.route.snapshot.paramMap.get('id_patient');
    this.service.getPatientById(id_patient).subscribe(resultPatient=>{
      this.patient = resultPatient;
    });
  }

}

