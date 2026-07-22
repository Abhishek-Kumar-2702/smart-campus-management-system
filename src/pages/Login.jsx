import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';

const Login = ({ onSwitchToSignUp }) => {
  // 1. Refresh par same tab maintain rakhne ke liye localStorage se initial state le rahe hain
  const [selectedRole, setSelectedRole] = useState(() => {
    return localStorage.getItem('savedRole') || 'student';
  });
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // 2. Jab bhi user tab badle, us role ko localStorage me save kar do
  const handleRoleChange = (role) => {
    setSelectedRole(role);
    localStorage.setItem('savedRole', role);
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const cleanEmail = email.trim().toLowerCase();

    try {
      // Step 1: Pre-check user's registered role in Firestore BEFORE Auth
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', cleanEmail));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();

        // Step 2: Strict Role Validation
        if (userData.role !== selectedRole) {
          setError('Invalid email or password.');
          setLoading(false);
          return;
        }
      } else {
        setError('Invalid email or password.');
        setLoading(false);
        return;
      }

      // Step 3: Role matched! Proceed to Firebase Auth
      await signInWithEmailAndPassword(auth, cleanEmail, password);

    } catch (err) {
      console.error("Login Error:", err);
      setError('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d111e] text-white p-4 font-sans">
      <div className="w-full max-w-md bg-[#161f33] rounded-2xl shadow-2xl p-8 border border-slate-800">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-blue-500 tracking-tight">
            Smart Campus
          </h1>
          <p className="text-slate-400 text-xs mt-1">Select your portal role to log in</p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-3 gap-1 bg-[#0d111e] p-1 rounded-xl mb-5 border border-slate-800">
          <button
            type="button"
            onClick={() => handleRoleChange('student')}
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
            onClick={() => handleRoleChange('faculty')}
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
            onClick={() => handleRoleChange('admin')}
            className={`py-2 text-xs font-semibold rounded-lg transition-all ${
              selectedRole === 'admin'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ⚙️ Admin
          </button>
        </div>

        {/* Selected Portal Indicator */}
        <div className="mb-4 text-center">
          <span className="text-[11px] font-semibold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
            Selected Portal: <strong className="uppercase">{selectedRole}</strong>
          </span>
        </div>

        {/* Red Error Box */}
        {error && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-500/50 rounded-xl text-xs text-red-400 text-center font-medium">
            ⚠️ {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4" autoComplete="off">
          <div>
            <label className="block text-[10px] font-bold tracking-wider text-slate-300 mb-1 uppercase">EMAIL ADDRESS</label>
            <input
              type="email"
              required
              autoComplete="off"
              placeholder={
                selectedRole === 'student' 
                  ? 'student@gmail.com' 
                  : selectedRole === 'faculty' 
                  ? 'faculty@campus.edu' 
                  : 'admin@campus.edu'
              }
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#0d111e] border border-slate-700/80 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm text-slate-200 placeholder-slate-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold tracking-wider text-slate-300 mb-1 uppercase">PASSWORD</label>
            <input
              type="password"
              required
              autoComplete="new-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#0d111e] border border-slate-700/80 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm text-slate-200 placeholder-slate-500 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 text-white font-bold rounded-lg transition-all shadow-lg shadow-indigo-600/30 text-xs tracking-wide uppercase mt-2"
          >
            {loading ? 'Authenticating...' : `Log In to ${selectedRole} Portal`}
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