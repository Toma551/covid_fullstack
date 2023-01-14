import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class LoadPermissionService {

  constructor(private http: HttpClient) { }

  public delay(){
    return new Promise(resolve => setTimeout(resolve, 3000))
  }

  public loadPermissions(){
  //   return this.delay().then(()=> {
  //   return this.http.get("https://jsonplaceholder.typicode.com/todos/1")
  //   .toPromise()
  //   .then(() =>{
  //     return ["DEVELOPER"]
  //   })
  // })

  return this.http.get("https://jsonplaceholder.typicode.com/todos/1")
    .toPromise()
    .then(() =>{
      return ["DEVELOPER"]
    })
  }
}
