import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Top from './components/Top';
import Signup from './components/Signup';
import Login from './components/Login';
import Header from './components/layouts/Header';

const App: React.FC = () => {
  const [loginFlag, setLoginFlag] = useState(false);
  useEffect(() => {
    setLoginFlag(!!localStorage.getItem('username'));
  }, []);

  return (
    <div className="w-full min-h-screen overflow-hidden">
      <Header/>
      <Router>
        <Routes>
          <Route
            path="/"
            element={loginFlag ? <h1>ログイン済みです。</h1> : <Top />}
          />
          {!loginFlag && (
            <>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
