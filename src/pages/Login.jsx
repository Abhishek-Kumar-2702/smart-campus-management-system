import React, { useState } from 'react';
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = ({ onSwitchToSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Login complete -> App.jsx handles role routing automatically
    } catch (err) {
      console.error("Firebase Login Error:", err.code);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
        setError('Galat Email ya Password!');
      } else if (err.code === 'auth/user-not-found') {
        setError('Ye Email registered nahi hai. Sign Up karein.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid Email format.');
      } else {
        setError('Login Error: ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-4 font-sans">
      <div className="w-full max-w-md bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-700">
        
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold bg-linear-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Smart Campus
          </h1>
          <p className="text-slate-400 text-sm mt-1">Management Portal Login</p>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/40 rounded-xl text-xs text-red-400 text-center font-medium">
            ⚠️ {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">EMAIL ADDRESS</label>
            <input
              type="email"
              required
              placeholder="user@campus.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm text-slate-200 placeholder-slate-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">PASSWORD</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm text-slate-200 placeholder-slate-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 text-white font-semibold rounded-lg transition-all shadow-lg text-sm mt-2"
          >
            {loading ? 'Verifying Account...' : 'Sign In'}
          </button>
        </form>

        {/* Toggle to Sign Up */}
        <div className="mt-6 text-center text-xs text-slate-400">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToSignUp}
            className="text-indigo-400 hover:underline font-semibold"
          >
            Create Account (Sign Up)
          </button>
        </div>

      </div>
    </div>
  );
};

export default Login;