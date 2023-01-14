import { Injectable } from '@angular/core';
import { catchError, map, Observable, ReplaySubject, Subject } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private isLoggedSubject: Subject<boolean> = new ReplaySubject();


  private password?: string;
  private username?: string;

  constructor(private httpClient: HttpClient, private router: Router) {
  }


  connect(username: string, password: string): Observable<any> {
    let token = this.createToken(username, password);
    let options = {
      headers: {
        'Authorization': token
      }
    };
    return this.httpClient.get('/api/login', options).pipe(map(value => {
      this.password = password;
      this.username = username;
      this.isLoggedSubject.next(true);
      console.log("Connected")
    }))
  }

  private createToken(username?: string, password?: string) {
    let token = `Basic ` + btoa(`${username}:${password}`);
    return token;
  }


  isLogged(): Observable<boolean> {
    return this.isLoggedSubject.asObservable();
  }

  getBasicAuthHeaderValue(): string {
    return this.createToken(this.username, this.password)
  }


  authHasBasic(): boolean {
    return !!this.password && !!this.username;
  }

  logout() {
    console.log("Logout")
    if (this.authHasBasic()) {
      this.password = undefined;
      this.username = undefined;
    }
    this.isLoggedSubject.next(false);
    this.router.navigateByUrl("/login").then(console.log).catch(console.error)
  }

  // getUtilisateur(): Observable<Doctor> {
  //   console.log(this.username);
  //   if(this.username)
  //     return this.httpClient.get<Doctor>('/api/user', {params: {
  //       "login": this.username
  //     }});
  //   else
  //     return null as any;
  // }

  getUtilisateur() {
    if(this.username)
      return this.username;
    else
      return null as any;
  }

  // getRole(username : string) :Observable<string>{
  //   return this.httpClient.get('/api/role',{
  //     params: {
  //       "username": username
  //     }, 
  //     responseType: 'text'

  //   })
  // }


  getRole(username : string) :Observable<any>{
    return this.httpClient.get('/api/role',{
      params: {
        "username": username
      }, 
      observe: 'response',
      responseType : 'text'
    })
    .pipe(
      map((resp)=>{
        if(!!resp.body){
          return resp.body
        }
        return ""
      }),
      
  );
  }
}
