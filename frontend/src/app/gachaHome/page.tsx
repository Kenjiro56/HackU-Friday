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
      <label>
        <input type="checkbox" checked={isMixMode} onChange={handleToggle} />
        ごちゃ混ぜモード
      </label>
      <button onClick={handleGachaClick}>ガチャを回す</button>
      {isModalOpen && <Modal data={apiResponse} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default GachaHome;
