import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { BrandLogo } from '../../components/common/BrandLogo';
import {
  UserPlus,
  Building2,
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Mail,
  User,
  Phone,
  Globe,
  Briefcase,
} from 'lucide-react';

export const RegisterPage = () => {
  const { registerStudent, registerCompany, googleLogin } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [role, setRole] = useState('student');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const [googleNoticeModal, setGoogleNoticeModal] = useState(false);

  // Student Form State
  const [studentForm, setStudentForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: 'Apex Institute of Technology',
    branch: 'Computer Science Engineering',
    graduationYear: '2026',
    password: '',
    confirmPassword: '',
  });

  // Company Form State
  const [companyForm, setCompanyForm] = useState({
    companyName: '',
    officialEmail: '',
    industry: 'Enterprise Software & Cloud',
    website: '',
    password: '',
    confirmPassword: '',
  });

  const handleStudentChange = (e) => {
    setStudentForm({ ...studentForm, [e.target.name]: e.target.value });
  };

  const handleCompanyChange = (e) => {
    setCompanyForm({ ...companyForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const form = role === 'student' ? studentForm : companyForm;

    if (form.password.length < 8) {
      setError('Password must be at least 8 characters in length');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match. Please verify both entries.');
      return;
    }

    setLoading(true);
    try {
      if (role === 'student') {
        const res = await registerStudent(studentForm);
        if (res.success) {
          toast.success(`Welcome to CareerAI, ${res.user.fullName}!`);
          navigate('/student/dashboard');
        }
      } else {
        const res = await registerCompany(companyForm);
        if (res.success) {
          toast.success(`Registered corporate account for ${res.user.companyName}!`);
          navigate('/company/dashboard');
        }
      }
    } catch (err) {
      setError(err.message || 'Registration failed. Please check inputs.');
      toast.error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setGoogleLoading(true);
    try {
      const res = await googleLogin();
      toast.info(res.message);
      setGoogleNoticeModal(true);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 lg:p-12 animate-fade-up">
      <div className="w-full max-w-5xl bg-white border border-border rounded-3xl shadow-card-hover overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Left Editorial Value Column */}
        <div className="lg:col-span-5 bg-cream/40 border-b lg:border-b-0 lg:border-r border-border p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-cream pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-burgundy/5 pointer-events-none" />

          <div className="relative z-10">
            <BrandLogo size="lg" to="/" className="mb-8" />
            <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-burgundy bg-burgundy/10 px-2.5 py-1 rounded-full border border-burgundy/20">
              Create an Account
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-text mt-4 mb-3 tracking-tight">
              Accelerate Your Placement Journey
            </h2>
            <p className="text-xs sm:text-sm text-slate-muted leading-relaxed">
              Join thousands of engineering students and recruiting teams using CareerAI to eliminate manual screening and unlock ATS compliance.
            </p>
          </div>

          <div className="relative z-10 my-8 space-y-3.5">
            <div className="flex items-start gap-3 text-xs text-slate-text">
              <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
              <span>Multi-dimensional semantic ATS resume evaluation</span>
            </div>
            <div className="flex items-start gap-3 text-xs text-slate-text">
              <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
              <span>Recruiter pipelines with verified student profiles</span>
            </div>
            <div className="flex items-start gap-3 text-xs text-slate-text">
              <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
              <span>Transparent placement cycle workflows and interview scheduling</span>
            </div>
          </div>

          <div className="relative z-10 pt-4 border-t border-border/80 flex items-center justify-between text-xs text-slate-muted">
            <span className="font-medium">No credit card required</span>
            <span className="font-mono text-[11px] font-semibold text-burgundy">CareerAI</span>
          </div>
        </div>

        {/* Right Registration Form Column */}
        <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center bg-white overflow-y-auto">
          <div className="max-w-lg mx-auto w-full">
            <div className="mb-6">
              <h3 className="text-2xl font-black text-slate-text tracking-tight">
                Create Account
              </h3>
              <p className="text-xs sm:text-sm text-slate-muted mt-1">
                Select your account type to begin onboarding.
              </p>
            </div>

            {/* Role Tabs: Student & Company (Admin registration forbidden) */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-cream-soft rounded-xl border border-border mb-6">
              <button
                type="button"
                onClick={() => {
                  setRole('student');
                  setError('');
                }}
                className={`flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all ${
                  role === 'student'
                    ? 'bg-burgundy text-white shadow-wine'
                    : 'text-slate-muted hover:text-slate-text'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Student</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setRole('company');
                  setError('');
                }}
                className={`flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all ${
                  role === 'company'
                    ? 'bg-burgundy text-white shadow-wine'
                    : 'text-slate-muted hover:text-slate-text'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Company / Recruiter</span>
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-danger/10 border border-danger/25 text-xs text-danger font-semibold">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {role === 'student' ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <Input
                      label="Full Name"
                      name="fullName"
                      value={studentForm.fullName}
                      onChange={handleStudentChange}
                      placeholder="e.g. Ashish Sharma"
                      icon={User}
                      required
                    />
                    <Input
                      label="College Email"
                      name="email"
                      type="email"
                      value={studentForm.email}
                      onChange={handleStudentChange}
                      placeholder="ashish@college.edu"
                      icon={Mail}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <Input
                      label="Phone Number"
                      name="phone"
                      value={studentForm.phone}
                      onChange={handleStudentChange}
                      placeholder="+91 98765 43210"
                      icon={Phone}
                      required
                    />
                    <Input
                      label="Graduation Year"
                      name="graduationYear"
                      type="number"
                      value={studentForm.graduationYear}
                      onChange={handleStudentChange}
                      placeholder="2026"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <Input
                      label="College / University"
                      name="college"
                      value={studentForm.college}
                      onChange={handleStudentChange}
                      placeholder="University Name"
                      required
                    />
                    <Select
                      label="Degree & Branch"
                      name="branch"
                      value={studentForm.branch}
                      onChange={handleStudentChange}
                      options={[
                        'Computer Science Engineering',
                        'Information Technology',
                        'Electronics & Communication',
                        'Mechanical Engineering',
                        'Electrical Engineering',
                      ]}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <Input
                      label="Password"
                      name="password"
                      type="password"
                      value={studentForm.password}
                      onChange={handleStudentChange}
                      placeholder="Min 8 characters"
                      icon={Lock}
                      required
                    />
                    <Input
                      label="Confirm Password"
                      name="confirmPassword"
                      type="password"
                      value={studentForm.confirmPassword}
                      onChange={handleStudentChange}
                      placeholder="Re-enter password"
                      icon={Lock}
                      required
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <Input
                      label="Company Name"
                      name="companyName"
                      value={companyForm.companyName}
                      onChange={handleCompanyChange}
                      placeholder="e.g. TechCorp Solutions"
                      icon={Building2}
                      required
                    />
                    <Input
                      label="Official Recruiter Email"
                      name="officialEmail"
                      type="email"
                      value={companyForm.officialEmail}
                      onChange={handleCompanyChange}
                      placeholder="recruiter@company.com"
                      icon={Mail}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <Select
                      label="Industry Category"
                      name="industry"
                      value={companyForm.industry}
                      onChange={handleCompanyChange}
                      options={[
                        'Enterprise Software & Cloud',
                        'FinTech & Payments Infrastructure',
                        'Artificial Intelligence & NLP',
                        'Cybersecurity & Risk',
                        'Digital Consulting & IT',
                      ]}
                      required
                    />
                    <Input
                      label="Company Website"
                      name="website"
                      value={companyForm.website}
                      onChange={handleCompanyChange}
                      placeholder="https://company.io"
                      icon={Globe}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <Input
                      label="Password"
                      name="password"
                      type="password"
                      value={companyForm.password}
                      onChange={handleCompanyChange}
                      placeholder="Min 8 characters"
                      icon={Lock}
                      required
                    />
                    <Input
                      label="Confirm Password"
                      name="confirmPassword"
                      type="password"
                      value={companyForm.confirmPassword}
                      onChange={handleCompanyChange}
                      placeholder="Re-enter password"
                      icon={Lock}
                      required
                    />
                  </div>
                </>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={loading}
                icon={UserPlus}
                className="w-full text-base font-bold shadow-wine mt-2"
              >
                Create Account
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 text-slate-dim font-mono font-semibold">
                  OR
                </span>
              </div>
            </div>

            {/* Google Sign-Up Button */}
            <button
              type="button"
              onClick={handleGoogleSignUp}
              disabled={googleLoading}
              className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-border bg-white hover:bg-cream-soft text-slate-text text-sm font-semibold transition-all duration-150 shadow-subtle hover:-translate-y-0.5 active:translate-y-0"
            >
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{googleLoading ? 'Connecting...' : 'Sign up with Google'}</span>
            </button>

            {/* Footer */}
            <div className="mt-6 text-center text-xs text-slate-muted">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-bold text-burgundy hover:text-burgundy-dark hover:underline ml-1"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Google Sign-In Phase 1 Info Dialog */}
      {googleNoticeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-[#1E1B1C]/40 backdrop-blur-sm"
            onClick={() => setGoogleNoticeModal(false)}
          />
          <div className="relative w-full max-w-md bg-white border border-border rounded-2xl p-6 shadow-card-hover z-10 animate-fade-up">
            <div className="flex items-center gap-3 mb-3 text-burgundy">
              <ShieldCheck className="w-6 h-6 text-burgundy" />
              <h4 className="text-base font-bold text-slate-text">
                Google Authentication Status
              </h4>
            </div>
            <p className="text-xs text-slate-muted leading-relaxed mb-5">
              Google OAuth authentication is pending production configuration. Please use email credentials for registration.
            </p>
            <div className="flex justify-end">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setGoogleNoticeModal(false)}
              >
                Understood
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
