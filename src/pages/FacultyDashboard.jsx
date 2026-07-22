import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

function FacultyDashboard({ user, userData, onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');
  const displayName = userData?.name || user?.email?.split('@')[0] || 'Faculty';
  const [showAddAssignment, setShowAddAssignment] = useState(false);
  const [newAssignment, setNewAssignment] = useState({ title: '', dueDate: '', courseId: '' });

  const facultyData = {
    courses: [
      { id: 1, name: 'Data Structures', students: 45, section: 'A', status: 'active' },
      { id: 2, name: 'Web Development', students: 52, section: 'B', status: 'active' },
      { id: 3, name: 'DBMS', students: 48, section: 'A', status: 'active' },
    ],
    attendance: [
      { date: '2024-08-20', course: 'Data Structures', present: 42, absent: 3, percentage: 93 },
      { date: '2024-08-19', course: 'Web Development', present: 50, absent: 2, percentage: 96 },
      { date: '2024-08-18', course: 'DBMS', present: 45, absent: 3, percentage: 94 },
    ],
    assignments: [
      { id: 1, course: 'Web Dev', title: 'Build Todo App', submitted: 48, total: 52, dueDate: '2024-08-15', status: 'active' },
      { id: 2, course: 'DBMS', title: 'SQL Queries', submitted: 45, total: 48, dueDate: '2024-08-10', status: 'closed' },
      { id: 3, course: 'DSA', title: 'Sorting Algorithms', submitted: 42, total: 45, dueDate: '2024-08-20', status: 'active' },
    ],
    studentPerformance: [
      { name: 'Rahul Kumar', rollNo: 'CS001', avgGrade: 'A', attendance: 88, assignments: '9/10' },
      { name: 'Priya Singh', rollNo: 'CS002', avgGrade: 'A+', attendance: 92, assignments: '10/10' },
      { name: 'Amit Patel', rollNo: 'CS003', avgGrade: 'B+', attendance: 80, assignments: '8/10' },
    ],
  };

  const handleAddAssignment = () => {
    if (newAssignment.title && newAssignment.dueDate && newAssignment.courseId) {
      alert('Assignment created successfully!');
      setNewAssignment({ title: '', dueDate: '', courseId: '' });
      setShowAddAssignment(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 font-sans overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} role="faculty" onLogout={onLogout} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar role="Faculty" userName={displayName} />

        <main className="flex-1 overflow-y-auto p-6 bg-slate-900">
          {/* OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">📊 Faculty Dashboard</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-linear-to-br from-blue-500/10 to-blue-600/10 p-5 rounded-2xl border border-blue-500/30">
                  <p className="text-blue-400 text-sm font-medium">Total Courses</p>
                  <p className="text-3xl font-bold text-white mt-2">3</p>
                  <p className="text-xs text-blue-300 mt-1">Active Semesters</p>
                </div>
                <div className="bg-linear-to-br from-purple-500/10 to-purple-600/10 p-5 rounded-2xl border border-purple-500/30">
                  <p className="text-purple-400 text-sm font-medium">Total Students</p>
                  <p className="text-3xl font-bold text-white mt-2">145</p>
                  <p className="text-xs text-purple-300 mt-1">Across all courses</p>
                </div>
                <div className="bg-linear-to-br from-green-500/10 to-green-600/10 p-5 rounded-2xl border border-green-500/30">
                  <p className="text-green-400 text-sm font-medium">Pending Submissions</p>
                  <p className="text-3xl font-bold text-white mt-2">7</p>
                  <p className="text-xs text-green-300 mt-1">To be graded</p>
                </div>
                <div className="bg-linear-to-br from-orange-500/10 to-orange-600/10 p-5 rounded-2xl border border-orange-500/30">
                  <p className="text-orange-400 text-sm font-medium">Avg Attendance</p>
                  <p className="text-3xl font-bold text-white mt-2">94%</p>
                  <p className="text-xs text-orange-300 mt-1">Overall class</p>
                </div>
              </div>
            </div>
          )}

          {/* COURSES */}
          {activeTab === 'overview' && (
            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-bold text-white">📚 My Courses</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {facultyData.courses.map(course => (
                  <div key={course.id} className="bg-slate-800 p-5 rounded-2xl border border-slate-700 hover:border-indigo-500/50 transition-all cursor-pointer">
                    <h3 className="text-white font-bold">{course.name}</h3>
                    <p className="text-slate-400 text-sm mt-2">Section: {course.section}</p>
                    <p className="text-slate-400 text-sm">Students: {course.students}</p>
                    <div className="mt-3 pt-3 border-t border-slate-700">
                      <span className="inline-block bg-green-500/20 text-green-300 text-xs px-3 py-1 rounded-full font-semibold">Active</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ATTENDANCE */}
          {activeTab === 'attendance' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">📅 Attendance Management</h2>
                <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                  + Mark Attendance
                </button>
              </div>
              <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-700/50 border-b border-slate-600">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Date</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Course</th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300">Present</th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300">Absent</th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300">%</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                      {facultyData.attendance.map((att, idx) => (
                        <tr key={idx} className="hover:bg-slate-700/30 transition-all">
                          <td className="px-6 py-4 text-white">{att.date}</td>
                          <td className="px-6 py-4 text-white">{att.course}</td>
                          <td className="px-6 py-4 text-center text-green-400 font-bold">{att.present}</td>
                          <td className="px-6 py-4 text-center text-red-400 font-bold">{att.absent}</td>
                          <td className="px-6 py-4 text-center font-bold text-indigo-400">{att.percentage}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ASSIGNMENTS */}
          {activeTab === 'assignments' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">📚 Manage Assignments</h2>
                <button onClick={() => setShowAddAssignment(!showAddAssignment)} className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                  + Create Assignment
                </button>
              </div>

              {showAddAssignment && (
                <div className="bg-slate-800 p-6 rounded-2xl border border-indigo-500/50 space-y-4">
                  <h3 className="text-white font-bold">Create New Assignment</h3>
                  <div>
                    <label className="text-slate-300 text-sm font-medium">Course</label>
                    <select value={newAssignment.courseId} onChange={(e) => setNewAssignment({...newAssignment, courseId: e.target.value})}
                      className="w-full mt-1 bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:ring-2 focus:ring-indigo-500">
                      <option value="">Select Course</option>
                      {facultyData.courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-slate-300 text-sm font-medium">Assignment Title</label>
                    <input type="text" value={newAssignment.title} onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})}
                      className="w-full mt-1 bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:ring-2 focus:ring-indigo-500" placeholder="Enter assignment title" />
                  </div>
                  <div>
                    <label className="text-slate-300 text-sm font-medium">Due Date</label>
                    <input type="date" value={newAssignment.dueDate} onChange={(e) => setNewAssignment({...newAssignment, dueDate: e.target.value})}
                      className="w-full mt-1 bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div className="flex gap-3">
                    <button onClick={handleAddAssignment} className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg font-semibold">Create</button>
                    <button onClick={() => setShowAddAssignment(false)} className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-semibold">Cancel</button>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {facultyData.assignments.map(a => (
                  <div key={a.id} className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="text-white font-bold text-lg">{a.title}</h3>
                        <p className="text-sm text-slate-400 mt-1">{a.course}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        a.status === 'active' ? 'bg-blue-500/20 text-blue-300' : 'bg-slate-700 text-slate-300'
                      }`}>
                        {a.status === 'active' ? '📝 Active' : '✓ Closed'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-slate-700">
                      <p className="text-xs text-slate-400">Due: <span className="text-white font-medium">{a.dueDate}</span></p>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-slate-400">Submissions: <span className="text-indigo-400 font-bold">{a.submitted}/{a.total}</span></span>
                        <button className="text-indigo-400 hover:text-indigo-300 font-semibold">Grade →</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STUDENT PERFORMANCE */}
          {activeTab === 'timetable' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">📊 Student Performance</h2>
              <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-700/50 border-b border-slate-600">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Student Name</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Roll No</th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300">Grade</th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300">Attendance</th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300">Assignments</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                      {facultyData.studentPerformance.map((student, idx) => (
                        <tr key={idx} className="hover:bg-slate-700/30 transition-all">
                          <td className="px-6 py-4 text-white">{student.name}</td>
                          <td className="px-6 py-4 text-slate-400">{student.rollNo}</td>
                          <td className="px-6 py-4 text-center"><span className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full font-bold text-sm">{student.avgGrade}</span></td>
                          <td className="px-6 py-4 text-center text-white">{student.attendance}%</td>
                          <td className="px-6 py-4 text-center text-indigo-400 font-bold">{student.assignments}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* NOTICES */}
          {activeTab === 'notices' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">📢 Notifications</h2>
              <div className="space-y-4">
                {[
                  { title: 'Grade Submission Deadline', date: 'Aug 25, 2024', type: 'deadline' },
                  { title: 'New Exam Schedule Posted', date: 'Aug 23, 2024', type: 'info' },
                  { title: 'Student Grievance Pending', date: 'Aug 20, 2024', type: 'urgent' },
                ].map((notif, idx) => (
                  <div key={idx} className={`p-4 rounded-xl border ${
                    notif.type === 'urgent' ? 'bg-red-500/10 border-red-500/30' :
                    notif.type === 'deadline' ? 'bg-orange-500/10 border-orange-500/30' :
                    'bg-slate-800 border-slate-700'
                  }`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-white font-semibold">{notif.title}</h3>
                        <p className="text-xs text-slate-400 mt-1">{notif.date}</p>
                      </div>
                      {notif.type === 'urgent' && <span className="bg-red-500/20 text-red-300 text-xs px-2 py-1 rounded font-semibold">Urgent</span>}
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

export default FacultyDashboard;