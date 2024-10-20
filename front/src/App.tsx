import React, { useState, useLayoutEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Top from './components/Top';
import Signup from './components/Signup';
import Login from './components/Login';
import Header from './components/layouts/Header';

const App: React.FC = () => {
  const [loginFlag, setLoginFlag] = useState(false);

  // ログイン状態をチェック
  useLayoutEffect(() => {
    setLoginFlag(!!localStorage.getItem('username'));
  }, []);

  return (
    <div className="w-full min-h-screen overflow-hidden">
      {/* ヘッダー */}
      <Header />
      
      {/* ヘッダーの高さを確保するために padding-top を設定 */}
      <main className="pt-16"> {/* h-16 分の padding を追加 */}
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
      </main>
    </div>
  );
}

export default App;
