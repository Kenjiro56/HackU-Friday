import React from 'react';
import { useRouter } from 'next/navigation';

const EmptyModal: React.FC = () => {
  const router = useRouter();
  const handleButtonClick = () => {
    router.push('/bucketList');
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
      <div className="bg-white rounded-3xl p-6 w-80 shadow-lg border-2 border-black">
        <p className="text-center font-bold mb-6">
          ガチャの中身が空っぽだよ！<br />
          やりたいことを登録しよう！
        </p>
        <div className="flex justify-center">
          <button
            onClick={handleButtonClick}
            className="py-2 px-4 bg-black text-white rounded-full font-bold"
          >
            やりたいことを登録する！
          </button>
        </div>
      </div>
    </div>
  );
}
export default EmptyModal;
