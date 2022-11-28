import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-infos',
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.scss']
})
export class InfosComponent{

  constructor(
    private readonly http: HttpClient, 
    private readonly router: Router
  ) { }

word = '';
infos = '';

info() {
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
    this.router.navigate(['/infos', temps]);
  }
});

}
}
