import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const BaseButton: React.FC<{ to: string; text: string }> = ({ to, text }) => {
  return (
      <Link
        to={to}
        className={`inline-block px-10 py-3 mt-4 text-lg font-semibold text-white bg-emerald-700 rounded-lg shadow-lg transition duration-300 ease-in-out hover:bg-emerald-500 hover:shadow-xl`}
      >
        {text}
      </Link>
  )
}
export default BaseButton;