// Status Dashboard Configuration
window.STATUS_CONFIG = {
    // API Configuration
    API_BASE_URL: 'https://evaluation-service-latest.onrender.com',

    // Monitoring Settings
    REFRESH_INTERVAL: 30000,        // 30 seconds
    WIDGET_REFRESH: 60000,          // 1 minute for widgets
    CHART_HISTORY_LIMIT: 20,        // Keep last 20 data points
    LOG_ENTRY_LIMIT: 50,            // Keep last 50 log entries

    // Status Thresholds
    THRESHOLDS: {
        RESPONSE_TIME_FAST: 100,     // < 100ms = fast
        RESPONSE_TIME_MEDIUM: 500,   // 100-500ms = medium
        RESPONSE_TIME_SLOW: 1000,    // 500-1000ms = slow
        // > 1000ms = very slow
    },

    // Critical Endpoints (must be UP for system to be considered healthy)
    CRITICAL_ENDPOINTS: [
        '/actuator/health',
        '/api/exams/subjects',
        '/api/exams/slots'
    ],

    // Notification Settings
    NOTIFICATIONS: {
        ENABLE_BROWSER_NOTIFICATIONS: true,
        NOTIFY_ON_CRITICAL_FAILURE: true,
        NOTIFY_ON_RECOVERY: true
    }
};