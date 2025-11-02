import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { monitoringService } from '@/services/monitoring.service';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface EndpointCheck {
  name: string;
  url: string;
  method: string;
  status: 'up' | 'down';
  responseTime: number;
  timestamp: string;
}

export const StatusPage = () => {
  const [endpoints, setEndpoints] = useState<EndpointCheck[]>([]);
  const [lastUpdate, setLastUpdate] = useState<string>(new Date().toISOString());

  const { data: healthData, isLoading } = useQuery({
    queryKey: ['system-health'],
    queryFn: monitoringService.getSystemHealth,
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const endpointsToCheck = [
    { name: 'Health Check', url: '/actuator/health', method: 'GET' },
    { name: 'Subjects API', url: '/api/exams/subjects', method: 'GET' },
    { name: 'Exam Slots', url: '/api/exams/slots', method: 'GET' },
    { name: 'Student Scores', url: '/api/evaluation/scores', method: 'GET' },
  ];

  useEffect(() => {
    const checkEndpoints = async () => {
      const results = await Promise.all(
        endpointsToCheck.map(async (endpoint) => {
          try {
            const result = await monitoringService.checkEndpoint(endpoint.url, endpoint.method);
            return {
              ...endpoint,
              status: result.status === 200 ? ('up' as const) : ('down' as const),
              responseTime: result.responseTime,
              timestamp: new Date().toISOString(),
            };
          } catch {
            return {
              ...endpoint,
              status: 'down' as const,
              responseTime: 0,
              timestamp: new Date().toISOString(),
            };
          }
        })
      );
      setEndpoints(results);
      setLastUpdate(new Date().toISOString());
    };

    checkEndpoints();
    const interval = setInterval(checkEndpoints, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const chartData = {
    labels: endpoints.map((e) => e.name),
    datasets: [
      {
        label: 'Response Time (ms)',
        data: endpoints.map((e) => e.responseTime),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'API Response Times',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Milliseconds',
        },
      },
    },
  };

  const upCount = endpoints.filter((e) => e.status === 'up').length;
  const downCount = endpoints.length - upCount;
  const avgResponseTime =
    endpoints.length > 0
      ? endpoints.reduce((sum, e) => sum + e.responseTime, 0) / endpoints.length
      : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">System Status</h1>
            <Link to="/" className="text-blue-600 hover:text-blue-800">
              Home
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* System Health Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">System Status</p>
            <div className="flex items-center">
              <span
                className={`inline-block h-3 w-3 rounded-full mr-2 ${
                  healthData?.status === 'UP' ? 'bg-green-500' : 'bg-red-500'
                }`}
              ></span>
              <p className="text-2xl font-bold">{isLoading ? 'Checking...' : healthData?.status || 'UNKNOWN'}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">Endpoints Up</p>
            <p className="text-2xl font-bold text-green-600">
              {upCount}/{endpoints.length}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">Endpoints Down</p>
            <p className="text-2xl font-bold text-red-600">{downCount}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">Avg Response</p>
            <p className="text-2xl font-bold text-blue-600">{avgResponseTime.toFixed(0)}ms</p>
          </div>
        </div>

        {/* Response Time Chart */}
        {endpoints.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <Line options={chartOptions} data={chartData} />
          </div>
        )}

        {/* Endpoints Status Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Endpoints Status</h2>
              <p className="text-sm text-gray-600">
                Last updated: {new Date(lastUpdate).toLocaleTimeString()}
              </p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Endpoint
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Method
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Response Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Last Check
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {endpoints.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                      Checking endpoints...
                    </td>
                  </tr>
                )}
                {endpoints.map((endpoint, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{endpoint.name}</div>
                      <div className="text-xs text-gray-500">{endpoint.url}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        {endpoint.method}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          endpoint.status === 'up'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {endpoint.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {endpoint.responseTime > 0 ? `${endpoint.responseTime}ms` : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(endpoint.timestamp).toLocaleTimeString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
