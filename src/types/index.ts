// User roles
export type UserRole = 'student' | 'teacher' | 'admin';

// User types
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface Student extends User {
  role: 'student';
  enrollmentNumber: string;
  department?: string;
  semester?: number;
}

export interface Teacher extends User {
  role: 'teacher';
  employeeId: string;
  department?: string;
  specialization?: string;
}

export interface Admin extends User {
  role: 'admin';
}

// Authentication
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Subject
export interface Subject {
  id: string;
  code: string;
  name: string;
  credits: number;
  department?: string;
  semester?: number;
}

// Exam
export interface ExamSlot {
  id: string;
  subjectId: string;
  subjectName: string;
  subjectCode: string;
  date: string;
  startTime: string;
  endTime: string;
  venue?: string;
  capacity?: number;
  bookedSeats?: number;
  status: 'available' | 'full' | 'completed';
}

export interface ExamBooking {
  id: string;
  studentId: string;
  slotId: string;
  bookingDate: string;
  status: 'confirmed' | 'cancelled' | 'completed';
  slot?: ExamSlot;
}

// Scores and grades
export interface Score {
  id: string;
  studentId: string;
  subjectId: string;
  subjectName: string;
  subjectCode: string;
  marksObtained: number;
  totalMarks: number;
  percentage: number;
  grade: string;
  examDate: string;
  evaluatedBy?: string;
  evaluatedAt?: string;
}

// API Status Monitoring
export interface EndpointStatus {
  url: string;
  name: string;
  method: string;
  status: 'up' | 'down' | 'degraded';
  responseTime: number;
  lastChecked: string;
  statusCode?: number;
  error?: string;
}

export interface SystemHealth {
  status: 'UP' | 'DOWN';
  timestamp: string;
  components?: {
    [key: string]: {
      status: string;
      details?: Record<string, unknown>;
    };
  };
}

// Registration
export interface StudentRegistration {
  name: string;
  email: string;
  password: string;
  enrollmentNumber: string;
  department?: string;
  semester?: number;
  phone?: string;
}

// API Response wrapper
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}
