import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';

@Component({
  selector: 'app-infos',
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.scss']
})
export class InfosComponent implements OnInit{

  constructor(
    private readonly http: HttpClient, 
    private readonly router: Router
  ) { }

word = '';
infos = '';

private sub: any;
temps = 0;
tempsRestant = 0;
finishedTimer = false;


ngOnInit(): void {
  this.info();
}

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
    this.temps =  err.headers.get('x-rate-limit-retry-after-seconds')
    this.infos = `Ressayer après ${this.temps} secondes`;
    if (this.temps > 0) {
      this.startTimer();
    }
  }
});
}
startTimer() {
  const tempsInitial = this.temps;
  this.tempsRestant = this.temps;
  const timer$ = interval(1000);

  const sub = timer$.subscribe(async (sec) => {
    sec = sec+1;
    this.tempsRestant = tempsInitial - sec;
    console.log("temps restant : ",  this.tempsRestant);
    this.infos = `Réessayer après ${this.tempsRestant} secondes`;
    if (this.tempsRestant <= 0) {
      sub.unsubscribe();
      await new Promise(f => setTimeout(f, 1000));
      this.info();
      this.router.navigate(['centers']);
    }
  });
}

}

