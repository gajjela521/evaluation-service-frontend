// User roles
export type UserRole = 'student' | 'teacher' | 'principal' | 'it_admin' | 'admin';

// User types
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
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
  qualification?: string;
}

export interface Principal extends User {
  role: 'principal';
  employeeId: string;
  department?: string;
  yearsOfExperience?: number;
}

export interface ITAdmin extends User {
  role: 'it_admin';
  employeeId: string;
  department?: string;
  systemRole?: string;
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
export interface BaseRegistration {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface StudentRegistration extends BaseRegistration {
  role: 'student';
  enrollmentNumber: string;
  department?: string;
  semester?: number;
}

export interface TeacherRegistration extends BaseRegistration {
  role: 'teacher';
  employeeId: string;
  department?: string;
  specialization?: string;
  qualification?: string;
}

export interface PrincipalRegistration extends BaseRegistration {
  role: 'principal';
  employeeId: string;
  department?: string;
  yearsOfExperience?: number;
}

export interface ITAdminRegistration extends BaseRegistration {
  role: 'it_admin';
  employeeId: string;
  department?: string;
  systemRole?: string;
}

export type Registration = StudentRegistration | TeacherRegistration | PrincipalRegistration | ITAdminRegistration;

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
