import { APP_INITIALIZER, NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VaccinationCenterComponent } from './component/vaccination-center/vaccination-center.component';
import { VaccinationCenterListComponent } from './component/vaccination-center-list/vaccination-center-list.component';
import { AppointmentComponent } from './component/appointment/appointment.component';
import { LoginComponent } from './component/login/login.component';
import { WaitingComponent } from './waiting/waiting.component';
import { AppointmentListComponent } from './component/appointment-list/appointment-list.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { DoctorComponent } from './component/doctor/doctor.component';
import { PatientComponent } from './component/patient/patient.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';



@NgModule({
  declarations: [
    AppComponent,
    VaccinationCenterComponent,
    VaccinationCenterListComponent,
    AppointmentComponent,
    LoginComponent,
    WaitingComponent,
    AppointmentListComponent,
    AdminPageComponent,
    UtilisateurComponent,
    DoctorComponent,
    PatientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
