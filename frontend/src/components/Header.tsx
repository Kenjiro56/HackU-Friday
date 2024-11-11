'use client';
import React from 'react';
import { useRouter } from 'next/navigation';


const Header: React.FC = () => {
  const router = useRouter();

  const navigateToHome = () => {
    router.push('/');
  };

  const navigateToBucketList = () => {
    router.push('/bucketList');
  };

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#000' }}>
      <button onClick={navigateToHome}>ガチャをひく</button>
      <button onClick={navigateToBucketList}>やりたいこと</button>
    </header>
  );
};

export default Header;
