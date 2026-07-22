import React, { useState, useEffect } from 'react';
import { auth, db } from './firebase/config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import Landing from './pages/Landing';
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
  const [showLanding, setShowLanding] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            setUser(currentUser);
            setUserData(userDoc.data());
            setShowLanding(false);
          } else {
            await signOut(auth);
            setUser(null);
            setUserData(null);
          }
        } catch (error) {
          console.error("Session verification error:", error);
          await signOut(auth);
          setUser(null);
          setUserData(null);
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
    await signOut(auth);
    setUser(null);
    setUserData(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d111e] flex items-center justify-center text-white">
        <p className="animate-pulse text-indigo-400 font-semibold text-sm">Smart Campus Systems...</p>
      </div>
    );
  }

  // Show landing page first
  if (showLanding && !user) {
    return <Landing onGetStarted={() => setShowLanding(false)} />;
  }

  // Auth Guard
  if (!user || !userData) {
    return isSignUpPage ? (
      <SignUp onSwitchToLogin={() => setIsSignUpPage(false)} />
    ) : (
      <Login onSwitchToSignUp={() => setIsSignUpPage(true)} />
    );
  }

  const role = userData.role;

  return (
    <div>
      {role === 'student' && <StudentDashboard user={user} userData={userData} onLogout={handleLogout} />}
      {role === 'faculty' && <FacultyDashboard user={user} userData={userData} onLogout={handleLogout} />}
      {role === 'admin' && <AdminDashboard user={user} userData={userData} onLogout={handleLogout} />}
    </div>
  );
}

export default App;