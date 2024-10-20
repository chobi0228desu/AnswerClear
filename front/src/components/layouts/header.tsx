import React from 'react';
import {APPLICATON_TITLE} from '../common/phrase';

const Header: React.FC = () => {
  return (
    <>
      <header className="bg-emerald-600 text-white h-16 flex items-center justify-center shadow-[0_10px_20px_rgba(0,0,0,0.5),0_6px_6px_rgba(0,0,0,0.25)] border-b-4 border-gray-600 sticky">
        <h1 className="text-lg font-bold">{APPLICATON_TITLE}</h1>
      </header>
    </>
  );
};

export default Header;