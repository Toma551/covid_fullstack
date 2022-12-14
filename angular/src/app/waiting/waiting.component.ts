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
  tokens = '';
  duree = '';
  private sub: any;
  temps = 0;
  tempsRestant = 0;
  finishedTimer = false;

  ngOnInit(): void {
    this.info()
  }

  reset() {
    this.infos = '',
    this.tokens = '';
    this.duree = '';
    this.temps = 0;
    this.tempsRestant = 0;
    this.finishedTimer = false;
  }

  info() {
    this.reset();
    this.http.get<any>('api/infos', {observe: 'response'})
    .subscribe({
      next: (resp) => {
      console.log(resp);
      console.log(resp.headers.keys());
      const nbToken =  resp.headers.get('X-Rate-Limit-Remaining')
      this.tokens = `${nbToken}`
    },
    error:  (err) => {
      console.error(err);
      console.log(err.headers.keys());
      this.temps =  err.headers.get('X-Rate-Limit-Retry-After-Seconds')
      this.duree = `${this.temps}`;
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
      this.duree = `${this.tempsRestant}`;
      if (this.tempsRestant <= 0) {
        sub.unsubscribe();
        await new Promise(f => setTimeout(f, 1000));
        this.router.navigate(['centers']);
        // this.info();
      }
    });
  }

}
