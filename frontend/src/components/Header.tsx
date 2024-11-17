'use client';
import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Logo from '../assets/logo.svg';


const Header: React.FC = () => {
  const router = useRouter();
  const currentPath = usePathname();

  const navigateToHome = () => {
    router.push('/gachaHome');
  };

  const navigateToBucketList = () => {
    router.push('/bucketList');
  };

  return (
    <header className="max-w-xs mx-auto flex flex-col items-center fixed top-0 left-0 right-0 z-10">
      <Logo width={100} height={50} />
      <div className="flex w-full rounded-full overflow-hidden border-2 border-black">
        <button onClick={navigateToHome} className={`flex-1 py-2 ${
          currentPath === '/gachaHome' ? 'bg-black text-white' : 'bg-white text-black'
        }`}>ガチャをひく</button>
        <button onClick={navigateToBucketList} className={`flex-1 py-2 ${
          currentPath === '/bucketList' ? 'bg-black text-white' : 'bg-white text-black'
        }`}>やりたいこと</button>
      </div>
    </header>
  );
};

export default Header;
