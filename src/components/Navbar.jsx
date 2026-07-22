import React from 'react';

function Navbar({ role, userName }) {
  return (
    <header className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-lg font-bold text-white">Welcome back, {userName}!</h1>
        <p className="text-xs text-slate-400">Smart Campus Management Portal</p>
      </div>

      <div className="flex items-center space-x-3">
        <div className="w-9 h-9 bg-indigo-600/20 border border-indigo-500/30 rounded-full flex items-center justify-center font-bold text-indigo-400 text-sm">
          {userName ? userName.charAt(0).toUpperCase() : 'U'}
        </div>
        <div className="hidden sm:block text-left">
          <p className="text-xs font-semibold text-white capitalize">{userName}</p>
          <p className="text-[10px] text-slate-400 capitalize">{role}</p>
        </div>
      </div>
    </header>
  );
}

export default Navbar;