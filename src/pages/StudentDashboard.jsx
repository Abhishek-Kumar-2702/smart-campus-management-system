import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

function StudentDashboard({ user, userData, onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');
  const displayName = userData?.name || user?.email?.split('@')[0] || 'Student';

  const studentData = {
    attendance: [
      { subject: 'Data Structures', percentage: 85, classes: '34/40' },
      { subject: 'Web Development', percentage: 92, classes: '37/40' },
      { subject: 'Database Management', percentage: 78, classes: '31/40' },
      { subject: 'Computer Networks', percentage: 88, classes: '35/40' },
    ],
    assignments: [
      { id: 1, subject: 'Web Dev', title: 'Build a Todo App', dueDate: '2024-08-15', status: 'pending', grade: '-' },
      { id: 2, subject: 'DBMS', title: 'SQL Queries Practice', dueDate: '2024-08-10', status: 'submitted', grade: '18/20' },
      { id: 3, subject: 'DSA', title: 'Sorting Algorithms', dueDate: '2024-08-20', status: 'pending', grade: '-' },
    ],
    grades: [
      { subject: 'Data Structures', midterm: 38, endterm: 42, total: 80, grade: 'A' },
      { subject: 'Web Development', midterm: 40, endterm: 44, total: 84, grade: 'A+' },
      { subject: 'DBMS', midterm: 35, endterm: 40, total: 75, grade: 'B+' },
    ],
    schedule: [
      { day: 'Monday', classes: [{ time: '09:00-10:30', subject: 'DSA', room: 'Lab-102' }, { time: '11:00-12:30', subject: 'Web Dev', room: 'Class-304' }] },
      { day: 'Wednesday', classes: [{ time: '10:00-11:30', subject: 'DBMS', room: 'Lab-103' }, { time: '14:00-15:30', subject: 'Networks', room: 'Class-205' }] },
    ],
  };

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 font-sans overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} role="student" onLogout={onLogout} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar role="Student" userName={displayName} />

        <main className="flex-1 overflow-y-auto p-6 bg-slate-900">
          {/* OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">📊 Dashboard Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-linear-to-br from-emerald-500/10 to-emerald-600/10 p-5 rounded-2xl border border-emerald-500/30">
                  <p className="text-emerald-400 text-sm font-medium">Overall Attendance</p>
                  <p className="text-3xl font-bold text-white mt-2">85%</p>
                  <p className="text-xs text-emerald-300 mt-1">✓ Above Target</p>
                </div>
                <div className="bg-linear-to-br from-amber-500/10 to-amber-600/10 p-5 rounded-2xl border border-amber-500/30">
                  <p className="text-amber-400 text-sm font-medium">Pending Assignments</p>
                  <p className="text-3xl font-bold text-white mt-2">2</p>
                  <p className="text-xs text-amber-300 mt-1">⏰ Due Soon</p>
                </div>
                <div className="bg-linear-to-br from-indigo-500/10 to-indigo-600/10 p-5 rounded-2xl border border-indigo-500/30">
                  <p className="text-indigo-400 text-sm font-medium">Avg Grade</p>
                  <p className="text-3xl font-bold text-white mt-2">A</p>
                  <p className="text-xs text-indigo-300 mt-1">79.7 CGPA</p>
                </div>
                <div className="bg-linear-to-br from-violet-500/10 to-violet-600/10 p-5 rounded-2xl border border-violet-500/30">
                  <p className="text-violet-400 text-sm font-medium">Next Class</p>
                  <p className="text-lg font-bold text-white mt-2">Web Dev</p>
                  <p className="text-xs text-violet-300 mt-1">11:00 AM Today</p>
                </div>
              </div>
            </div>
          )}

          {/* ATTENDANCE */}
          {activeTab === 'attendance' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">📅 Attendance Report</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {studentData.attendance.map((att, idx) => (
                  <div key={idx} className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-white font-bold">{att.subject}</h3>
                        <p className="text-sm text-slate-400 mt-1">Classes: {att.classes}</p>
                      </div>
                      <span className={`text-2xl font-bold ${att.percentage >= 75 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {att.percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div className={`h-full transition-all ${att.percentage >= 75 ? 'bg-emerald-500' : 'bg-red-500'}`} 
                        style={{width: `${att.percentage}%`}}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TIMETABLE */}
          {activeTab === 'timetable' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">⏰ Weekly Schedule</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {studentData.schedule.map((day, idx) => (
                  <div key={idx} className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                    <h3 className="text-white font-bold text-lg mb-4">{day.day}</h3>
                    <div className="space-y-3">
                      {day.classes.map((cls, cidx) => (
                        <div key={cidx} className="bg-slate-700/50 p-4 rounded-lg border-l-4 border-indigo-500">
                          <p className="text-white font-semibold">{cls.subject}</p>
                          <p className="text-sm text-slate-400 mt-1">🕐 {cls.time}</p>
                          <p className="text-sm text-slate-400">📍 {cls.room}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ASSIGNMENTS */}
          {activeTab === 'assignments' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">📚 My Assignments</h2>
                <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                  + New Submission
                </button>
              </div>
              <div className="space-y-3">
                {studentData.assignments.map(a => (
                  <div key={a.id} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 hover:border-slate-600 transition-all">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="text-white font-bold text-lg">{a.title}</h3>
                        <p className="text-sm text-slate-400 mt-1">{a.subject}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-4 ${
                        a.status === 'submitted' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {a.status === 'submitted' ? '✓ Submitted' : '⏳ Pending'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-slate-700">
                      <p className="text-xs text-slate-400">Due: <span className="text-white font-medium">{a.dueDate}</span></p>
                      <span className="text-sm text-slate-400">Grade: <span className="text-indigo-400 font-bold">{a.grade}</span></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* NOTICES */}
          {activeTab === 'notices' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">📢 Notice Board</h2>
              <div className="space-y-4">
                {[
                  { title: 'Exam Schedule Released', date: 'Aug 22, 2024', priority: 'high' },
                  { title: 'Library Closure on Weekend', date: 'Aug 21, 2024', priority: 'normal' },
                  { title: 'New Assignment Uploaded', date: 'Aug 20, 2024', priority: 'normal' },
                ].map((notice, idx) => (
                  <div key={idx} className={`p-4 rounded-xl border ${
                    notice.priority === 'high' 
                      ? 'bg-red-500/10 border-red-500/30' 
                      : 'bg-slate-800 border-slate-700'
                  }`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-white font-semibold">{notice.title}</h3>
                        <p className="text-xs text-slate-400 mt-1">{notice.date}</p>
                      </div>
                      {notice.priority === 'high' && <span className="bg-red-500/20 text-red-300 text-xs px-2 py-1 rounded">Important</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default StudentDashboard;