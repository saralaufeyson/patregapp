# Patient Registration Form - ASP.NET and Angular

## Overview

This project is a proof of concept (PoC) for creating a Patient Registration Form using Angular for the frontend and ASP.NET for the backend. The form collects essential patient information such as name, date of birth, gender, address, and emergency contact details. Initially, the data is stored in a JSON format and later migrated to a MongoDB cluster for persistent storage. The project was completed with version control via GitHub.

## Objective

- Design and implement a patient registration form with fields like name, date of birth, gender, address, and emergency contact.
- Initially store the collected data in JSON format.
- Set up a MongoDB cluster for data persistence.
- Push the final code to GitHub for version control and collaboration.

## Technologies Used

- **Frontend**: Angular
- **Backend**: ASP.NET
- **Database**: MongoDB
- **Testing**: Postman
- **Version Control**: GitHub

## Features

- **Frontend**: The form allows users to input their personal and emergency contact details.
- **Backend**: The backend is built using ASP.NET, which handles form submission and stores the data.
- **Routing**: Navigation between different parts of the application was set up using Angular's routing capabilities.
- **Data Handling**: Data is initially stored in JSON format for testing, then migrated to MongoDB.
- **Version Control**: Code is version-controlled using GitHub.

## Setup Instructions

### Prerequisites

- **Node.js**: Install Node.js (which includes npm) from [here](https://nodejs.org/).
- **.NET SDK**: Install .NET SDK from [here](https://dotnet.microsoft.com/download).
- **MongoDB**: Set up a MongoDB cluster. You can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for cloud hosting.
- **Postman**: Install Postman for testing the backend API.

### Backend Setup

1. Clone the repository:
   ```git clone https://github.com/yourusername/patient-registration-form.git```
2.Navigate to the /server folder:
```cd /server```
3.Install the required .NET dependencies:
```dotnet restore```
4.Run the backend server:
```
dotnet run
```
### Frontend setup
Navigate to the /client folder:
```
cd /client
```
-Install the required Node.js dependencies:
```
npm install
```
Run the frontend server:
```
ng serve
```
Access the application at http://localhost:4200.

### MongoDB Setup
Set up your MongoDB cluster via MongoDB Atlas.
Connect your backend to MongoDB by updating the connection string in the appsettings.json file of the backend.
Testing
Use Postman to test the backend API endpoints.
POST request to submit patient data to http://localhost:5000/api/patient
GET request to fetch stored patient data from http://localhost:5000/api/patient
