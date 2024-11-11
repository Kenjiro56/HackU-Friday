'use client';

import React, { useState } from 'react';
import Modal from './components/Modal';
import GachaImage from '../../assets/gachaImage.svg';
import Image from 'next/image';

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
    <div flex flex-col items-center min-h-screen bg-blue-300>
        {/* ガチャスクロール部分 */}
        <div className="overflow-x-auto py-4">
          <div className="flex space-x-4 px-4 w-full max-w-xs mx-auto">
            <div className="min-w-full">
              <Image src={GachaImage} alt="ガチャ1" width={300} height={400} className="rounded-lg border-2 border-black" />
            </div>
            <div className="min-w-full">
              <Image src={GachaImage} alt="ガチャ2" width={300} height={400} className="rounded-lg border-2 border-black" />
            </div>
            <div className="min-w-full">
              <Image src={GachaImage} alt="ガチャ3" width={300} height={400} className="rounded-lg border-2 border-black" />
            </div>
          </div>
        </div>

        {/* ごちゃ混ぜモード部分 */}
        <div className="flex items-center space-x-2 mt-4 justify-center">
        <button
            className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-xs text-black mr-2 border border-black"
            aria-label="ごちゃ混ぜモードの説明"
          >
          ?
        </button>

        <span className="text-lg">ごちゃ混ぜモード</span>
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

      {/* ガチャを回すボタン部分 */}
      <button onClick={handleGachaClick} className="mt-4 py-3 px-6 bg-black text-white rounded-full shadow-lg mx-auto block">ガチャを回す</button>
      {isModalOpen && <Modal data={apiResponse} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default GachaHome;
