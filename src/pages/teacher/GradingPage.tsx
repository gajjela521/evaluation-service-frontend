import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { scoreService } from '@/services/score.service';
import toast from 'react-hot-toast';

export const GradingPage = () => {
  const [formData, setFormData] = useState({
    studentId: '',
    subjectId: '',
    marksObtained: '',
    totalMarks: '',
  });
  const queryClient = useQueryClient();

  const submitMutation = useMutation({
    mutationFn: (data: {
      studentId: string;
      subjectId: string;
      marksObtained: number;
      totalMarks: number;
    }) => scoreService.submitScoreSheets([data]),
    onSuccess: () => {
      toast.success('Score submitted successfully!');
      setFormData({
        studentId: '',
        subjectId: '',
        marksObtained: '',
        totalMarks: '',
      });
      queryClient.invalidateQueries({ queryKey: ['subject-scores'] });
    },
    onError: () => {
      toast.error('Failed to submit score. Please try again.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const marksObtained = parseFloat(formData.marksObtained);
    const totalMarks = parseFloat(formData.totalMarks);

    if (isNaN(marksObtained) || isNaN(totalMarks)) {
      toast.error('Please enter valid marks');
      return;
    }

    if (marksObtained > totalMarks) {
      toast.error('Marks obtained cannot be greater than total marks');
      return;
    }

    if (marksObtained < 0 || totalMarks <= 0) {
      toast.error('Please enter valid positive numbers');
      return;
    }

    submitMutation.mutate({
      studentId: formData.studentId,
      subjectId: formData.subjectId,
      marksObtained,
      totalMarks,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Grade Students</h1>
            <Link to="/teacher" className="text-blue-600 hover:text-blue-800">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Submit Student Score</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-1">
                Student ID
              </label>
              <input
                type="text"
                id="studentId"
                name="studentId"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter student ID"
                value={formData.studentId}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="subjectId" className="block text-sm font-medium text-gray-700 mb-1">
                Subject ID
              </label>
              <input
                type="text"
                id="subjectId"
                name="subjectId"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter subject ID"
                value={formData.subjectId}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="marksObtained"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Marks Obtained
                </label>
                <input
                  type="number"
                  id="marksObtained"
                  name="marksObtained"
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                  value={formData.marksObtained}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor="totalMarks"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Total Marks
                </label>
                <input
                  type="number"
                  id="totalMarks"
                  name="totalMarks"
                  required
                  min="1"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="100"
                  value={formData.totalMarks}
                  onChange={handleChange}
                />
              </div>
            </div>

            {formData.marksObtained && formData.totalMarks && (
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <p className="text-sm text-gray-700">
                  Percentage:{' '}
                  <span className="font-semibold text-blue-700">
                    {((parseFloat(formData.marksObtained) / parseFloat(formData.totalMarks)) * 100).toFixed(2)}%
                  </span>
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={submitMutation.isPending}
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {submitMutation.isPending ? 'Submitting...' : 'Submit Score'}
            </button>
          </form>
        </div>

        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-yellow-800 mb-2">Note:</h3>
          <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
            <li>Make sure to enter the correct student ID and subject ID</li>
            <li>Marks should be accurate and verified before submission</li>
            <li>Once submitted, the grade will be calculated automatically</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
