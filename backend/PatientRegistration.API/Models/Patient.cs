// Models/Patient.cs
namespace PatientRegistration.API.Models
{
    public class Patient
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
       public Address Address { get; set; }
        public string MedicalHistory { get; set; }
        public string Allergies { get; set; }
        public EmergencyContact EmergencyContact { get; set; }
    }

    public class Address
    {
        public string Street { get; set; }
        
        public string State { get; set; }
        
    }

    public class EmergencyContact
    {
        public string Name { get; set; }
        public string Phone { get; set; }
    }
}

// Models/ApiResponse.cs
namespace PatientRegistration.API.Models
{
    public class ApiResponse
    {
        public string Message { get; set; }
        public string Status { get; set; }
        public string Id { get; set; }
    }
}
