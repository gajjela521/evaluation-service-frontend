import { api } from './api';
import type { ExamSlot, ExamBooking, Subject } from '@/types';

export const examService = {
  // Get all available subjects
  async getSubjects(): Promise<Subject[]> {
    return api.get<Subject[]>('/api/exams/subjects');
  },

  // Get available exam slots
  async getAvailableSlots(subjectId?: string): Promise<ExamSlot[]> {
    const url = subjectId ? `/api/exams/slots?subjectId=${subjectId}` : '/api/exams/slots';
    return api.get<ExamSlot[]>(url);
  },

  // Book an exam slot
  async bookExam(slotId: string): Promise<ExamBooking> {
    return api.post<ExamBooking>('/api/exams/book', { slotId });
  },

  // Get student's exam bookings
  async getMyBookings(): Promise<ExamBooking[]> {
    return api.get<ExamBooking[]>('/api/exams/my-bookings');
  },

  // Cancel an exam booking
  async cancelBooking(bookingId: string): Promise<void> {
    return api.delete<void>(`/api/exams/cancel/${bookingId}`);
  },
};
