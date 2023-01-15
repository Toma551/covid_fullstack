import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VaccinationCenterComponent } from './component/vaccination-center/vaccination-center.component';
import { VaccinationCenterListComponent } from './component/vaccination-center-list/vaccination-center-list.component';
import { LoginComponent } from './component/login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { WaitingComponent } from './component/waiting/waiting.component';
import { AppointmentListComponent } from './component/appointment-list/appointment-list.component';
import { AdminPageComponent } from './component/admin-page/admin-page.component';
import { RoleGuardGuard } from './guard/role-guard.guard';
import { UtilisateurComponent } from './component/utilisateur/utilisateur.component';
import { DoctorComponent } from './component/doctor/doctor.component';
import { PatientComponent } from './component/patient/patient.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
const materialModules = [
  MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatInputModule
];

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'waiting', component: WaitingComponent},
  {path: "centers", component: VaccinationCenterListComponent},
  {path: "appointments", component: AppointmentListComponent},
  {path: "centers/detail/:id_vaccination_center", component: VaccinationCenterComponent},
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
  imports: [RouterModule.forRoot(routes),materialModules],
  exports: [RouterModule,materialModules]
})
export class AppRoutingModule { }
