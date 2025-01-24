using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using PatientRegistration.API.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PatientRegistration.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    //[EnableCors("AllowSpecificOrigin")]
    public class PatientController : ControllerBase
    {
        private readonly IMongoCollection<Patient> _patientCollection;
        //private readonly ILogger<PatientController> _logger;

        public PatientController ()
        {
            var connectionString = "mongodb+srv://root:123@cluster0.o77wt.mongodb.net/";
        var databaseName = "db0";
 
        var client = new MongoClient(connectionString);
        var database = client.GetDatabase(databaseName);
            _patientCollection = database.GetCollection<Patient>("patients");
        }

        [HttpPost("RegisterPatient")]
        public async Task<ActionResult<ApiResponse>> RegisterPatient([FromBody] Patient patient)
        {
            try
            {
                if (patient == null)
                {
                    return BadRequest(new ApiResponse 
                    { 
                        Message = "Invalid patient data", 
                        Status = "Error" 
                    });
                }

                // Ensure ID is set
                if (string.IsNullOrEmpty(patient.Id))
                {
                    patient.Id = Guid.NewGuid().ToString();
                }

                // Save the patient data to MongoDB
                await _patientCollection.InsertOneAsync(patient);

                return Ok(new ApiResponse
                {
                    Message = "Patient registration data saved successfully",
                    Status = "Success",
                    Id = patient.Id
                });
            }
            catch (Exception ex)
            {
                //_logger.LogError(ex, "Error registering patient");
                return StatusCode(500, new ApiResponse 
                { 
                    Message = "Internal server error", 
                    Status = "Error" 
                });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Patient>> GetPatient(string id)
        {
            try
            {
                var patient = await _patientCollection.Find(p => p.Id == id).FirstOrDefaultAsync();

                if (patient == null)
                {
                    return NotFound(new ApiResponse 
                    { 
                        Message = "Patient not found", 
                        Status = "Error" 
                    });
                }

                return Ok(patient);
            }
            catch (Exception ex)
            {
                //_logger.LogError(ex, "Error retrieving patient");
                return StatusCode(500, new ApiResponse 
                { 
                    Message = "Internal server error", 
                    Status = "Error" 
                });
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Patient>>> GetAllPatients()
        {
            try
            {
                var patients = await _patientCollection.Find(p => true).ToListAsync();
                return Ok(patients);
            }
            catch (Exception ex)
            {
                //_logger.LogError(ex, "Error retrieving all patients");
                return StatusCode(500, new ApiResponse 
                { 
                    Message = "Internal server error", 
                    Status = "Error" 
                });
            }
        }
    }
}
