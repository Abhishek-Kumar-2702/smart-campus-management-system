import React, { useState, useEffect } from 'react';
import { auth, db } from './firebase/config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import StudentDashboard from './pages/StudentDashboard';
import FacultyDashboard from './pages/FacultyDashboard';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSignUpPage, setIsSignUpPage] = useState(false);

  useEffect(() => {
    // Realtime Firebase Auth Observer
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          // Firestore se exact role aur user detail fetch karna
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            console.warn("User data not found in Firestore database!");
            setUserData({ role: 'student' });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUserData({ role: 'student' });
        }
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserData(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white font-sans">
        <p className="animate-pulse text-indigo-400 font-semibold text-lg">Loading Smart Campus System...</p>
      </div>
    );
  }

  // Not Logged In -> Show Login or SignUp
  if (!user) {
    return isSignUpPage ? (
      <SignUp onSwitchToLogin={() => setIsSignUpPage(false)} />
    ) : (
      <Login onSwitchToSignUp={() => setIsSignUpPage(true)} />
    );
  }

  // Logged In -> Render Role Dashboard strictly
  const role = userData?.role;

  return (
    <div>
      {role === 'student' && <StudentDashboard user={user} userData={userData} onLogout={handleLogout} />}
      {role === 'faculty' && <FacultyDashboard user={user} userData={userData} onLogout={handleLogout} />}
      {role === 'admin' && <AdminDashboard user={user} userData={userData} onLogout={handleLogout} />}
      
      {!role && (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center space-y-4">
          <p className="text-slate-400">User role not configured in database.</p>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 rounded-lg text-sm font-semibold hover:bg-red-500"
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}

export default App;