import React from 'react';

function FacultyDashboard({ user, userData, onLogout }) {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold">Faculty Dashboard</h1>
        <p className="text-slate-400 mt-2">Welcome, Professor {userData?.name || user?.email}</p>
      </div>
      <button 
        onClick={onLogout}
        className="w-32 py-2 bg-red-600 rounded-lg text-sm font-semibold hover:bg-red-500"
      >
        Log Out
      </button>
    </div>
  );
}

export default FacultyDashboard;