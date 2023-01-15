import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/service/login.service';
import { Utilisateur } from '../component/utilisateur/utilisateur';


@Injectable({
  providedIn: 'root'
})
export class RoleGuardGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {
  }
  user: string;
  role: string;
  utilisateur: Utilisateur;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log("Dans le guard");
    this.loginService.getRole(this.loginService.getUtilisateur()).subscribe(role=>{this.role = role;});

      const expectedRoles = route.data['expectedRoles'];
      console.log("Role utilisateur :" + this.role);
      //this.role = "Admin";
      console.log("Expected role :" + expectedRoles);



    // console.log("Role :" +
    // this.loginService.getUtilisateur().subscribe((role: string)=>{
    //   this.utilisateur.role=role;}));

    return this.role==expectedRoles;
  }

  //  isAuthorized(route: ActivatedRouteSnapshot): boolean{
  //   console.log("isAuthorized");
  //   this.loginService.getRole(this.loginService.getUtilisateur()).subscribe(role=>{this.role = role;});

  //     const expectedRoles = route.data['expectedRoles'];
  //     console.log("Role utilisateur :" + this.role);
  //     //this.role = "Admin";
  //     console.log("Expected role :" + expectedRoles);
  //     return this.role==expectedRoles;
  // }

}
