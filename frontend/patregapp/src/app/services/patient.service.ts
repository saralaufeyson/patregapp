import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Patient } from '../models/patient.model';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl = 'http://localhost:5055/api/Patient/RegisterPatient'; // Ensure this URL is correct

  constructor(private http: HttpClient) { }

  // Method to register a patient
  registerPatient(patient: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  // Ensure Content-Type header is set
    return this.http.post<any>(this.apiUrl, patient);
    // Send the POST request with headers and the JSON body
    // return this.http.post<ApiResponse>(
    //   `${this.apiUrl}/RegisterPatient`, 
    //   JSON.stringify(patient),  // Convert patient object to JSON string
    //   { headers }  // Attach the headers to the request
    // );
  }

  // Method to fetch a patient's details by ID
  getPatient(id: string): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/${id}`);
  }
}
