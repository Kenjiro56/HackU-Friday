'use client';

import React, { useState } from 'react';
import Modal from './components/Modal';

const GachaHome: React.FC = () => {
  const [isMixMode, setIsMixMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);

  // トグルの切り替え
  const handleToggle = () => setIsMixMode(!isMixMode);
  const userId = 1; //あとで変更できるようにする
  const timeCategoryIndex = 0; //ここも

  // ガチャボタンが押されたときの処理
  const handleGachaClick = async () => {
    const endpoint = isMixMode
      ? `http://localhost:8080/bucketls/popSelect/${timeCategoryIndex}/all`
      : `http://localhost:8080/bucketls/popSelect/${timeCategoryIndex}/${userId}`;
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      setApiResponse(data);  // レスポンスをstateに保存
      setIsModalOpen(true);  // モーダルを表示
    } catch (error) {
      console.error('ガチャデータの取得に失敗しました:', error);
    }
  };

  return (
    <div>
      <div className="flex items-center mb-4">
        <button
            className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-xs text-black mr-2 border border-black"
            aria-label="ごちゃ混ぜモードの説明"
          >
          ?
        </button>

        <span className="mr-2 text-lg">ごちゃ混ぜモード</span>
        <input type="checkbox" className="toggle-checkbox hidden" id="toggle" checked={isMixMode} onChange={handleToggle} />
        <label htmlFor="toggle"
          className={`toggle-label block w-12 h-6 rounded-full cursor-pointer transition-colors ${
            isMixMode ? 'bg-black' : 'bg-gray-300'
          }`}>
          <span className={`dot absolute w-6 h-6 bg-white rounded-full transition-transform ${
              isMixMode ? 'translate-x-6' : 'translate-x-0'
          }`}></span>
        </label>
      </div>
      <button onClick={handleGachaClick} className="mt-4 py-3 px-6 bg-black text-white rounded-full shadow-lg mx-auto block">ガチャを回す</button>
      {isModalOpen && <Modal data={apiResponse} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default GachaHome;
