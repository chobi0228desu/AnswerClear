import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Top from './components/Top';
import Header from './components/layouts/header';
const App: React.FC = () => {
  return (
    <div className={`w-full min-h-screen overflow-hidden`}>
      <Header/>
      <Router>
        <Routes>
            <Route path="/" element={<Top />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
