import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './service/login.service';
import { Doctor } from './utilisateur';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = '💉💉Vaccination COVID💉💉';

  ngOnInit(): void {
    this.bucket();
  }
  word = '';
  tokens = '';
  duree = '';
  utilisateur?: Doctor;
  constructor(
              private readonly http: HttpClient,
              private readonly router: Router,
              public readonly loginService: LoginService,
            ) {}


  bucket() {
    this.http.get<any>('api/infos', {observe: 'response'}).subscribe({
      next: (resp) => {
      console.log(resp);
      console.log(resp.headers.keys());
      const nbToken =  resp.headers.get('X-Rate-Limit-Remaining')
      this.tokens = `${nbToken} tokens restant`
    },
    error:  (err) => {
      console.log(err.status)
      const temps =  err.headers.get('x-rate-limit-retry-after-seconds')
      this.duree = `Ressayer après ${temps} secondes`;
      this.router.navigate(['waiting']);
    }
  });
  }

}
