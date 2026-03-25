# SkillBridge - Quick Reference Guide

## ⚡ Quick Start (5 minutes)

### 1. Start MySQL
```bash
# Windows
net start MySQL80

# Linux
sudo systemctl start mysql

# Mac
brew services start mysql
```

### 2. Create Database
```bash
mysql -u root -p
```
```sql
CREATE DATABASE skillbridge_db;
EXIT;
```

### 3. Start Backend
```bash
cd backend/backend
mvnw spring-boot:run
```
✅ Backend ready at: `http://localhost:8080`

### 4. Start Frontend
Open any of these in your browser:
- Option A: Open `frontend/index.html` directly
- Option B: Use VS Code Live Server
- Option C: Python: `cd frontend` then `python -m http.server 8000`

✅ Frontend ready at: `http://localhost:8000` (or similar)

---

## 🔗 Key API Routes

```
POST   /api/workers/register     → Register worker
GET    /api/workers              → List all workers
GET    /api/workers/{id}/jobs    → Get matched jobs for worker

POST   /api/jobs                 → Create job
GET    /api/jobs                 → List all jobs
GET    /api/jobs/search?skill=X&location=Y  → Search jobs

POST   /api/hirers/register      → Register hirer
GET    /api/hirers               → List all hirers
```

---

## 📝 Test Data

### Register a Worker
1. Go to `http://localhost/worker-register.html`
2. Fill form:
   - Name: John Doe
   - Email: john@gmail.com
   - Phone: 9876543210
   - Password: Pass1234
   - Location: Chennai
   - Skill: Electrician
3. Click "Register Now"
4. ✅ Should see success modal with Skill ID

### Register a Hirer
1. Go to `http://localhost/customer-register.html`
2. Fill form:
   - Name: ABC Company
   - Email: company@gmail.com
   - Phone: 9876543210
   - Password: Pass1234
   - User Type: Company
   - Location: Chennai
3. Click "Register Now"
4. ✅ Should see success modal

### Create a Job
Hirer posts job (after login implementation):
```json
{
  "title": "Electrical Wiring",
  "skill_required": "Electrician",
  "location": "Chennai",
  "budget": "5000",
  "hirer_id": 1
}
```

### View Matched Jobs
Worker views jobs matching their skill:
- Worker ID: 1
- GET: `/api/workers/1/jobs`
- ✅ Returns jobs where skill=Electrician and location=Chennai

---

## 🗄️ Database Commands

### Connect to MySQL
```bash
mysql -u root -p
```

### View All Databases
```sql
SHOW DATABASES;
```

### Use SkillBridge Database
```sql
USE skillbridge_db;
```

### View All Tables
```sql
SHOW TABLES;
```

### View Workers Data
```sql
SELECT * FROM workers;
```

### View Jobs Data
```sql
SELECT * FROM jobs;
```

### View Hirers Data
```sql
SELECT * FROM hirers;
```

### View Specific Worker
```sql
SELECT * FROM workers WHERE id=1;
```

### Delete All Data (Reset Database)
```sql
DELETE FROM jobs;
DELETE FROM workers;
DELETE FROM hirers;
ALTER TABLE workers AUTO_INCREMENT = 1;
ALTER TABLE jobs AUTO_INCREMENT = 1;
ALTER TABLE hirers AUTO_INCREMENT = 1;
```

---

## 🔍 Testing Checklist

- [ ] Backend starts without errors
- [ ] Frontend loads all pages
- [ ] Can register worker
- [ ] Worker data saved to database
- [ ] Can register hirer
- [ ] Hirer data saved to database
- [ ] Can create job via API
- [ ] Job matching works
- [ ] Browse to `/api/workers` shows worker list
- [ ] Browse to `/api/jobs` shows job list
- [ ] Browse to `/api/hirers` shows hirer list

---

## 🚨 Common Errors & Fixes

### Error: "Cannot connect to database"
```
Solution: 
1. Check MySQL is running: mysql -u root -p
2. Verify database exists: CREATE DATABASE skillbridge_db;
3. Restart backend
```

### Error: "CORS error in browser console"
```
Solution:
1. Verify backend running on http://localhost:8080
2. Check CorsConfig.java has correct origins
3. Hard refresh browser (Ctrl+F5)
```

### Error: "404 Not Found - API endpoint"
```
Solution:
1. Check URL path is correct (case-sensitive)
2. Verify backend has all controllers
3. Check request method (GET/POST/PUT/DELETE)
```

### Error: "Frontend shows 'Error connecting to server'"
```
Solution:
1. Verify backend is running: http://localhost:8080
2. Check api-service.js baseURL: 'http://localhost:8080/api'
3. Check browser console for network errors (F12)
```

---

## 📱 Frontend Pages

| Page | URL | Purpose |
|------|-----|---------|
| Home | index.html | Landing page |
| Worker Register | worker-register.html | Worker signup |
| Worker Login | worker-login.html | Worker signin |
| Worker Dashboard | worker-dashboard.html | Worker profile |
| Hirer Register | customer-register.html | Hirer signup |
| Hirer Login | customer-login.html | Hirer signin |
| Hirer Dashboard | customer-dashboard.html | Hirer profile |
| Skill Test | skill-test.html | Assessment |
| Skill Map | skill-map.html | Search |

---

## 🔑 Default Credentials (If Implemented)

| User | Email | Password |
|------|-------|----------|
| Admin | admin@skillbridge.com | Admin@123 |
| Test Worker | worker@test.com | Worker@123 |
| Test Hirer | hirer@test.com | Hirer@123 |

---

## 📂 Important File Locations

| File | Location | Purpose |
|------|----------|---------|
| API Service | `frontend/api-service.js` | All API calls |
| Database Config | `backend/src/main/resources/application.properties` | DB credentials |
| CORS Config | `backend/src/main/java/com/skillbridge/backend/config/CorsConfig.java` | CORS settings |
| Worker Model | `backend/src/main/java/com/skillbridge/backend/model/Worker.java` | Worker entity |
| Job Model | `backend/src/main/java/com/skillbridge/backend/model/Job.java` | Job entity |
| Hirer Model | `backend/src/main/java/com/skillbridge/backend/model/Hirer.java` | Hirer entity |

---

## 🎯 Next Steps

1. ✅ Verify all components working
2. ⚠️ Implement password hashing (BCrypt)
3. ⚠️ Add user authentication (JWT tokens)
4. ⚠️ Implement user login/logout
5. ⚠️ Add file upload for certificates
6. ⚠️ Add payment integration
7. ⚠️ Deploy to cloud server

---

## 📞 Support Resources

- **Backend Issues:** Check console output while `mvnw spring-boot:run`
- **Database Issues:** Use MySQL Workbench or command line
- **Frontend Issues:** Open browser Developer Tools (F12)
- **API Testing:** Use Postman or curl commands

---

## ✨ Features Implemented

- ✅ Worker registration with skill passport
- ✅ Job creation and management
- ✅ Job matching by skill and location
- ✅ Hirer/Customer registration
- ✅ Multi-language support (EN, Tamil)
- ✅ Voice input support
- ✅ Responsive design
- ✅ REST API endpoints
- ✅ MySQL database persistence
- ✅ CORS configuration

---

**Version:** 2.0
**Last Updated:** March 2026
