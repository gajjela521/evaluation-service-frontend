import { api } from './api';
import type { Score } from '@/types';

export const scoreService = {
  // Get student's scores
  async getMyScores(): Promise<Score[]> {
    return api.get<Score[]>('/api/evaluation/scores');
  },

  // Get scores for a specific subject
  async getScoresBySubject(subjectId: string): Promise<Score[]> {
    return api.get<Score[]>(`/api/evaluation/scores/subject/${subjectId}`);
  },

  // For teachers: Get all scores for students in a subject
  async getSubjectScores(subjectId: string): Promise<Score[]> {
    return api.get<Score[]>(`/api/evaluation/subject/${subjectId}/scores`);
  },

  // For teachers: Submit or update a score
  async submitScore(data: {
    studentId: string;
    subjectId: string;
    marksObtained: number;
    totalMarks: number;
  }): Promise<Score> {
    return api.post<Score>('/api/evaluation/scores', data);
  },
};
