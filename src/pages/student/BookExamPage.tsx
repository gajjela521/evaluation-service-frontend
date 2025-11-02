import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useSearchParams } from 'react-router-dom';
import { examService } from '@/services/exam.service';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';

export const BookExamPage = () => {
  const [searchParams] = useSearchParams();
  const subjectId = searchParams.get('subjectId') || '';
  const [selectedSlotId, setSelectedSlotId] = useState<string>('');
  const [examDate, setExamDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: slots, isLoading } = useQuery({
    queryKey: ['exam-slots', subjectId, examDate],
    queryFn: () => examService.getAvailableSlots(examDate, subjectId),
    enabled: !!subjectId && !!examDate,
  });

  const bookingMutation = useMutation({
    mutationFn: (slotId: string) => {
      if (!user) throw new Error('User not authenticated');
      return examService.bookExam(user.id, slotId, subjectId);
    },
    onSuccess: () => {
      toast.success('Exam booked successfully!');
      queryClient.invalidateQueries({ queryKey: ['exam-slots'] });
      setSelectedSlotId('');
    },
    onError: () => {
      toast.error('Failed to book exam. Please try again.');
    },
  });

  const handleBooking = () => {
    if (!selectedSlotId) {
      toast.error('Please select a time slot');
      return;
    }
    bookingMutation.mutate(selectedSlotId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Book Exam</h1>
            <Link to="/student/subjects" className="text-blue-600 hover:text-blue-800">
              Back to Subjects
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Date Selector */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <label htmlFor="examDate" className="block text-sm font-medium text-gray-700 mb-2">
            Select Exam Date
          </label>
          <input
            type="date"
            id="examDate"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {!isLoading && slots && slots.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-600">No available exam slots at the moment.</p>
            <Link
              to="/student/subjects"
              className="mt-4 inline-block text-blue-600 hover:text-blue-800"
            >
              Browse other subjects
            </Link>
          </div>
        )}

        {!isLoading && slots && slots.length > 0 && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Available Exam Slots</h2>
              <div className="space-y-4">
                {slots.map((slot) => {
                  const isFull = slot.status === 'full';
                  const isDisabled = isFull || slot.status === 'completed';

                  return (
                    <div
                      key={slot.id}
                      className={`border rounded-lg p-4 ${
                        selectedSlotId === slot.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-300'
                      } ${isDisabled ? 'opacity-60' : 'cursor-pointer hover:border-blue-400'}`}
                      onClick={() => !isDisabled && setSelectedSlotId(slot.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-gray-900">
                            {slot.subjectName}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">Code: {slot.subjectCode}</p>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-gray-600">Date:</span>{' '}
                              <span className="font-medium">
                                {new Date(slot.date).toLocaleDateString()}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-600">Time:</span>{' '}
                              <span className="font-medium">
                                {slot.startTime} - {slot.endTime}
                              </span>
                            </div>
                            {slot.venue && (
                              <div>
                                <span className="text-gray-600">Venue:</span>{' '}
                                <span className="font-medium">{slot.venue}</span>
                              </div>
                            )}
                            {slot.capacity && (
                              <div>
                                <span className="text-gray-600">Seats:</span>{' '}
                                <span className="font-medium">
                                  {slot.bookedSeats || 0}/{slot.capacity}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="ml-4">
                          {isFull && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Full
                            </span>
                          )}
                          {!isFull && slot.status === 'available' && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              Available
                            </span>
                          )}
                          {slot.status === 'completed' && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              Completed
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {selectedSlotId && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <button
                  onClick={handleBooking}
                  disabled={bookingMutation.isPending}
                  className="w-full py-3 px-4 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {bookingMutation.isPending ? 'Booking...' : 'Confirm Booking'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
