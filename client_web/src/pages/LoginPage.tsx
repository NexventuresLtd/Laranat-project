import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password) {
      setError('Please enter email and password.');
      return;
    }
    // TODO: connect to auth API
    navigate('/');
  };

  return (
    <div
      className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-12 font-noteworthy"
      style={{ fontFamily: 'var(--font-noteworthy)' }}
    >
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div
          className="rounded-2xl border-2 p-8 shadow-xl"
          style={{ borderColor: 'var(--navbar-border)', backgroundColor: 'white' }}
        >
          <h1
            className="text-2xl md:text-3xl font-bold text-center mb-2"
            style={{ color: 'var(--color-deep-blue)' }}
          >
            Sign In
          </h1>
          <p className="text-center text-[var(--navbar-text)]/80 mb-6">
            Welcome back to Lanart21 Creative Studio
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
            )}
            <div>
              <label htmlFor="login-email" className="block text-sm font-semibold mb-1" style={{ color: 'var(--navbar-text)' }}>
                Email
              </label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-colors"
                style={{ borderColor: 'var(--navbar-border)' }}
                autoComplete="email"
              />
            </div>
            <div>
              <label htmlFor="login-password" className="block text-sm font-semibold mb-1" style={{ color: 'var(--navbar-text)' }}>
                Password
              </label>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-colors"
                style={{ borderColor: 'var(--navbar-border)' }}
                autoComplete="current-password"
              />
            </div>
            <motion.button
              type="submit"
              className="w-full py-3 rounded-full text-base font-bold text-white uppercase tracking-wider"
              style={{ backgroundColor: 'var(--color-accent-pink)' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Sign In
            </motion.button>
          </form>

          <p className="mt-6 text-center text-sm text-[var(--navbar-text)]/80">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="font-semibold" style={{ color: 'var(--color-primary-blue)' }}>
              Sign Up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
