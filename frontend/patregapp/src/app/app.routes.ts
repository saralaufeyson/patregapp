// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { PatientComponent } from './components/patient/patient.component'; // Adjust the path as necessary

export const routes: Routes = [
  
  { path: '', component: PatientComponent },         // Route to PatientComponent
  // Add more routes as necessary
];
