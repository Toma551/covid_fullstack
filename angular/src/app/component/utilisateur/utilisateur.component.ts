import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/service/login.service';
import { Utilisateur } from './utilisateur';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.scss']
})
export class UtilisateurComponent implements OnInit {

  @Input() utilisateur: Utilisateur;
  role: string;

  constructor(
    private route: ActivatedRoute,
              private readonly router: Router,
              private httpClient: HttpClient,
              public loginService: LoginService,
  ) { }

  ngOnInit(): void {
    // this.httpClient.get<string>("api/role",{
    //   params: {"username": this.loginService.getUtilisateur()}})
    //   .subscribe(role=>{this.role = role;});
    //   console.log("Role : "+ this.role)
    
    //this.role = JSON.stringify(this.loginService.getRole("toto"));
    console.log("Nom de l'utilisateur : "+ this.loginService.getUtilisateur())
    this.loginService.getRole(this.loginService.getUtilisateur()).subscribe(role=>{this.role = role;});
    // this.httpClient.get<string>("/api/role",{
    //   params: {"username": "toto"}})
    //   .subscribe(role=>{this.role = role;});


  }

  }


