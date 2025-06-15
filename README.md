##  Live URLs

| Service | URL | Purpose |
|---------|-----|---------|
| **Frontend Home** | `https://gajjela521.github.io/evaluation-service-frontend/` | Main landing page |
| **API Status Dashboard** | `https://gajjela521.github.io/evaluation-service-frontend/status/` | Real-time system monitoring |
| **Admin Dashboard** | `https://gajjela521.github.io/evaluation-service-frontend/admin/dashboard.html` | System administration |
| **Backend API** | `https://evaluation-service-latest.onrender.com` | REST API endpoints |
| **Health Check** | `https://evaluation-service-latest.onrender.com/actuator/health` | API health status |

##  Key Features

### ** Real-time Monitoring System**
- **API health dashboard** with live status indicators
- **CORS validation** - automatic frontend ↔ backend testing
- **Performance metrics** - response time tracking and charts
- **Service component monitoring** - MongoDB, Email, Disk Space
- **Manual API testing** - debug tools with custom parameters
- **Activity logging** - real-time event tracking
- **Auto-refresh** - updates every 30 seconds

### ** Exam Management** 
- **Subject management** - organize courses and topics
- **Exam slot booking** - time-based scheduling system
- **Score evaluation** - automated grading and results
- **Student registration** - exam enrollment with validation
- **Email notifications** - automated confirmations and updates

### ** Multi-role Access**
- **Students** - exam booking, score viewing, schedule management
- **Teachers** - grade submission, student management, analytics
- **Admins** - system monitoring, user management, configuration

##  API Endpoints

### **Core Exam APIs**
```bash
GET    /api/exams/subjects           # Get available subjects
GET    /api/exams/slots             # Get exam time slots  
POST   /api/exams/book              # Book exam slot
DELETE /api/exams/cancel/{id}       # Cancel exam registration
```

### **Evaluation APIs**
```bash
GET    /evaluation/scores           # Get student scores
POST   /evaluation/submit           # Submit exam answers
GET    /evaluation/results/{examId} # Get exam results
```

### **Monitoring APIs**
```bash
GET    /actuator/health             # Application health status
GET    /actuator/metrics            # Performance metrics
GET    /actuator/info               # Application information
```

##   Development Setup

### **Backend Setup**
```bash
# Clone and setup backend
git clone https://github.com/gajjela521/evaluation_service.git
cd evaluation-service
./gradlew bootRun

# Environment variables needed:
MONGODB_USERNAME=your_username
MONGODB_PASSWORD=your_password  
MAIL_PASSWORD=your_gmail_app_password
```

### **Frontend Setup**
```bash
# Clone and setup frontend
git clone https://github.com/gajjela521/evaluation-service-frontend.git
cd evaluation-service-frontend

# Serve locally (optional)
python -m http.server 8000
# or
npx serve .
```

##  Deployment

### **Frontend (GitHub Pages)**
- **Auto-deployment** on push to main branch
- **Custom domain support** available
- **HTTPS** enabled by default
- **CDN** distributed globally

### **Backend (Render)**
- **Auto-deployment** from GitHub repository
- **Environment variables** configured in Render dashboard
- **Health checks** enabled with Spring Actuator
- **SSL/HTTPS** terminated at Render edge

##  Monitoring & Operations

### **Status Dashboard Features**
- **Live API testing** - all endpoints monitored every 30 seconds
- **CORS health** - validates cross-origin requests
- **Performance charts** - response time trends and distribution  
- **Component status** - database, email, storage health
- **Manual testing** - API explorer with custom parameters
- **Error tracking** - real-time failure notifications

### **Production Monitoring**
```bash
# Check system health
curl https://evaluation-service-latest.onrender.com/actuator/health

# Test CORS from frontend domain
curl -H "Origin: https://gajjela521.github.io" \
     -X OPTIONS \
     https://evaluation-service-latest.onrender.com/api/exams/slots
```

##  Quick Links

- [ Live Application](https://gajjela521.github.io/evaluation-service-frontend/)
- [ API Status Dashboard](https://gajjela521.github.io/evaluation-service-frontend/status/)  
- [ Backend Health Check](https://evaluation-service-latest.onrender.com/actuator/health)
- [ Admin Dashboard](https://gajjela521.github.io/evaluation-service-frontend/admin/dashboard.html)
- [ Frontend Repository](https://github.com/gajjela521/evaluation-service-frontend)
- [ Backend Repository](https://github.com/gajjela521/evaluation_service)
