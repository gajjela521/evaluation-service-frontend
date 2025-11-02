import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import type { UserRole, Registration } from '@/types';
import toast from 'react-hot-toast';

type RoleOption = {
  value: UserRole;
  label: string;
  description: string;
};

const roleOptions: RoleOption[] = [
  {
    value: 'student',
    label: 'Student',
    description: 'Register as a student to book exams and view scores',
  },
  {
    value: 'teacher',
    label: 'Teacher',
    description: 'Register as a teacher to grade students and manage subjects',
  },
  {
    value: 'principal',
    label: 'Principal',
    description: 'Register as a principal to oversee academic operations',
  },
  {
    value: 'it_admin',
    label: 'IT Administrator',
    description: 'Register as IT admin to manage system and user access',
  },
];

export const RegisterPage = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [formData, setFormData] = useState({
    // Common fields
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    // Student fields
    enrollmentNumber: '',
    semester: '',
    // Teacher/Principal/IT Admin fields
    employeeId: '',
    department: '',
    // Teacher specific
    specialization: '',
    qualification: '',
    // Principal specific
    yearsOfExperience: '',
    // IT Admin specific
    systemRole: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedRole) {
      toast.error('Please select a role');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      let registrationData: Registration;

      // Build role-specific registration data
      switch (selectedRole) {
        case 'student':
          registrationData = {
            role: 'student',
            name: formData.name,
            email: formData.email,
            password: formData.password,
            enrollmentNumber: formData.enrollmentNumber,
            department: formData.department || undefined,
            semester: formData.semester ? parseInt(formData.semester) : undefined,
            phone: formData.phone || undefined,
          };
          break;

        case 'teacher':
          registrationData = {
            role: 'teacher',
            name: formData.name,
            email: formData.email,
            password: formData.password,
            employeeId: formData.employeeId,
            department: formData.department || undefined,
            specialization: formData.specialization || undefined,
            qualification: formData.qualification || undefined,
            phone: formData.phone || undefined,
          };
          break;

        case 'principal':
          registrationData = {
            role: 'principal',
            name: formData.name,
            email: formData.email,
            password: formData.password,
            employeeId: formData.employeeId,
            department: formData.department || undefined,
            yearsOfExperience: formData.yearsOfExperience ? parseInt(formData.yearsOfExperience) : undefined,
            phone: formData.phone || undefined,
          };
          break;

        case 'it_admin':
          registrationData = {
            role: 'it_admin',
            name: formData.name,
            email: formData.email,
            password: formData.password,
            employeeId: formData.employeeId,
            department: formData.department || undefined,
            systemRole: formData.systemRole || undefined,
            phone: formData.phone || undefined,
          };
          break;

        default:
          throw new Error('Invalid role selected');
      }

      await register(registrationData);
      toast.success('Registration successful!');

      // Navigate based on role
      const dashboardPath = selectedRole === 'student' ? '/student' : `/${selectedRole.replace('_', '-')}`;
      navigate(dashboardPath);
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderRoleSelection = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Select Your Role</h3>
      <div className="grid grid-cols-1 gap-4">
        {roleOptions.map((role) => (
          <button
            key={role.value}
            type="button"
            onClick={() => setSelectedRole(role.value)}
            className={`p-4 border-2 rounded-lg text-left transition ${
              selectedRole === role.value
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-300 hover:border-blue-400'
            }`}
          >
            <div className="font-semibold text-gray-900">{role.label}</div>
            <div className="text-sm text-gray-600 mt-1">{role.description}</div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderCommonFields = () => (
    <>
      <div>
        <input
          name="name"
          type="text"
          required
          className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          name="email"
          type="email"
          required
          className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          name="phone"
          type="tel"
          className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Phone Number (Optional)"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          name="password"
          type="password"
          required
          minLength={6}
          className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Password (min 6 characters)"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          name="confirmPassword"
          type="password"
          required
          className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </div>
    </>
  );

  const renderStudentFields = () => (
    <>
      <div>
        <input
          name="enrollmentNumber"
          type="text"
          required
          className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enrollment Number"
          value={formData.enrollmentNumber}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          name="department"
          type="text"
          className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Department (Optional)"
          value={formData.department}
          onChange={handleChange}
        />
      </div>
      <div>
        <select
          name="semester"
          className="appearance-none relative block w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          value={formData.semester}
          onChange={handleChange}
        >
          <option value="">Select Semester (Optional)</option>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
            <option key={sem} value={sem}>
              Semester {sem}
            </option>
          ))}
        </select>
      </div>
    </>
  );

  const renderTeacherFields = () => (
    <>
      <div>
        <input
          name="employeeId"
          type="text"
          required
          className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Employee ID"
          value={formData.employeeId}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          name="department"
          type="text"
          className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Department (Optional)"
          value={formData.department}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          name="specialization"
          type="text"
          className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Specialization (Optional)"
          value={formData.specialization}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          name="qualification"
          type="text"
          className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Qualification (e.g., PhD, M.Tech)"
          value={formData.qualification}
          onChange={handleChange}
        />
      </div>
    </>
  );

  const renderPrincipalFields = () => (
    <>
      <div>
        <input
          name="employeeId"
          type="text"
          required
          className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Employee ID"
          value={formData.employeeId}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          name="department"
          type="text"
          className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Department (Optional)"
          value={formData.department}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          name="yearsOfExperience"
          type="number"
          min="0"
          className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Years of Experience (Optional)"
          value={formData.yearsOfExperience}
          onChange={handleChange}
        />
      </div>
    </>
  );

  const renderITAdminFields = () => (
    <>
      <div>
        <input
          name="employeeId"
          type="text"
          required
          className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Employee ID"
          value={formData.employeeId}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          name="department"
          type="text"
          className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Department (Optional)"
          value={formData.department}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          name="systemRole"
          type="text"
          className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="System Role (e.g., Database Admin, Network Admin)"
          value={formData.systemRole}
          onChange={handleChange}
        />
      </div>
    </>
  );

  const renderRoleSpecificFields = () => {
    switch (selectedRole) {
      case 'student':
        return renderStudentFields();
      case 'teacher':
        return renderTeacherFields();
      case 'principal':
        return renderPrincipalFields();
      case 'it_admin':
        return renderITAdminFields();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </p>
        </div>

        {!selectedRole ? (
          renderRoleSelection()
        ) : (
          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">
                Register as {roleOptions.find((r) => r.value === selectedRole)?.label}
              </h3>
              <button
                type="button"
                onClick={() => setSelectedRole(null)}
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                Change Role
              </button>
            </div>

            {renderCommonFields()}
            {renderRoleSpecificFields()}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Creating account...' : 'Create account'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
