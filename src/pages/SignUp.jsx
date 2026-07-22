import React, { useState } from 'react';
import { auth, db } from '../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const SignUp = ({ onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // Default role
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Create User in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Save User Info & Role in Firestore Database
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name: name,
        email: email,
        role: role, // 'student', 'faculty', or 'admin'
        createdAt: new Date().toISOString(),
      });

      console.log("User registered with role:", role);
      // Auth observer in App.jsx will handle navigation automatically!
    } catch (err) {
      console.error("SignUp Error:", err.code);
      if (err.code === 'auth/email-already-in-use') {
        setError('Ye Email pehle se registered hai! Login karein.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password kam se kam 6 characters ka hona chahiye.');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-4 font-sans">
      <div className="w-full max-w-md bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-700">
        
        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold bg-linear-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Create Account
          </h1>
          <p className="text-slate-400 text-xs mt-1">Smart Campus Management System</p>
        </div>

        {/* Role Selection */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-slate-300 mb-2">SELECT YOUR ROLE</label>
          <div className="flex bg-slate-900 rounded-xl p-1 border border-slate-700">
            {['student', 'faculty', 'admin'].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg capitalize transition-all ${
                  role === r
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/40 rounded-xl text-xs text-red-400 text-center font-medium">
            ⚠️ {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">FULL NAME</label>
            <input
              type="text"
              required
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm text-slate-200"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">EMAIL</label>
            <input
              type="email"
              required
              placeholder={`${role}@campus.edu`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm text-slate-200"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">PASSWORD</label>
            <input
              type="password"
              required
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm text-slate-200"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 text-white font-semibold rounded-lg transition-all shadow-lg text-sm mt-2"
          >
            {loading ? 'Registering Account...' : `Sign Up as ${role.charAt(0).toUpperCase() + role.slice(1)}`}
          </button>
        </form>

        {/* Toggle to Login */}
        <div className="mt-6 text-center text-xs text-slate-400">
          Already have an account?{' '}
          <button
            onClick={onSwitchToLogin}
            className="text-indigo-400 hover:underline font-semibold"
          >
            Sign In
          </button>
        </div>

      </div>
    </div>
  );
};

export default SignUp;z