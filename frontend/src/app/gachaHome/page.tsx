'use client';

import React, { useState, useRef, useEffect } from 'react';
import Modal from './components/Modal';
import DescriptionModal from './components/DescriptionModal';
import Image from 'next/image';
import GachaAnimation from './components/GachaAnimation';
import GachaThumbnail from './components/GachaThumbnail';
import timeCategoryAttribute from '../../constants/timeCategoryAttribute';
import GochaMazeDesc from './components/GochaMazeDesc';


const GachaHome: React.FC = () => {
  const [isMixMode, setIsMixMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDesModalOpen, setIsDesModalOpen] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [timeCategory, setTimeCategory] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const containerWidth = scrollContainerRef.current.offsetWidth;

      // 位置に基づいて表示されているアイテムを特定
      const index = Math.round(scrollLeft / containerWidth);
      setTimeCategory(index);
    }
  };

    useEffect(() => {
      // bodyタグの背景色を設定
      document.body.style.backgroundColor = timeCategoryAttribute[timeCategory].color;

      // コンポーネントがアンマウントされるときに背景色をリセット
      return () => {
        document.body.style.backgroundColor = '';
      };
    },);


  // トグルの切り替え
  const handleToggle = () => setIsMixMode(!isMixMode);
  const userId = 1; //あとで変更できるようにする


  // ガチャボタンが押されたときの処理
  const handleGachaClick = async () => {
    const endpoint = isMixMode
      ? `http://localhost:8080/bucketls/popSelect/${timeCategory}/all`
      : `http://localhost:8080/bucketls/popSelect/${timeCategory}/${userId}`;
      setIsLoading(true);
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      setApiResponse(data);  // レスポンスをstateに保存
      setTimeout(() => {
        setIsLoading(false); // アニメーションを非表示
        setIsModalOpen(true); // モーダルを表示
      }, 4000);
    } catch (error) {
      console.error('ガチャデータの取得に失敗しました:', error);
      setIsLoading(false);
    }
  };

  return (
    <div>
        {/* ガチャ部分 */}
        <div className="mt-10 flex">
          {isMixMode && <Image src={"/images/mixedBg.png"} alt="mixedBG" width={390} height={839} className="fixed top-0 left-1/2 transform -translate-x-1/2 opacit z-1" />}
          <div
            className="overflow-x-auto flex"
            ref={scrollContainerRef}
            onScroll={handleScroll}
          >
            {/* ここfor文で回すようにしたい */}
            <div className="flex space-x-4 max-w-xs mx-auto px-3 z-50">
              <GachaThumbnail timeCategory={ timeCategory } srcPath= { "/images/gacha0.jpg" } imgWidth={180} imgHeight={ 338 } />
              <GachaThumbnail timeCategory={ timeCategory } srcPath= { "/images/gacha1.png" } imgWidth={210} imgHeight={ 338 }/>
              <GachaThumbnail timeCategory={ timeCategory } srcPath= { "/images/gacha2.jpg" } imgWidth={180} imgHeight={ 338 }/>
            </div>
          </div>
        </div>

        {/* ごちゃ混ぜモード切り替え部 */}
        {/* <div className="flex items-center space-x-2 justify-center">
          <div className="flex items-center space-x-2 mt-4 justify-center py-3 z-50 bg-[#f8f7f1] px-[16px] py-[10px] rounded-[10px]">
              <button
                className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-xs text-black mr-2 border border-black"
                aria-label="ごちゃ混ぜモードの説明"
                onClick={() => setIsDesModalOpen(true)}
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
        </div> */}
        <GochaMazeDesc checked={ isMixMode } onChecked={ handleToggle } onBtnClick={ () => setIsDesModalOpen(true) }/>
        {isDesModalOpen && <DescriptionModal onClose={() => setIsDesModalOpen(false)} />}

        {/* ガチャを引くボタン */}
        <div className="flex">
          <button onClick={handleGachaClick} className="mt-4 py-3 px-6 bg-black text-white rounded-full shadow-lg mx-auto block z-50">ガチャを回す</button>
        </div>
        {isModalOpen && <Modal data={apiResponse} onClose={() => setIsModalOpen(false)} />}
        {isLoading && <GachaAnimation time_id={ timeCategory } />}

    </div>
  );
};

export default GachaHome;
