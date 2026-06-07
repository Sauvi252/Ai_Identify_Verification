
import React, { useState } from 'react';
import { LogoIcon } from './icons';
import { authService } from '../services/authService';

interface LoginPageProps {
  onLoginSuccess: () => void;
  onSwitchToSignup: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onSwitchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDemo, setShowDemo] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Call the Enterprise Login API
      await authService.login(email, password);
      onLoginSuccess();
    } catch (err: any) {
      setError(err.message || "Login failed");
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
            <h1 className="text-3xl font-bold text-slate-100">VeriSecure Login</h1>
            <p className="text-slate-400 mt-1">Enterprise Identity Management</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-900/30 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg text-sm flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@verisecure.com"
                required
                className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-all"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-all"
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex items-center justify-center bg-emerald-600 text-white font-semibold py-3 px-4 rounded-lg shadow-lg shadow-emerald-500/20 hover:bg-emerald-500 transition-all duration-300 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Authenticating...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-slate-700">
            <p className="text-center text-sm text-slate-400">
              New to VeriSecure?{' '}
              <button onClick={onSwitchToSignup} className="font-semibold text-emerald-400 hover:text-emerald-300 transition-colors">
                Create an account
              </button>
            </p>
          </div>
          
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setShowDemo((s) => !s)}
              className="text-xs text-slate-400 bg-slate-900/50 px-2 py-1 rounded hover:text-white transition"
            >
              {showDemo ? 'Hide demo credentials' : 'Show demo credentials'}
            </button>

            {showDemo && (
              <div className="mt-2">
                <span className="text-xs text-slate-500 bg-slate-900/50 px-2 py-1 rounded block">
                  Demo: Use <b>admin@verisecure.com</b> / <b>admin123</b>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
