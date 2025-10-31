import { api } from './api';
import type { SystemHealth } from '@/types';

export const monitoringService = {
  // Get system health status
  async getSystemHealth(): Promise<SystemHealth> {
    return api.get<SystemHealth>('/actuator/health');
  },

  // Check endpoint status - manual check
  async checkEndpoint(
    url: string,
    method: string = 'GET'
  ): Promise<{ status: number; responseTime: number }> {
    const startTime = Date.now();
    try {
      await (method === 'GET'
        ? api.get(url)
        : method === 'POST'
          ? api.post(url)
          : api.get(url));

      const responseTime = Date.now() - startTime;
      return {
        status: 200,
        responseTime,
      };
    } catch (error: unknown) {
      const responseTime = Date.now() - startTime;
      if (error && typeof error === 'object' && 'statusCode' in error) {
        return {
          status: (error as { statusCode: number }).statusCode,
          responseTime,
        };
      }
      return {
        status: 500,
        responseTime,
      };
    }
  },
};
