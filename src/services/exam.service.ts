import { api } from './api';
import type { ExamSlot, ExamBooking, Subject } from '@/types';

export const examService = {
  // Get all available subjects (requires classId)
  async getSubjects(classId: string = 'default'): Promise<Subject[]> {
    return api.get<Subject[]>(`/api/exams/subjects?classId=${classId}`);
  },

  // Get available exam slots (requires examDate and subjectId)
  async getAvailableSlots(examDate: string, subjectId: string): Promise<ExamSlot[]> {
    return api.get<ExamSlot[]>(`/api/exams/slots?examDate=${examDate}&subjectId=${subjectId}`);
  },

  // Book an exam slot
  async bookExam(studentId: string, slotId: string, subjectId: string): Promise<ExamBooking> {
    return api.post<ExamBooking>('/api/exams/book', { studentId, slotId, subjectId });
  },

  // Cancel an exam booking
  async cancelBooking(registrationId: string, studentId: string): Promise<void> {
    return api.delete<void>(`/api/exams/cancel/${registrationId}?studentId=${studentId}`);
  },
};
