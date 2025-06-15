// API utility class
class API {
    constructor() {
        this.baseURL = window.APP_CONFIG.API.BASE_URL;
        this.headers = {
            'Content-Type': 'application/json'
        };
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: this.headers,
            ...options
        };

        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API Request failed:', error);
            throw error;
        }
    }

    // GET request
    async get(endpoint) {
        return this.request(endpoint, { method: 'GET' });
    }

    // POST request
    async post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    // DELETE request
    async delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    }

    // Health check
    async checkHealth() {
        return this.get(window.APP_CONFIG.API.ENDPOINTS.HEALTH);
    }

    // Exam-related API calls
    async getSubjects(classId) {
        return this.get(`${window.APP_CONFIG.API.ENDPOINTS.SUBJECTS}?classId=${classId}`);
    }

    async getExamSlots(examDate, subjectId) {
        return this.get(`${window.APP_CONFIG.API.ENDPOINTS.SLOTS}?examDate=${examDate}&subjectId=${subjectId}`);
    }

    async bookExamSlot(studentId, slotId, subjectId) {
        return this.post(window.APP_CONFIG.API.ENDPOINTS.BOOK, {
            studentId,
            slotId,
            subjectId
        });
    }

    async cancelRegistration(registrationId, studentId) {
        return this.delete(`${window.APP_CONFIG.API.ENDPOINTS.CANCEL}/${registrationId}?studentId=${studentId}`);
    }

    async getScores(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        return this.get(`${window.APP_CONFIG.API.ENDPOINTS.SCORES}?${queryString}`);
    }
}

// Global API instance
window.api = new API();