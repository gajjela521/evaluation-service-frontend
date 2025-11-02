import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { examService } from '@/services/exam.service';
import toast from 'react-hot-toast';

export const SubjectsPage = () => {
  const { data: subjects, isLoading, error } = useQuery({
    queryKey: ['subjects'],
    queryFn: () => examService.getSubjects('default'),
  });

  if (error) {
    toast.error('Failed to load subjects');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Subject Browser</h1>
            <Link to="/student" className="text-blue-600 hover:text-blue-800">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {!isLoading && subjects && subjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No subjects available at the moment.</p>
          </div>
        )}

        {!isLoading && subjects && subjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <div
                key={subject.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-gray-900">{subject.name}</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {subject.credits} Credits
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">Code: {subject.code}</p>
                {subject.department && (
                  <p className="text-sm text-gray-600 mb-2">Department: {subject.department}</p>
                )}
                {subject.semester && (
                  <p className="text-sm text-gray-600 mb-4">Semester: {subject.semester}</p>
                )}
                <Link
                  to={`/student/book-exam?subjectId=${subject.id}`}
                  className="inline-block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Book Exam
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
