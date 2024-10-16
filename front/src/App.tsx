import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Top from './components/Top';
import Signup from './components/Signup';
import Header from './components/layouts/Header';
const App: React.FC = () => {
  const [loginFlag, setLoginFlag] = useState(false);
  //////////////////////////////////////////////////
  // TODO ここでログインしてるかどうか確認する処理を書く。//
  //////////////////////////////////////////////////
  return (
    <div className="w-full min-h-screen overflow-hidden">
      <Header/>
      <Router>
        <Routes>
          {loginFlag ? (
            <h1>ログイン済みです。</h1>
          ) : (
            <>
              <Route path="/" element={<Top />} />
              <Route path="/signup" element={<Signup />} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
