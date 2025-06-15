/ API Configuration
window.APP_CONFIG = {
    // Backend API URLs
    API: {
        BASE_URL: 'https://evaluation-service-latest.onrender.com',
        ENDPOINTS: {
            HEALTH: '/actuator/health',
            SUBJECTS: '/api/exams/subjects',
            SLOTS: '/api/exams/slots',
            BOOK: '/api/exams/book',
            CANCEL: '/api/exams/cancel',
            SCORES: '/evaluation/scores'
        }
    },

    // UI Configuration
    UI: {
        ITEMS_PER_PAGE: 10,
        AUTO_REFRESH_INTERVAL: 30000, // 30 seconds
        THEMES: ['light', 'dark']
    },

    // User roles
    ROLES: {
        STUDENT: 'student',
        TEACHER: 'teacher',
        ADMIN: 'admin'
    }
};