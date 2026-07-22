import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

function AdminDashboard({ user, userData, onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');
  const displayName = userData?.name || user?.email?.split('@')[0] || 'Admin';
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'student' });

  const adminData = {
    stats: [
      { label: 'Total Students', value: 450, change: '+12', color: 'blue' },
      { label: 'Total Faculty', value: 35, change: '+2', color: 'purple' },
      { label: 'Total Courses', value: 24, change: '0', color: 'green' },
      { label: 'Active Users', value: 389, change: '+18', color: 'orange' },
    ],
    students: [
      { id: 1, name: 'Rahul Kumar', email: 'rahul.kumar@college.edu', rollNo: 'CS001', status: 'active' },
      { id: 2, name: 'Priya Singh', email: 'priya.singh@college.edu', rollNo: 'CS002', status: 'active' },
      { id: 3, name: 'Amit Patel', email: 'amit.patel@college.edu', rollNo: 'CS003', status: 'active' },
      { id: 4, name: 'Sarah Khan', email: 'sarah.khan@college.edu', rollNo: 'CS004', status: 'inactive' },
    ],
    faculty: [
      { id: 1, name: 'Dr. John Doe', email: 'john.doe@college.edu', courses: 3, status: 'active' },
      { id: 2, name: 'Prof. Jane Smith', email: 'jane.smith@college.edu', courses: 2, status: 'active' },
      { id: 3, name: 'Dr. Mike Johnson', email: 'mike.johnson@college.edu', courses: 4, status: 'active' },
    ],
    courses: [
      { id: 1, name: 'Data Structures', code: 'CS201', students: 45, faculty: 'Dr. John Doe', status: 'active' },
      { id: 2, name: 'Web Development', code: 'CS202', students: 52, faculty: 'Prof. Jane Smith', status: 'active' },
      { id: 3, name: 'Database Management', code: 'CS203', students: 48, faculty: 'Dr. Mike Johnson', status: 'active' },
    ],
    logs: [
      { action: 'User Login', user: 'rahul.kumar@college.edu', timestamp: '2024-08-20 10:30 AM', status: 'success' },
      { action: 'Assignment Submitted', user: 'priya.singh@college.edu', timestamp: '2024-08-20 09:15 AM', status: 'success' },
      { action: 'Grade Published', user: 'Dr. John Doe', timestamp: '2024-08-19 04:20 PM', status: 'success' },
    ],
  };

  const handleAddUser = () => {
    if (newUser.name && newUser.email && newUser.role) {
      alert(`${newUser.role.charAt(0).toUpperCase() + newUser.role.slice(1)} ${newUser.name} added successfully!`);
      setNewUser({ name: '', email: '', role: 'student' });
      setShowAddUser(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 font-sans overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} role="admin" onLogout={onLogout} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar role="Admin" userName={displayName} />

        <main className="flex-1 overflow-y-auto p-6 bg-slate-900">
          {/* OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">📊 Admin Dashboard</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {adminData.stats.map((stat, idx) => (
                  <div key={idx} className={`bg-gradient-to-br from-${
                    stat.color === 'blue' ? 'blue-500' :
                    stat.color === 'purple' ? 'purple-500' :
                    stat.color === 'green' ? 'emerald-500' :
                    'orange-500'
                  }/10 to-${
                    stat.color === 'blue' ? 'blue-600' :
                    stat.color === 'purple' ? 'purple-600' :
                    stat.color === 'green' ? 'emerald-600' :
                    'orange-600'
                  }/10 p-5 rounded-2xl border border-${
                    stat.color === 'blue' ? 'blue-500' :
                    stat.color === 'purple' ? 'purple-500' :
                    stat.color === 'green' ? 'emerald-500' :
                    'orange-500'
                  }/30`}>
                    <p className={`text-${
                      stat.color === 'blue' ? 'blue-400' :
                      stat.color === 'purple' ? 'purple-400' :
                      stat.color === 'green' ? 'emerald-400' :
                      'orange-400'
                    } text-sm font-medium`}>{stat.label}</p>
                    <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
                    <p className={`text-xs mt-1 ${
                      stat.color === 'blue' ? 'text-blue-300' :
                      stat.color === 'purple' ? 'text-purple-300' :
                      stat.color === 'green' ? 'text-emerald-300' :
                      'text-orange-300'
                    }`}>{stat.change} this month</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                  <h3 className="text-lg font-bold text-white mb-4">📈 Quick Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Overall Attendance</span>
                      <span className="text-indigo-400 font-bold">92%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Assignment Submission Rate</span>
                      <span className="text-green-400 font-bold">87%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Average GPA</span>
                      <span className="text-purple-400 font-bold">3.6</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                  <h3 className="text-lg font-bold text-white mb-4">🔔 Recent Activity</h3>
                  <div className="space-y-2 text-sm">
                    {adminData.logs.slice(0, 3).map((log, idx) => (
                      <div key={idx} className="flex justify-between text-slate-400 pb-2 border-b border-slate-700">
                        <span>{log.action}</span>
                        <span className="text-xs text-slate-500">{log.timestamp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* USER MANAGEMENT */}
          {activeTab === 'overview' && (
            <div className="mt-6 space-y-6">
              <h3 className="text-xl font-bold text-white">👥 User Management</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Students */}
                <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-white font-bold">👨‍🎓 Students ({adminData.students.length})</h4>
                    <button className="text-indigo-400 hover:text-indigo-300 text-sm font-semibold">View All →</button>
                  </div>
                  <div className="space-y-2">
                    {adminData.students.slice(0, 2).map(student => (
                      <div key={student.id} className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
                        <div>
                          <p className="text-white text-sm font-medium">{student.name}</p>
                          <p className="text-slate-400 text-xs">{student.rollNo}</p>
                        </div>
                        <span className="bg-green-500/20 text-green-300 text-xs px-2 py-1 rounded">Active</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Faculty */}
                <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-white font-bold">👨‍🏫 Faculty ({adminData.faculty.length})</h4>
                    <button className="text-indigo-400 hover:text-indigo-300 text-sm font-semibold">View All →</button>
                  </div>
                  <div className="space-y-2">
                    {adminData.faculty.slice(0, 2).map(fac => (
                      <div key={fac.id} className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
                        <div>
                          <p className="text-white text-sm font-medium">{fac.name}</p>
                          <p className="text-slate-400 text-xs">{fac.courses} courses</p>
                        </div>
                        <span className="bg-green-500/20 text-green-300 text-xs px-2 py-1 rounded">Active</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STUDENTS TAB */}
          {activeTab === 'attendance' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">👨‍🎓 Student Management</h2>
                <button onClick={() => setShowAddUser(!showAddUser)} className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                  + Add Student
                </button>
              </div>

              {showAddUser && (
                <div className="bg-slate-800 p-6 rounded-2xl border border-indigo-500/50 space-y-4">
                  <h3 className="text-white font-bold">Add New Student</h3>
                  <div>
                    <label className="text-slate-300 text-sm font-medium">Student Name</label>
                    <input type="text" value={newUser.name} onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                      className="w-full mt-1 bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:ring-2 focus:ring-indigo-500" placeholder="Enter student name" />
                  </div>
                  <div>
                    <label className="text-slate-300 text-sm font-medium">Email</label>
                    <input type="email" value={newUser.email} onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                      className="w-full mt-1 bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:ring-2 focus:ring-indigo-500" placeholder="Enter email" />
                  </div>
                  <div className="flex gap-3">
                    <button onClick={handleAddUser} className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg font-semibold">Add</button>
                    <button onClick={() => setShowAddUser(false)} className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-semibold">Cancel</button>
                  </div>
                </div>
              )}

              <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-700/50 border-b border-slate-600">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Name</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Email</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Roll No</th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300">Status</th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                      {adminData.students.map(student => (
                        <tr key={student.id} className="hover:bg-slate-700/30 transition-all">
                          <td className="px-6 py-4 text-white">{student.name}</td>
                          <td className="px-6 py-4 text-slate-400 text-sm">{student.email}</td>
                          <td className="px-6 py-4 text-slate-400">{student.rollNo}</td>
                          <td className="px-6 py-4 text-center"><span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                            student.status === 'active' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                          }`}>{student.status}</span></td>
                          <td className="px-6 py-4 text-center"><button className="text-indigo-400 hover:text-indigo-300 text-sm font-semibold">Edit</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* COURSES TAB */}
          {activeTab === 'assignments' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">📚 Course Management</h2>
                <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                  + Add Course
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {adminData.courses.map(course => (
                  <div key={course.id} className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                    <h3 className="text-white font-bold">{course.name}</h3>
                    <p className="text-slate-400 text-sm mt-2">Code: {course.code}</p>
                    <div className="mt-4 space-y-2 text-sm">
                      <p className="text-slate-400">Students: <span className="text-indigo-400 font-bold">{course.students}</span></p>
                      <p className="text-slate-400">Faculty: <span className="text-indigo-400 font-bold">{course.faculty}</span></p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-700 flex gap-2">
                      <button className="flex-1 bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/30 px-3 py-1 rounded text-xs font-semibold">Edit</button>
                      <button className="flex-1 bg-red-600/20 text-red-300 hover:bg-red-600/30 px-3 py-1 rounded text-xs font-semibold">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* REPORTS TAB */}
          {activeTab === 'timetable' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">📊 Reports & Analytics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                  <h3 className="text-white font-bold mb-4">Academic Performance</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-slate-400 text-sm">Grade A</span>
                        <span className="text-indigo-400 text-sm">35%</span>
                      </div>
                      <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500" style={{width: '35%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-slate-400 text-sm">Grade B</span>
                        <span className="text-green-400 text-sm">48%</span>
                      </div>
                      <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{width: '48%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-slate-400 text-sm">Grade C</span>
                        <span className="text-orange-400 text-sm">17%</span>
                      </div>
                      <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500" style={{width: '17%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                  <h3 className="text-white font-bold mb-4">Activity Logs</h3>
                  <div className="space-y-3">
                    {adminData.logs.map((log, idx) => (
                      <div key={idx} className="flex items-center justify-between pb-3 border-b border-slate-700 last:border-0">
                        <div>
                          <p className="text-slate-300 text-sm">{log.action}</p>
                          <p className="text-slate-500 text-xs">{log.user}</p>
                        </div>
                        <span className="text-green-400 text-xs font-semibold">{log.timestamp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === 'notices' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">⚙️ System Settings</h2>
              <div className="space-y-4">
                <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                  <h3 className="text-white font-bold mb-4">🏛️ Institution Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-slate-300 text-sm font-medium">Institution Name</label>
                      <input type="text" defaultValue="Smart Campus College" className="w-full mt-1 bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600" />
                    </div>
                    <div>
                      <label className="text-slate-300 text-sm font-medium">Academic Year</label>
                      <input type="text" defaultValue="2024-2025" className="w-full mt-1 bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600" />
                    </div>
                    <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-semibold">Save Changes</button>
                  </div>
                </div>

                <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                  <h3 className="text-white font-bold mb-4">🔐 Security Settings</h3>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4" />
                      <span className="text-slate-300">Enable 2FA for Admin Accounts</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4" />
                      <span className="text-slate-300">Email Verification Required</span>
                    </label>
                  </div>
                  <button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-semibold">Save Security Settings</button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;