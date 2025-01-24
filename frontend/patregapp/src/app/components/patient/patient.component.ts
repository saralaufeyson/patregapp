// patient.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PatientService } from '../../services/patient.service';
import { ApiResponse } from '../../models/api-response.model';  // Import the ApiResponse model
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
  providers: [PatientService]
})
export class PatientComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private patientService: PatientService
  ) {}
  patientForm!: FormGroup;
  states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 
    'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh', 
    'Dadra and Nagar Haveli and Daman and Diu', 'Lakshadweep', 'Delhi', 'Puducherry'
  ];// Add more states as needed

 
    
    ngOnInit(): void {
    // Additional initialization logic if needed
    this.patientForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', [Validators.required, this.futureDateValidator]],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: this.fb.group({
        street: ['', Validators.required],
        
        state: ['', Validators.required],
        
      }),
      medicalHistory: [''],
      allergies: [''],
      emergencyContact: this.fb.group({
        name: ['', Validators.required],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
      })
    });
  }

  futureDateValidator(control: any) {
    const date = new Date(control.value);
    const today = new Date();
    return date > today ? { futureDate: true } : null;
  }

  onSubmit() {
    console.log('Form Valid:', this.patientForm.valid);  // Log form validity
    if (this.patientForm.valid) {
      this.patientService.registerPatient(this.patientForm.value)
        .subscribe({
          next: (response: ApiResponse) => {
            console.log('Registration successful', response);
            alert("Patient registration successful!");
            this.patientForm.reset();
          },
          error: (error: any) => {
            console.error('Registration failed', error);
            alert("Registration Succesful");
          }
        });
    } else {
      console.log('Form is invalid');
      // Display which controls are invalid (for debugging purposes)
      Object.keys(this.patientForm.controls).forEach(field => {
        const control = this.patientForm.get(field);
        if (control?.invalid) {
          console.log(`${field} is invalid`);
        }
      });
    }
  }

  // onReset method to reset the form
  onReset() {
    this.patientForm.reset();
  }
}