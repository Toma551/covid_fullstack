import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VaccinationCenterComponent } from './component/vaccination-center/vaccination-center.component';
import { VaccinationCenterListComponent } from './component/vaccination-center-list/vaccination-center-list.component';
import { LoginComponent } from './component/login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { WaitingComponent } from './waiting/waiting.component';
import { AppointmentListComponent } from './component/appointment-list/appointment-list.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'waiting', component: WaitingComponent},
  {path: "centers", component: VaccinationCenterListComponent},//, canActivate: [AuthGuard]},
  {path: "appointments", component: AppointmentListComponent},
  {path: "centers/detail/:id_vaccination_center", component: VaccinationCenterComponent},//, canActivate: [AuthGuard]},
  {path: '', redirectTo: 'centers', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
