import React, { useState } from 'react';
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import FacultyDashboard from './pages/FacultyDashboard';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const [currentUser, setCurrentUser] = useState(null); // { name: '', role: 'student' | 'faculty' | 'admin' }

  // Login handler
  const handleLogin = (userRole, userEmail) => {
    setCurrentUser({
      name: userEmail.split('@')[0] || 'User',
      role: userRole,
    });
  };

  // Logout handler
  const handleLogout = () => {
    setCurrentUser(null);
  };

  // Render logic based on Role
  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div>
      {currentUser.role === 'student' && <StudentDashboard user={currentUser} onLogout={handleLogout} />}
      {currentUser.role === 'faculty' && <FacultyDashboard user={currentUser} onLogout={handleLogout} />}
      {currentUser.role === 'admin' && <AdminDashboard user={currentUser} onLogout={handleLogout} />}
    </div>
  );
}

export default App;