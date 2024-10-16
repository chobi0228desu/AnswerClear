import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

interface BaseButtonProps {
  to: string;
  text: string;
  about?: any;
}
const BaseButton: React.FC<BaseButtonProps> = ({ to, text, about }) => {
  return (
      <Link
        to={to}
        className={`inline-block px-10 py-3 mt-4 text-lg font-semibold text-white bg-orange-400 rounded-lg shadow-lg transition duration-300 ease-in-out hover:bg-orange-300 hover:shadow-xl`}
      >
        {text}
      </Link>
  )
}
export default BaseButton;