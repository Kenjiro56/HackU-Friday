// src/pages/signup.tsx
import React, { useState } from 'react';

const Signup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    // try {
    //   const response = await fetch('/api/signup', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ username, password }),
    //   });

    //   if (response.ok) {
    //     console.log('新規登録が成功しました');
    //   } else {
    //     console.error('新規登録失敗');
    //   }
    // } catch (error) {
    //   console.error('新規登録エラー:', error);
    // }
    console.log('新規登録');
  };

  return (
    <div>
      <h1>新規登録</h1>
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
      <button onClick={handleSignup}>新規登録</button>
    </div>
  );
};

export default Signup;
