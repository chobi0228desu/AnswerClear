import React, { useState } from 'react';
import { APPLICATON_URL } from './common/setting';

const Signup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // バリデーションチェック
    if (!username || !email || !password || !confirmPassword) {
      setError('全ての項目を入力してください');
      return;
    }

    // メールアドレスのバリデーション
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('無効なメールアドレスです');
      return;
    }

    // パスワードのバリデーション
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // 英数字含む8文字以上
    if (!passwordRegex.test(password)) {
      setError('パスワードは英数字を含む8文字以上である必要があります');
      return;
    }

    if (password !== confirmPassword) {
      setError('パスワードと確認用パスワードが一致しません');
      return;
    }

    try {
      const response = await fetch(`${APPLICATON_URL}/auths/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            name: username, 
            mail: email,
            password,
            admin_flg: 0,
            introduction: "",
            icon_img: "", 
            catch_phrase: ""
        }),
      });

      if (response.ok) {
          setSuccess(true);
          localStorage.setItem('username', username);
          window.location.href = '/';
          setError('');
          // フォームをクリア
          setUsername('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
      } else {
          const errorMessage = await response.text();
          setError(errorMessage || 'サインアップに失敗しました');
      }
    } catch (err) {
      setError('ネットワークエラーが発生しました');
    }
  };
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">新規登録</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && <div className="text-green-500 mb-4">サインアップに成功しました！</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm mb-2 font-bold" htmlFor="username">
            ユーザー名
            <span className="bg-red-500 text-white text-xs font-semibold ml-2 px-2 py-1 rounded-full">
              必須
            </span>
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-2 font-bold" htmlFor="email">
            メールアドレス
            <span className="bg-red-500 text-white text-xs font-semibold ml-2 px-2 py-1 rounded-full">
              必須
            </span>
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-2 font-bold" htmlFor="password">
            パスワード
            <span className="bg-red-500 text-white text-xs font-semibold ml-2 px-2 py-1 rounded-full">
              必須
            </span>
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-2 font-bold" htmlFor="confirmPassword">
            確認用パスワード
            <span className="bg-red-500 text-white text-xs font-semibold ml-2 px-2 py-1 rounded-full">
              必須
            </span>
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 font-bold"
        >
          登録
        </button>
      </form>
    </div>
  );
};

export default Signup;
