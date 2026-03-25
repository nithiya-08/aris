# SkillBridge Project Setup Guide

## Project Structure

```
aris/
├── backend/
│   └── backend/
│       ├── src/
│       │   ├── main/
│       │   │   ├── java/
│       │   │   │   └── com/skillbridge/backend/
│       │   │   │       ├── BackendApplication.java
│       │   │   │       ├── config/
│       │   │   │       │   └── CorsConfig.java
│       │   │   │       ├── model/
│       │   │   │       │   ├── Worker.java
│       │   │   │       │   ├── Job.java
│       │   │   │       │   └── Hirer.java
│       │   │   │       ├── repository/
│       │   │   │       │   ├── WorkerRepository.java
│       │   │   │       │   ├── JobRepository.java
│       │   │   │       │   └── HirerRepository.java
│       │   │   │       └── controller/
│       │   │   │           ├── WorkerController.java
│       │   │   │           ├── JobController.java
│       │   │   │           └── HirerController.java
│       │   │   └── resources/
│       │   │       └── application.properties
│       │   └── test/
│       ├── pom.xml
│       └── mvnw
│
└── frontend/
    ├── api-service.js
    ├── index.html
    ├── worker-register.html
    ├── worker-login.html
    ├── worker-dashboard.html
    ├── customer-register.html
    ├── customer-login.html
    ├── customer-dashboard.html
    ├── skill-test.html
    ├── skill-map.html
    └── style.css
```

## Backend Setup Instructions

### 1. Database Setup (MySQL)

Before running the backend, ensure MySQL is installed and running on your system.

#### Create Database:
```sql
CREATE DATABASE skillbridge_db;
USE skillbridge_db;
```

#### Default Database Credentials:
- **Host:** localhost
- **Port:** 3306
- **Username:** root
- **Password:** root
- **Database:** skillbridge_db

If you use different credentials, update them in `backend/src/main/resources/application.properties`

### 2. Configure Application Properties

File: `backend/backend/src/main/resources/application.properties`

```properties
# MySQL Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/skillbridge_db
spring.datasource.driverClassName=com.mysql.cj.jdbc.Driver
spring.datasource.username=root
spring.datasource.password=root

# Server runs on port 8080
server.port=8080
```

### 3. Build and Run Backend

Navigate to the backend directory:
```bash
cd backend/backend
```

#### Windows (using Maven):
```bash
mvnw clean install
mvnw spring-boot:run
```

#### Linux/Mac (using Maven):
```bash
./mvnw clean install
./mvnw spring-boot:run
```

The backend will start at: **http://localhost:8080**

## Frontend Setup Instructions

### 1. API Service Configuration

File: `frontend/api-service.js`

The API service is configured to connect to the backend at:
```javascript
this.baseURL = 'http://localhost:8080/api';
```

Make sure this URL matches your backend server location.

### 2. Running Frontend

You have multiple options:

#### Option 1: Live Server (Recommended)
1. Install VS Code Extension: "Live Server"
2. Right-click on `index.html` in frontend folder
3. Click "Open with Live Server"
4. Frontend will open at: **http://localhost:5500** (or similar port)

#### Option 2: Node.js HTTP Server
```bash
cd frontend
npx http-server
```
Frontend will be available at: **http://localhost:8080**

#### Option 3: Python HTTP Server
```bash
cd frontend
python -m http.server 8000
```
Frontend will be available at: **http://localhost:8000**

#### Option 4: Direct File Opening
Simply open `index.html` in a web browser.

## API Endpoints

### Worker Endpoints
- `POST /api/workers/register` - Register new worker
- `GET /api/workers` - Get all workers
- `GET /api/workers/{workerId}` - Get worker by ID
- `GET /api/workers/{workerId}/jobs` - Get matched jobs for worker

