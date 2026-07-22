import React, { useState } from 'react';
import { auth, db } from '../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const SignUp = ({ onSwitchToLogin }) => {
  const [selectedRole, setSelectedRole] = useState('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name: name,
        email: email,
        role: selectedRole,
        createdAt: new Date().toISOString()
      });

    } catch (err) {
      console.error("Firebase Sign Up Error:", err.code);
      if (err.code === 'auth/email-already-in-use') {
        setError('This email address is already registered. Please sign in instead.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password must be at least 6 characters long.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email address format.');
      } else {
        setError('Registration Failed: ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-4 font-sans">
      <div className="w-full max-w-md bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-700">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h1 
            className="text-3xl font-extrabold bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(to right, #60a5fa, #6366f1)' }}
          >
            Smart Campus
          </h1>
          <p className="text-slate-400 text-sm mt-1">Create your account to get started</p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-3 gap-1 bg-slate-900 p-1 rounded-xl mb-6 border border-slate-700">
          <button
            type="button"
            onClick={() => { setSelectedRole('student'); setError(''); }}
            className={`py-2 text-xs font-semibold rounded-lg transition-all ${
              selectedRole === 'student'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🎓 Student
          </button>
          
          <button
            type="button"
            onClick={() => { setSelectedRole('faculty'); setError(''); }}
            className={`py-2 text-xs font-semibold rounded-lg transition-all ${
              selectedRole === 'faculty'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            👨‍🏫 Faculty
          </button>

          <button
            type="button"
            onClick={() => { setSelectedRole('admin'); setError(''); }}
            className={`py-2 text-xs font-semibold rounded-lg transition-all ${
              selectedRole === 'admin'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ⚙️ Admin
          </button>
        </div>

        {/* Selected Role Indicator */}
        <div className="mb-4 text-center">
          <span className="text-xs font-medium text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
            Registering as: <strong className="uppercase">{selectedRole}</strong>
          </span>
        </div>

        {/* Standard Professional Error Message */}
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
              className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm text-slate-200 placeholder-slate-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">EMAIL ADDRESS</label>
            <input
              type="email"
              required
              placeholder={
                selectedRole === 'student' 
                  ? 'student@campus.edu' 
                  : selectedRole === 'faculty' 
                  ? 'faculty@campus.edu' 
                  : 'admin@campus.edu'
              }
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
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 text-white font-semibold rounded-lg transition-all shadow-lg shadow-indigo-600/30 text-sm mt-2"
          >
            {loading ? 'Creating Account...' : `Register as ${selectedRole.toUpperCase()}`}
          </button>
        </form>

        {/* Toggle to Login */}
        <div className="mt-6 text-center text-xs text-slate-400">
          Already have an account?{' '}
          <button
            type="button"
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

export default SignUp;