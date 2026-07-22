import React from 'react';

function Navbar({ role, userName }) {
  return (
    <header className="h-16 bg-slate-800/80 backdrop-blur border-b border-slate-700 px-6 flex items-center justify-between">
      <div>
        <h1 className="text-lg font-semibold text-white">Welcome back, {userName || 'User'} 👋</h1>
      </div>

      <div className="flex items-center space-x-4">
        <div className="text-right">
          <p className="text-xs font-semibold text-white">{userName || 'Student'}</p>
          <p className="text-[10px] text-indigo-400 font-medium capitalize">{role}</p>
        </div>
        <div className="w-9 h-9 rounded-full bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center text-indigo-300 font-bold text-sm">
          {userName ? userName.charAt(0) : 'S'}
        </div>
      </div>
    </header>
  );
}

export default Navbar;