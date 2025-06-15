const API_BASE_URL = 'https://evaluation-service-latest.onrender.com';

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

        return await response.json();
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
}

// Student API Functions
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

// Health Check
const SystemAPI = {
    async healthCheck() {
        return apiRequest('/actuator/health');
    }
};