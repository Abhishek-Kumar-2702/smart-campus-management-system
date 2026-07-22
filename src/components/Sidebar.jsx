import React from 'react';

function Sidebar({ activeTab, setActiveTab, role, onLogout }) {
  const menuItems = [
    { id: 'overview', label: '📊 Dashboard' },
    { id: 'attendance', label: '📅 Attendance' },
    { id: 'timetable', label: '⏰ Timetable' },
    { id: 'assignments', label: '📚 Assignments' },
    { id: 'notices', label: '📢 Notice Board' },
  ];

  return (
    <aside className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col justify-between p-4 h-screen">
      <div>
        <div className="flex items-center space-x-3 mb-8 px-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white">
            SC
          </div>
          <span className="text-lg font-bold bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Smart Campus
          </span>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === item.id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:bg-slate-700 hover:text-slate-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="border-t border-slate-700 pt-4 space-y-3">
        <div className="text-xs text-slate-400 text-center">
          Role: <span className="text-indigo-400 font-semibold capitalize">{role}</span>
        </div>
        
        <button
          onClick={onLogout}
          className="w-full py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl text-xs font-semibold transition-all flex items-center justify-center space-x-2"
        >
          <span>🚪</span>
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;