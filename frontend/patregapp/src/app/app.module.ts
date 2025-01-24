import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PatientComponent } from './components/patient/patient.component';
import { PatientService } from './services/patient.service';
import {routes} from './app.routes'

@NgModule({
  declarations: [
    AppComponent,
    PatientComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    routes
    
  ],
  providers: [PatientService],
  bootstrap: [AppComponent]
})
export class AppModule { }