# SkillBridge - A Skill Marketplace Platform

A Spring Boot-based REST API with a responsive frontend for connecting skilled workers with job hirers. The platform enables workers to register, create skill passports, and discover matching job opportunities based on their skills and location.

## 🚀 Project Overview

**SkillBridge** is a full-stack application that consists of:
- **Backend:** Spring Boot REST API with MySQL database
- **Frontend:** Responsive HTML5/CSS3/JavaScript interface
- **Database:** MySQL for persistent data storage

### Key Features
- ✅ Worker registration with skill passport generation
- ✅ Hirer/Customer registration for job posting
- ✅ Job creation and management
- ✅ Smart job matching based on skills and location
- ✅ Multi-language support (English and Tamil)
- ✅ Voice-based input for accessibility
- ✅ Responsive design for all screen sizes
- ✅ RESTful API architecture
- ✅ CORS-enabled for frontend integration

## 📋 What Was Fixed in This Update

### Backend Fixes:
1. ✅ **Database Configuration:** Changed from H2 (in-memory) to MySQL with proper credentials
2. ✅ **CORS Configuration:** Added CORS config to allow frontend-backend communication
3. ✅ **Controller Structure:** Reorganized into `/api/workers`, `/api/jobs`, `/api/hirers` routes
4. ✅ **API Endpoints:** Created comprehensive REST endpoints for all operations
5. ✅ **Models:** Added proper entity classes with constructors and table mappings
6. ✅ **Repositories:** Created custom query methods for job matching and searching
7. ✅ **Removed Dependencies:** Removed H2 database, normalized project structure

### Frontend Fixes:
1. ✅ **API Service Layer:** Created `api-service.js` as centralized API client
2. ✅ **Form Integration:** Updated registration forms to use API instead of localStorage
3. ✅ **Error Handling:** Added try-catch and server connection error messages
4. ✅ **Backend Communication:** Forms now send data to REST API endpoints
5. ✅ **Relative Paths:** Fixed all HTML/CSS/JS file references

### Project Structure Fixes:
1. ✅ **Folder Organization:** Cleaned up nested backend folder structure
2. ✅ **Naming Conventions:** Proper package and class naming conventions applied
3. ✅ **File Locations:** Organized controllers, models, and repositories correctly
4. ✅ **Documentation:** Added setup guide and API documentation

## 📁 Project Structure

```
aris/
├── SETUP_GUIDE.md                              # Complete setup instructions
├── README.md                                   # This file
│
├── backend/backend/                            # Spring Boot Application
│   ├── src/main/java/com/skillbridge/backend/
│   │   ├── BackendApplication.java             # Main Spring Boot app
│   │   ├── config/
│   │   │   └── CorsConfig.java                 # CORS configuration
│   │   ├── model/                              # Entity models
│   │   │   ├── Worker.java                     # Worker entity
│   │   │   ├── Job.java                        # Job entity
│   │   │   └── Hirer.java                      # Hirer entity (NEW)
│   │   ├── repository/                         # Data access layer
│   │   │   ├── WorkerRepository.java
│   │   │   ├── JobRepository.java              # Custom job matching query
│   │   │   └── HirerRepository.java            # NEW
│   │   └── controller/                         # REST controllers
│   │       ├── WorkerController.java           # Worker operations
│   │       ├── JobController.java              # Job operations (NEW)
│   │       └── HirerController.java            # Hirer operations (NEW)
│   ├── src/main/resources/
│   │   └── application.properties              # FIXED: MySQL config
│   ├── pom.xml                                 # Maven dependencies
│   └── mvnw/mvnw.cmd                          # Maven wrapper
│
└── frontend/                                   # Web Frontend
    ├── api-service.js                          # API client (NEW)
    ├── index.html                              # Home page
    ├── worker-register.html                    # FIXED: Uses API
    ├── worker-login.html
    ├── worker-dashboard.html
    ├── customer-register.html                  # FIXED: Uses API
    ├── customer-login.html
    ├── customer-dashboard.html
    ├── skill-test.html
    ├── skill-map.html
    └── style.css                               # Shared styles
```

## 🛠️ Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | HTML5, CSS3, JavaScript (ES6+) |
| **Backend** | Spring Boot 3.5.12, Java 17 |
| **Framework** | Spring Data JPA, Spring Web |
| **Database** | MySQL 8.0+ |
| **Build Tool** | Maven 3.6+ |
| **Server** | Apache Tomcat (embedded) |
| **API Format** | REST/JSON |

## 📦 Database Schema

### Workers Table
```sql
CREATE TABLE workers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20),
    password VARCHAR(255),
    location VARCHAR(255),
    skill VARCHAR(255),
    skill_passport_id VARCHAR(255),
    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Jobs Table
```sql
CREATE TABLE jobs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    skill_required VARCHAR(255),
    location VARCHAR(255),
    budget VARCHAR(100),
    hirer_id INT,
    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (hirer_id) REFERENCES hirers(id)
);
```

### Hirers Table
```sql
CREATE TABLE hirers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20),
    password VARCHAR(255),
    location VARCHAR(255),
    user_type VARCHAR(100),
    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔌 API Endpoints

