import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { UserProvider, useUser } from './context/UserContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Browse from './pages/Browse';
import MyRentals from './pages/MyRentals';
import AdminDashboard from './pages/AdminDashboard';
import LoginModal from './components/LoginModal';
import { Toaster } from 'react-hot-toast';

const AppContent = () => {
  const { user, loading } = useUser();
  const [showLogin, setShowLogin] = useState(false);

  if (loading) return <div className="h-screen flex items-center justify-center bg-slate-950 text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/my-rentals" element={user ? <MyRentals /> : <Navigate to="/" />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Routes>
      </main>
      
      {!user && <LoginModal isOpen={!user} />}
      <Toaster position="bottom-right" />
    </div>
  );
};

function App() {
  return (
    <UserProvider>
      <Router>
        <AppContent />
      </Router>
    </UserProvider>
  );
}

export default App;
