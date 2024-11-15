'use client';
// src/pages/login.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    // ログインAPIへのリクエスト（例）
    // try {
    //   const response = await fetch('/api/login', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ username, password }),
    //   });

    //   if (response.ok) {
    //     // ログイン成功後にガチャ画面にリダイレクト
    //     router.push('/gachaHome');
    //   } else {
    //     console.error('ログイン失敗');
    //   }
    // } catch (error) {
    //   console.error('ログインエラー:', error);
    // }
    console.log('ログイン');
  };

  return (
    <div>
      <h1>ログイン</h1>
      <input
        type="text"
        placeholder="ユーザー名"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>ログイン</button>
    </div>
  );
};

export default Login;