### Job Endpoints
- `POST /api/jobs` - Create new job
- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/{jobId}` - Get job by ID
- `GET /api/jobs/search?skill=X&location=Y` - Search jobs by skill and location
- `PUT /api/jobs/{jobId}` - Update job
- `DELETE /api/jobs/{jobId}` - Delete job

### Hirer/Customer Endpoints
- `POST /api/hirers/register` - Register new hirer
- `GET /api/hirers` - Get all hirers
- `GET /api/hirers/{hirerId}` - Get hirer by ID
- `GET /api/hirers/email/{email}` - Get hirer by email
- `PUT /api/hirers/{hirerId}` - Update hirer
- `DELETE /api/hirers/{hirerId}` - Delete hirer

## Database Tables

The application will automatically create the following tables:

### workers table
```sql
- id (Primary Key, Auto-increment)
- name (VARCHAR)
- email (VARCHAR)
- phone (VARCHAR)
- password (VARCHAR)
- location (VARCHAR)
- skill (VARCHAR)
- skill_passport_id (VARCHAR)
```

### jobs table
```sql
- id (Primary Key, Auto-increment)
- title (VARCHAR)
- skill_required (VARCHAR)
- location (VARCHAR)
- budget (VARCHAR)
- hirer_id (INT)
```

### hirers table
```sql
- id (Primary Key, Auto-increment)
- name (VARCHAR)
- email (VARCHAR)
- phone (VARCHAR)
- password (VARCHAR)
- location (VARCHAR)
- user_type (VARCHAR)
```

## Troubleshooting

### Issue 1: Backend won't start - Port 8080 already in use
**Solution:** 
- Kill the process using port 8080
- Or change the port in `application.properties`

### Issue 2: Database connection error
**Solution:**
- Ensure MySQL is running
- Check credentials in `application.properties`
- Verify database exists: `CREATE DATABASE skillbridge_db;`

### Issue 3: CORS errors in frontend
**Solution:**
- Ensure backend is running on http://localhost:8080
- Check CorsConfig.java has proper allowed origins
- Frontend URL should be in the allowed origins list

### Issue 4: Frontend can't connect to API
**Solution:**
- Verify backend is running: http://localhost:8080
- Check `api-service.js` baseURL is correct
- Open browser console (F12) to see network errors
- Ensure frontend and backend are on allowed CORS origins

## Data Flow

1. **Worker Registration:**
   - User fills form on `worker-register.html`
   - Data sent via `skillBridgeAPI.registerWorker()` → Backend `POST /api/workers/register`
   - Backend saves to MySQL `workers` table
   - Skill Passport ID generated and returned

2. **Job Creation:**
   - Hirer creates job on customer dashboard
   - Data sent via `skillBridgeAPI.createJob()` → Backend `POST /api/jobs`
   - Backend saves to MySQL `jobs` table

3. **Job Matching:**
   - Worker views matched jobs: `GET /api/workers/{workerId}/jobs`
   - Backend queries jobs table: `WHERE skill_required = worker_skill AND location = worker_location`
   - Returns matching jobs to frontend

4. **Hirer Registration:**
   - User fills form on `customer-register.html`
   - Data sent via `skillBridgeAPI.registerHirer()` → Backend `POST /api/hirers/register`
   - Backend saves to MySQL `hirers` table

## Technology Stack

- **Backend:** Spring Boot 3.5.12, Java 17, MySQL, Spring Data JPA
- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Database:** MySQL 8.0+
- **Build Tool:** Maven
- **Server:** Apache Tomcat (embedded with Spring Boot)

## Next Steps

1. Ensure MySQL is running
2. Create the `skillbridge_db` database
3. Build and run the backend
4. Open frontend in a web browser
5. Test registration flows
6. Check MySQL database for stored data

## Notes

- The frontend uses `localStorage` for session management
- All passwords should be hashed before storing (to be implemented)
- CORS is enabled for localhost development
- Adjust CORS allowed origins in `CorsConfig.java` for production
