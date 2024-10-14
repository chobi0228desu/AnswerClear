import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Top from './components/Top';
import Header from './components/layouts/header';
const App: React.FC = () => {
  return (
    <>
      <Header/>
      <Router>
        <Routes>
            <Route path="/" element={<Top />} />
        </Routes>
      </Router>
      </>
  );
}

export default App;
