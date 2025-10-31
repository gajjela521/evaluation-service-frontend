export const env = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://evaluation-service.onrender.com',
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Evaluation Service',
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
} as const;
