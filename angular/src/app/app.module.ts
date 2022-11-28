import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VaccinationCenterComponent } from './component/vaccination-center/vaccination-center.component';
import { VaccinationCenterListComponent } from './component/vaccination-center-list/vaccination-center-list.component';
import { AppointmentComponent } from './component/appointment/appointment.component';
import { LoginComponent } from './component/login/login.component';
import { InfosComponent } from './component/infos/infos.component';

@NgModule({
  declarations: [
    AppComponent,
    VaccinationCenterComponent,
    VaccinationCenterListComponent,
    AppointmentComponent,
    LoginComponent,
    InfosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
