import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { BrandLogo } from '../../components/common/BrandLogo';
import { Mail, ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react';

export const ForgotPasswordPage = () => {
  const { forgotPassword } = useAuth();
  const toast = useToast();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const res = await forgotPassword(email);
      if (res.success) {
        setMessage(res.message);
        setSubmitted(true);
        toast.success('Password reset link sent!');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 lg:p-12 animate-fade-up">
      <div className="w-full max-w-md bg-white border border-border rounded-3xl p-8 sm:p-10 shadow-card-hover text-center relative overflow-hidden">
        {/* Top brand */}
        <div className="flex justify-center mb-6">
          <BrandLogo size="md" to="/" />
        </div>

        {!submitted ? (
          <>
            <h2 className="text-2xl font-black text-slate-text tracking-tight mb-2">
              Reset Your Password
            </h2>
            <p className="text-xs sm:text-sm text-slate-muted leading-relaxed mb-6">
              Enter the email address registered with your CareerAI collegiate account and we'll send a recovery link.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <Input
                label="Registered Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@college.edu or recruiter@company.com"
                icon={Mail}
                required
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={loading}
                className="w-full text-base font-bold shadow-wine mt-2"
              >
                Send Reset Link
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-border flex justify-center">
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-muted hover:text-burgundy transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
              </Link>
            </div>
          </>
        ) : (
          <div className="animate-in fade-in duration-300">
            <div className="w-12 h-12 rounded-full bg-success/10 text-success flex items-center justify-center mx-auto mb-4 border border-success/30">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-slate-text tracking-tight mb-2">
              Reset Link Dispatched
            </h3>
            <p className="text-xs text-slate-muted leading-relaxed mb-6">
              {message}
            </p>
            <div className="p-3 rounded-xl bg-cream-soft border border-border text-[11px] text-slate-muted mb-6 text-left flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-burgundy flex-shrink-0 mt-0.5" />
              <span>
                Demo simulation notice: In Phase 2 backend, this triggers an automated SMTP / SendGrid email token.
              </span>
            </div>
            <Link to="/login">
              <Button variant="primary" size="md" className="w-full font-bold">
                Return to Login
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
