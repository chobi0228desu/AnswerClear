import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Top from './components/Top';
import { APPLICATON_TITLT } from './components/common/phrase';
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Top />} />
      </Routes>
    </Router>
  );
}

export default App;
