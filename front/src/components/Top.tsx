import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { APPLICATON_TITLE } from './common/phrase';
import { alertLog } from './common/method';
import BaseButton from './layouts/BaseButton';

const Top: React.FC = () => {
  return (
    <div className={`h-full flex flex-col items-center justify-center`}>
      <BaseButton to="/signup" text="新規登録" />
      <BaseButton to="/login" text="ログイン" />
      <Link
        to="/password_edit"
        className={`text-blue-500 hover:text-blue-700 underline mt-5`}
      >パスワードをお忘れの方はこちら</Link>
    </div>
  );
};

export default Top;