import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 font-sans">
      {/* Sidebar Component */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} role="Student" />

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar Component */}
        <Navbar role="Student" userName="Abhishek Kumar" />

        {/* Dashboard Dynamic Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-900">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white">Student Overview</h2>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Attendance Card */}
                <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium text-slate-400">ATTENDANCE</span>
                    <span className="bg-emerald-500/10 text-emerald-400 text-xs px-2 py-0.5 rounded-full border border-emerald-500/20">Good</span>
                  </div>
                  <p className="text-3xl font-extrabold text-white">82%</p>
                  <p className="text-xs text-slate-400 mt-2">Target: 75% minimum</p>
                </div>

                {/* Assignments Card */}
                <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium text-slate-400">ASSIGNMENTS</span>
                    <span className="bg-amber-500/10 text-amber-400 text-xs px-2 py-0.5 rounded-full border border-amber-500/20">Due Soon</span>
                  </div>
                  <p className="text-3xl font-extrabold text-white">2 Pending</p>
                  <p className="text-xs text-slate-400 mt-2">DBMS & Web Dev</p>
                </div>

                {/* Next Class */}
                <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium text-slate-400">NEXT CLASS</span>
                    <span className="bg-indigo-500/10 text-indigo-400 text-xs px-2 py-0.5 rounded-full border border-indigo-500/20">11:00 AM</span>
                  </div>
                  <p className="text-lg font-bold text-white">Computer Networks</p>
                  <p className="text-xs text-slate-400 mt-1">Lab 3 • CSE 4th Sem</p>
                </div>

              </div>
            </div>
          )}

          {activeTab !== 'overview' && (
            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 text-center text-slate-400">
              <p className="capitalize">{activeTab} section coming soon 🚀</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default StudentDashboard;