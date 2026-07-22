import React from 'react';

function Sidebar({ activeTab, setActiveTab, role }) {
  const menuItems = [
    { id: 'overview', label: '📊 Dashboard' },
    { id: 'attendance', label: '📅 Attendance' },
    { id: 'timetable', label: '⏰ Timetable' },
    { id: 'assignments', label: '📚 Assignments' },
    { id: 'notices', label: '📢 Notice Board' },
  ];

  return (
    <aside className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col justify-between p-4">
      <div>
        {/* Brand */}
        <div className="flex items-center space-x-3 mb-8 px-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white">
            SC
          </div>
          <span className="text-lg font-bold bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Smart Campus
          </span>
        </div>

        {/* Navigation */}
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

      <div className="text-xs text-slate-500 text-center border-t border-slate-700 pt-3">
        Role: <span className="text-indigo-400 font-medium">{role}</span>
      </div>
    </aside>
  );
}

export default Sidebar;