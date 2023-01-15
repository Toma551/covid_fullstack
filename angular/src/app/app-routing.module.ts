import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VaccinationCenterComponent } from './component/vaccination-center/vaccination-center.component';
import { VaccinationCenterListComponent } from './component/vaccination-center-list/vaccination-center-list.component';
import { LoginComponent } from './component/login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { WaitingComponent } from './waiting/waiting.component';
import { AppointmentListComponent } from './component/appointment-list/appointment-list.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { RoleGuardGuard } from './guard/role-guard.guard';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { DoctorComponent } from './component/doctor/doctor.component';
import { PatientComponent } from './component/patient/patient.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'waiting', component: WaitingComponent},
  {path: "centers", component: VaccinationCenterListComponent, canActivate: [RoleGuardGuard]},//, canActivate: [AuthGuard]},
  {path: "appointments", component: AppointmentListComponent},
  {path: "centers/detail/:id_vaccination_center", component: VaccinationCenterComponent},//, canActivate: [AuthGuard]},
  {path: "doctors/detail/:id_doctor", component: DoctorComponent},
  {path: "patients/detail/:id_patient", component: PatientComponent},
  // {path: "admin", component: AdminPageComponent, canActivate: [NgxPermissionsGuard], data:{Permissions:{only: ['DEVELOPER']}}},
  {path: "admin", component: AdminPageComponent, canActivate: [RoleGuardGuard],
  data:{
    expectedRoles: ['Admin']
  }},
  {path: '', redirectTo: 'centers', pathMatch: 'full'},
  {path: "utilisateur", component: UtilisateurComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
