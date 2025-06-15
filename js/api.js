// API Configuration
const API_BASE_URL = 'https://evaluation-service-latest.onrender.com';

// Common API request handler
async function apiRequest(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Origin': 'https://gajjela521.github.io'
        }
    };

    try {
        const response = await fetch(url, { ...defaultOptions, ...options });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
}

// Student Registration API
const StudentRegistrationAPI = {
    // Register new student
    async registerStudent(studentData) {
        return apiRequest('/api/students/register', {
            method: 'POST',
            body: JSON.stringify(studentData)
        });
    },

    // Check if student exists
    async checkStudentExists(email) {
        return apiRequest(`/api/students/check?email=${email}`);
    },

    // Get student profile
    async getStudentProfile(studentId) {
        return apiRequest(`/api/students/${studentId}`);
    },

    // Update student profile
    async updateStudentProfile(studentId, studentData) {
        return apiRequest(`/api/students/${studentId}`, {
            method: 'PUT',
            body: JSON.stringify(studentData)
        });
    }
};

// Subject Management API
const SubjectAPI = {
    // Get all subjects
    async getAllSubjects() {
        return apiRequest('/api/subjects');
    },

    // Get subjects by class
    async getSubjectsByClass(classId) {
        return apiRequest(`/api/subjects?classId=${classId}`);
    },

    // Create new subject (admin only)
    async createSubject(subjectData) {
        return apiRequest('/api/subjects', {
            method: 'POST',
            body: JSON.stringify(subjectData)
        });
    },

    // Update subject (admin only)
    async updateSubject(subjectId, subjectData) {
        return apiRequest(`/api/subjects/${subjectId}`, {
            method: 'PUT',
            body: JSON.stringify(subjectData)
        });
    },

    // Delete subject (admin only)
    async deleteSubject(subjectId) {
        return apiRequest(`/api/subjects/${subjectId}`, {
            method: 'DELETE'
        });
    }
};

// Enhanced Exam Registration API
const ExamRegistrationAPI = {
    // Get available exam slots
    async getAvailableSlots(subjectId, examDate) {
        return apiRequest(`/api/exams/slots?subjectId=${subjectId}&examDate=${examDate}`);
    },

    // Register for exam
    async registerForExam(registrationData) {
        return apiRequest('/api/exams/register', {
            method: 'POST',
            body: JSON.stringify(registrationData)
        });
    },

    // Get student's exam registrations
    async getStudentRegistrations(studentId) {
        return apiRequest(`/api/exams/registrations?studentId=${studentId}`);
    },

    // Cancel exam registration
    async cancelRegistration(registrationId) {
        return apiRequest(`/api/exams/registrations/${registrationId}`, {
            method: 'DELETE'
        });
    },

    // Get exam schedule
    async getExamSchedule(classId) {
        return apiRequest(`/api/exams/schedule?classId=${classId}`);
    }
};

// Student API (existing functions)
const StudentAPI = {
    // Get available subjects
    async getSubjects(classId) {
        return apiRequest(`/api/exams/subjects?classId=${classId}`);
    },

    // Get exam slots
    async getExamSlots(examDate, subjectId) {
        return apiRequest(`/api/exams/slots?examDate=${examDate}&subjectId=${subjectId}`);
    },

    // Book an exam
    async bookExam(examData) {
        return apiRequest('/api/exams/book', {
            method: 'POST',
            body: JSON.stringify(examData)
        });
    },

    // Cancel exam registration
    async cancelExam(examId, studentId) {
        return apiRequest(`/api/exams/cancel/${examId}?studentId=${studentId}`, {
            method: 'DELETE'
        });
    },

    // Get student scores
    async getScores(studentId) {
        return apiRequest(`/evaluation/scores?studentId=${studentId}`);
    }
};

// Teacher API Functions
const TeacherAPI = {
    // Submit grades
    async submitGrades(gradeData) {
        return apiRequest('/evaluation/submit', {
            method: 'POST',
            body: JSON.stringify(gradeData)
        });
    },

    // Get exam results
    async getExamResults(examId) {
        return apiRequest(`/evaluation/results/${examId}`);
    },

    // Get students list
    async getStudents(classId) {
        return apiRequest(`/api/students?classId=${classId}`);
    }
};

// Admin Management API
const AdminAPI = {
    // Get all student registrations
    async getAllRegistrations() {
        return apiRequest('/api/admin/registrations');
    },

    // Get registration statistics
    async getRegistrationStats() {
        return apiRequest('/api/admin/stats');
    },

    // Approve/reject student registration
    async updateRegistrationStatus(registrationId, status) {
        return apiRequest(`/api/admin/registrations/${registrationId}`, {
            method: 'PATCH',
            body: JSON.stringify({ status })
        });
    }
};

// Health Check
const SystemAPI = {
    async healthCheck() {
        return apiRequest('/actuator/health');
    }
};

// Utility Functions
const Utils = {
    // Show loading spinner
    showLoading(elementId) {
        document.getElementById(elementId).innerHTML = `
            <div class="d-flex justify-content-center p-4">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        `;
    },

    // Show success message
    showSuccess(elementId, message) {
        document.getElementById(elementId).innerHTML = `
            <div class="alert alert-success">
                <i class="fas fa-check-circle me-2"></i>${message}
            </div>
        `;
    },

    // Show error message
    showError(elementId, message) {
        document.getElementById(elementId).innerHTML = `
            <div class="alert alert-danger">
                <i class="fas fa-exclamation-circle me-2"></i>${message}
            </div>
        `;
    },

    // Format date
    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString();
    },

    // Validate email
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    // Validate phone
    validatePhone(phone) {
        const re = /^\d{10}$/;
        return re.test(phone.replace(/\D/g, ''));
    }
};