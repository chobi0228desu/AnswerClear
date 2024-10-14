import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { APPLICATON_TITLT } from './common/phrase';
import { alertLog } from './common/method';

const Top: React.FC = () => {
  return (
    <h1>{APPLICATON_TITLT}</h1>
  );
};

export default Top;