### Worker Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/workers/register` | Register new worker |
| GET | `/api/workers` | Get all workers |
| GET | `/api/workers/{id}` | Get worker by ID |
| GET | `/api/workers/{id}/jobs` | Get matched jobs |

### Job Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/jobs` | Create new job |
| GET | `/api/jobs` | Get all jobs |
| GET | `/api/jobs/{id}` | Get job by ID |
| GET | `/api/jobs/search?skill=X&location=Y` | Search jobs |
| PUT | `/api/jobs/{id}` | Update job |
| DELETE | `/api/jobs/{id}` | Delete job |

### Hirer Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/hirers/register` | Register new hirer |
| GET | `/api/hirers` | Get all hirers |
| GET | `/api/hirers/{id}` | Get hirer by ID |
| GET | `/api/hirers/email/{email}` | Get hirer by email |
| PUT | `/api/hirers/{id}` | Update hirer |
| DELETE | `/api/hirers/{id}` | Delete hirer |

## 🚀 Quick Start

### Prerequisites
- Java 17 or higher
- MySQL Server (5.7+)
- Maven 3.6+
- Modern web browser

### Backend Setup

1. **Create MySQL Database:**
   ```sql
   CREATE DATABASE skillbridge_db;
   ```

2. **Build & Run:**
   ```bash
   cd backend/backend
   mvnw clean install
   mvnw spring-boot:run
   ```
   Backend runs at: `http://localhost:8080`

### Frontend Setup

1. **Using Live Server (VS Code):**
   - Install "Live Server" extension
   - Right-click `index.html` → "Open with Live Server"

2. **Using Python:**
   ```bash
   cd frontend
   python -m http.server 8000
   ```

3. **Using Node.js:**
   ```bash
   cd frontend
   npx http-server
   ```

## 🔧 Configuration

### Backend Configuration
File: `backend/backend/src/main/resources/application.properties`

```properties
# Database (Change if using different credentials)
spring.datasource.url=jdbc:mysql://localhost:3306/skillbridge_db
spring.datasource.username=root
spring.datasource.password=root

# Server Port
server.port=8080

# Hibernate (Auto-creates tables)
spring.jpa.hibernate.ddl-auto=update
```

### Frontend Configuration
File: `frontend/api-service.js`

```javascript
this.baseURL = 'http://localhost:8080/api';
```

## 💾 Data Flow

```
Worker Registration
├── User inputs form → worker-register.html
├── Validates data (client-side)
├── Calls POST /api/workers/register
├── Backend saves to database
└── Returns skill passport ID

Job Matching
├── Worker views matched jobs
├── Calls GET /api/workers/{id}/jobs
├── Backend queries jobs WHERE skill=? AND location=?
└── Returns list of matching jobs

Hirer Registration
├── User inputs form → customer-register.html
├── Validates data (client-side)
├── Calls POST /api/hirers/register
├── Backend saves to database
└── Returns hirer confirmation
```

## 🐛 Troubleshooting

### Backend Issues

| Problem | Solution |
|---------|----------|
| Port 8080 in use | Change port in `application.properties` |
| MySQL connection error | Verify MySQL running, check credentials |
| No tables in database | Restart application, check JPA settings |
| CORS errors | Check `CorsConfig.java` allowed origins |

### Frontend Issues

| Problem | Solution |
|---------|----------|
| API calls fail | Verify backend running on `http://localhost:8080` |
| 404 errors | Check file paths in HTML/CSS/JS |
| Registration not working | Open console (F12), check network tab |
| Data not saving | Verify MySQL database exists |

## 📝 Authentication (Future Enhancement)

Currently, the application stores passwords in plain text. For production:
1. Implement password hashing (BCrypt)
2. Add JWT token-based authentication
3. Implement session management
4. Add role-based access control (RBAC)

## 🔐 Security Recommendations

1. **Passwords:** Use BCrypt for hashing
2. **CORS:** Restrict to specific domains in production
3. **Validation:** Add server-side validation
4. **HTTPS:** Use SSL certificates in production
5. **Rate Limiting:** Implement API rate limiting
6. **Input Sanitization:** Prevent SQL injection and XSS

## 📚 Additional Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [RESTful API Best Practices](https://restfulapi.net/)

## 👥 Team & Support

For issues or questions:
1. Check the SETUP_GUIDE.md
2. Review API endpoint documentation
3. Check browser console (F12) for errors
4. Verify MySQL database and backend services

## 📄 License

This project is created for SkillBridge educational purposes.

## ✅ Checklist for Running the Project

- [ ] MySQL installed and running
- [ ] Created `skillbridge_db` database
- [ ] Backend built with `mvnw clean install`
- [ ] Backend running on `http://localhost:8080`
- [ ] Frontend opened in browser
- [ ] Can access worker registration page
- [ ] Can access customer registration page
- [ ] Forms submit without network errors
- [ ] Data appears in MySQL database
- [ ] Job matching works correctly

---

**Last Updated:** March 2026
**Version:** 2.0 (Fully Corrected)
