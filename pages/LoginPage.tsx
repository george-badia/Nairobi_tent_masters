
import React, { useState } from 'react';
import { LogoIcon } from '../components/icons';

interface LoginPageProps {
  onLogin: (password: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError('Password cannot be empty.');
      return;
    }
    // The parent component handles the actual login logic and provides feedback on failure.
    onLogin(password);
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white p-10 rounded-xl shadow-lg">
            <div>
              <div className="mx-auto h-12 w-auto flex justify-center">
                <LogoIcon className="h-12 w-auto" />
              </div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-brand-dark">
                  Admin Login
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                  Enter password to access the dashboard.
              </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
                <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brand-secondary focus:border-brand-secondary focus:z-10 sm:text-sm"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError('');
                    }}
                />
                </div>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div>
                <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-primary hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-secondary"
                >
                Sign In
                </button>
            </div>
            </form>
        </div>
      </div>
    </div>
  );
};