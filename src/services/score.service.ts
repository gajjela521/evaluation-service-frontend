import { api } from './api';
import type { Score } from '@/types';

export const scoreService = {
  // Get student's scores with optional filters
  async getMyScores(queryParams?: Record<string, string>): Promise<Score[]> {
    const params = new URLSearchParams(queryParams).toString();
    const url = params ? `/evaluation/scores?${params}` : '/evaluation/scores';
    return api.get<Score[]>(url);
  },

  // Get scores for a specific student
  async getScoresByStudent(studentId: string): Promise<Score[]> {
    return api.get<Score[]>(`/evaluation/scores?studentId=${studentId}`);
  },

  // Get scores for a specific subject
  async getScoresBySubject(subjectId: string): Promise<Score[]> {
    return api.get<Score[]>(`/evaluation/scores?subjectId=${subjectId}`);
  },

  // For teachers: Submit scoresheets (multiple scores)
  async submitScoreSheets(scoreSheets: Array<{
    studentId: string;
    subjectId: string;
    marksObtained: number;
    totalMarks: number;
  }>): Promise<string> {
    return api.post<string>('/evaluation/sheets', scoreSheets);
  },
};
