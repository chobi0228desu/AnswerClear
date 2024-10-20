import React, { useState } from 'react';
import { APPLICATON_URL } from './common/setting';


const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // バリデーションチェック
    if (!username || !email || !password) {
      setError('全ての項目を入力してください');
      return;
    }

    try {
      const response = await fetch(`${APPLICATON_URL}/auths/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
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
      } else {
        const errorMessage = await response.text();
        setError(errorMessage || 'ログインに失敗しました');
      }
    } catch (err) {
      setError('ネットワークエラーが発生しました');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">ログイン</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && <div className="text-green-500 mb-4">ログインに成功しました！</div>}

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

        <button
          type="submit"
          className="w-full mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 font-bold"
        >
          ログイン
        </button>
      </form>
    </div>
  );
};

export default Login;
