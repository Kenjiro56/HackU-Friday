// src/pages/index.tsx
import React from 'react';
import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <div>
      <Link href="/login">
        <button>ログイン</button>
      </Link>
      <Link href="/signup">
        <button>新規登録</button>
      </Link>
    </div>
  );
};

export default Home;
