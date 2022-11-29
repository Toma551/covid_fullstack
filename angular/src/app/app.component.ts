import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Vaccination COVID';

  word = '';
  infos = '';
  constructor(
              private readonly http: HttpClient,
              private readonly router: Router
            ) {}
  bucket() {
    this.http.get<any>('api/infos', {observe: 'response'}).subscribe({
      next: (resp) => {
      console.log(resp);
      console.log(resp.headers.keys());
      const nbToken =  resp.headers.get('X-Rate-Limit-Remaining')
      this.infos = `${nbToken} tokens restant`
    },
    error:  (err) => {
      console.log(err.status)
      const temps =  err.headers.get('x-rate-limit-retry-after-seconds')
      this.infos = `Ressayer après ${temps} secondes`;
      this.router.navigate(['waiting']);
    }
  });
  }

}
