export interface Patient {
    id?: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    email: string;
    phoneNumber: string;
    // address: {
    //   street: string;
    
    //   state: string;
      
    // };
    medicalHistory?: string;
    allergies?: string;
    // emergencyContact: {
    //   name: string;
    //   phone: string;
    // };
  }
  