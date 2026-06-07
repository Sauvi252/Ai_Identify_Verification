
import React, { useState } from 'react';
import { LogoIcon } from './icons';
import { authService } from '../services/authService';

interface SignupPageProps {
  onSignupSuccess: () => void;
  onSwitchToLogin: () => void;
}

const SignupPage: React.FC<SignupPageProps> = ({ onSignupSuccess, onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
    }

    setIsLoading(true);

    try {
      // Call the Registration API
      await authService.signup(email, password);
      // Automatically login after signup for better UX
      onSignupSuccess();
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl shadow-2xl shadow-slate-900/50 p-8">
          <div className="flex flex-col items-center mb-6">
            <LogoIcon className="h-12 w-12 text-emerald-400 mb-3" />
            <h1 className="text-3xl font-bold text-slate-100">Create Account</h1>
            <p className="text-slate-400 mt-1">Join the VeriSecure Platform</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-900/30 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <div>
              <label htmlFor="email-signup" className="block text-sm font-medium text-slate-300">Email Address</label>
              <input
                type="email"
                id="email-signup"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@example.com"
                required
                className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password-signup" className="block text-sm font-medium text-slate-300">Password</label>
              <input
                type="password"
                id="password-signup"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-slate-300">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex items-center justify-center bg-emerald-600 text-white font-semibold py-3 px-4 rounded-lg shadow-lg shadow-emerald-500/20 hover:bg-emerald-500 transition-all duration-300 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-slate-700">
            <p className="text-center text-sm text-slate-400">
              Already registered?{' '}
              <button onClick={onSwitchToLogin} className="font-semibold text-emerald-400 hover:text-emerald-300 transition-colors">
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
