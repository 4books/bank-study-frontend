import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import { removeToken } from './services/api';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    removeToken();
    setIsLoggedIn(false);
  };

  return (
      <Router>
        <div className="App">
          {isLoggedIn && (
              <button onClick={handleLogout}>로그아웃</button>
          )}
          <Routes>
            <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
            <Route path="/signup" element={isLoggedIn ? <Navigate to="/" /> : <Signup />} />
            <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;