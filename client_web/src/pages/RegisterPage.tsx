import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    // TODO: connect to auth API
    navigate('/login');
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
            Sign Up
          </h1>
          <p className="text-center text-[var(--navbar-text)]/80 mb-6">
            Create your Lanart21 Creative Studio account
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
            )}
            <div>
              <label htmlFor="reg-name" className="block text-sm font-semibold mb-1" style={{ color: 'var(--navbar-text)' }}>
                Name
              </label>
              <input
                id="reg-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-colors"
                style={{ borderColor: 'var(--navbar-border)' }}
                autoComplete="name"
              />
            </div>
            <div>
              <label htmlFor="reg-email" className="block text-sm font-semibold mb-1" style={{ color: 'var(--navbar-text)' }}>
                Email
              </label>
              <input
                id="reg-email"
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
              <label htmlFor="reg-password" className="block text-sm font-semibold mb-1" style={{ color: 'var(--navbar-text)' }}>
                Password
              </label>
              <input
                id="reg-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-colors"
                style={{ borderColor: 'var(--navbar-border)' }}
                autoComplete="new-password"
              />
            </div>
            <div>
              <label htmlFor="reg-confirm" className="block text-sm font-semibold mb-1" style={{ color: 'var(--navbar-text)' }}>
                Confirm Password
              </label>
              <input
                id="reg-confirm"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-colors"
                style={{ borderColor: 'var(--navbar-border)' }}
                autoComplete="new-password"
              />
            </div>
            <motion.button
              type="submit"
              className="w-full py-3 rounded-full text-base font-bold text-white uppercase tracking-wider"
              style={{ backgroundColor: 'var(--color-accent-pink)' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Create Account
            </motion.button>
          </form>

          <p className="mt-6 text-center text-sm text-[var(--navbar-text)]/80">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold" style={{ color: 'var(--color-primary-blue)' }}>
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
