import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-waiting',
  templateUrl: './waiting.component.html',
  styleUrls: ['./waiting.component.scss']
})
export class WaitingComponent implements OnInit {

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
    ) { }

  infos = '';
  private sub: any;
  temps = 0;
  tempsRestant = 0;
  finishedTimer = false;

  ngOnInit(): void {
    this.info()
  }

  info() {
    this.http.get<any>('api/infos', {observe: 'response'})
    .subscribe({
      next: (resp) => {
      console.log(resp);
      console.log(resp.headers.keys());
      const nbToken =  resp.headers.get('X-Rate-Limit-Remaining')
      this.infos = `${nbToken} tokens restants`
    },
    error:  (err) => {
      console.error(err);
      console.log(err.headers.keys());
      this.temps =  err.headers.get('X-Rate-Limit-Retry-After-Seconds')
      this.infos = `Réessayer après ${this.temps} secondes`;
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
      this.infos = `Réessayer après ${this.tempsRestant} secondes`;
      if (this.tempsRestant <= 0) {
        sub.unsubscribe();
        await new Promise(f => setTimeout(f, 1000));
        this.router.navigate(['centers']);
        this.info();
      }
    });
  }

}
