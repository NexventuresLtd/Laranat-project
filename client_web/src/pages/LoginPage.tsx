import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import { loginWithApi } from '../lib/auth';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });

  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const isPasswordValid = password.length >= 6;
  const isEmailValid = email.length === 0 || isValidEmail(email);
  const isFormValid = email.trim() && password && isValidEmail(email);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleBlur = (field: 'email' | 'password') => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setTouched({ email: true, password: true });

    if (!email.trim() || !password) {
      setError('Please enter email and password.');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);
    try {
      await loginWithApi(email.trim(), password);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-blue-50/30 to-white"
      style={{ fontFamily: 'var(--font-body)' }}
    >
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div
          className="rounded-2xl border-2 p-8 shadow-2xl backdrop-blur-sm"
          style={{ borderColor: 'var(--navbar-border)', backgroundColor: 'rgba(255,255,255,0.95)' }}
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="mb-8"
          >
            <h1
              className="text-3xl font-bold text-center mb-2"
              style={{ color: 'var(--color-deep-blue)' }}
            >
              Admin Portal
            </h1>
            <p className="text-center text-[var(--navbar-text)]/70 text-sm">
              Secure access to Lanart21 dashboard
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error Alert */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3 p-3 rounded-lg bg-red-50 border-l-4"
                style={{ borderColor: 'var(--color-accent-pink)' }}
              >
                <AlertCircle size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </motion.div>
            )}

            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              <label
                htmlFor="login-email"
                className="block text-sm font-semibold mb-2"
                style={{ color: 'var(--navbar-text)' }}
              >
                Email Address
              </label>
              <div className="relative group">
                <Mail
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: 'var(--color-primary-blue)' }}
                />
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={() => handleBlur('email')}
                  placeholder="admin@lanart21.com"
                  className="w-full pl-10 pr-10 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all"
                  style={{
                    borderColor:
                      touched.email && email && !isEmailValid
                        ? '#dc2626'
                        : touched.email && isEmailValid && email
                          ? '#10b981'
                          : 'var(--navbar-border)',
                    '--tw-ring-color':
                      touched.email && !isEmailValid
                        ? 'rgba(220, 38, 38, 0.1)'
                        : 'rgba(16, 185, 129, 0.1)',
                  } as React.CSSProperties}
                  autoComplete="email"
                />
                {touched.email && email && (
                  isEmailValid ? (
                    <CheckCircle size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600" />
                  ) : (
                    <AlertCircle size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-red-600" />
                  )
                )}
              </div>
              {touched.email && email && !isEmailValid && (
                <p className="text-xs text-red-600 mt-1">Please enter a valid email address</p>
              )}
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <label
                htmlFor="login-password"
                className="block text-sm font-semibold mb-2"
                style={{ color: 'var(--navbar-text)' }}
              >
                Password
              </label>
              <div className="relative group">
                <Lock
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: 'var(--color-primary-blue)' }}
                />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={() => handleBlur('password')}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all"
                  style={{
                    borderColor:
                      touched.password && password && !isPasswordValid
                        ? '#dc2626'
                        : touched.password && isPasswordValid
                          ? '#10b981'
                          : 'var(--navbar-border)',
                    '--tw-ring-color':
                      touched.password && !isPasswordValid
                        ? 'rgba(220, 38, 38, 0.1)'
                        : 'rgba(16, 185, 129, 0.1)',
                  } as React.CSSProperties}
                  autoComplete="current-password"
                />
                <motion.button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-colors"
                  style={{
                    color: 'var(--navbar-text)',
                    backgroundColor: 'rgba(0, 0, 0, 0.02)',
                  }}
                  whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.06)' }}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </motion.button>
              </div>
              {touched.password && password && !isPasswordValid && (
                <p className="text-xs text-red-600 mt-1">Password must be at least 6 characters</p>
              )}
              {touched.password && isPasswordValid && (
                <p className="text-xs text-green-600 mt-1">✓ Password is strong</p>
              )}
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading || !isFormValid}
              className="w-full py-3 rounded-full text-base font-bold text-white uppercase tracking-wider transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ backgroundColor: 'var(--color-accent-pink)' }}
              whileHover={isFormValid && !isLoading ? { scale: 1.02 } : {}}
              whileTap={isFormValid && !isLoading ? { scale: 0.98 } : {}}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader size={18} className="animate-spin" />
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </motion.button>

          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;

