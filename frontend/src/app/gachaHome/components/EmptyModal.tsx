import React from 'react';
import { useRouter } from 'next/navigator';

const EmptyModal: React.FC = () => {
  const router = useRouter();
  const handleButtonClick = () => {
    router.push('/bucketList');
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-700 bg-opacity-50">
      <p>ガチャの中身が空っぽだよ！</p>
      <p>やりたいことを登録しよう！</p>
      <button
        onClick={handleButtonClick}
        className="absolute top-6 left-6 flex items-center text-black font-semibold"
      >
        やりたいことを登録する！
      </button>
    </div>
  );
}
export default EmptyModal;
