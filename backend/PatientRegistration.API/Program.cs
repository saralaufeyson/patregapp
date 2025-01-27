var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddOpenApi();
builder.Services.AddControllers();

var corsClients = builder.Configuration.GetSection("CORSSettings:AllowedOrigins").Value;
// Configure CORS policy to explicitly allow localhost:4200
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
        policy.WithOrigins(corsClients) // Specify the frontend URL explicitly
              .AllowAnyMethod() // Allow all HTTP methods
              .AllowAnyHeader() // Allow all headers
              .AllowCredentials()); // Optional: Only if credentials like cookies/auth headers are needed
});

var app = builder.Build();

// Apply the CORS policy before any other middleware or routing
app.UseCors("AllowAll");

// Handle OPTIONS request explicitly (preflight check for CORS)
app.Use(async (context, next) =>
{
    if (context.Request.Method == "OPTIONS")
    {
        // Set the correct status for OPTIONS requests (Preflight Request)
        context.Response.StatusCode = 200; // OK
        context.Response.Headers.Add("Access-Control-Allow-Origin", "http://localhost:4200");
        context.Response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        context.Response.Headers.Add("Access-Control-Allow-Headers", "Content-Type, Authorization");
        context.Response.Headers.Add("Access-Control-Allow-Credentials", "true");
        
        // Complete the request without further processing
        await context.Response.CompleteAsync();
        return;
    }
    await next();
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.MapControllers(); // Ensure this comes after UseCors

app.Run();
