'use client';

import React, { useState, useRef, useEffect } from 'react';
import Modal from './components/Modal';
import DescriptionModal from './components/DescriptionModal';
import Image from 'next/image';

const GachaHome: React.FC = () => {
  const [isMixMode, setIsMixMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDesModalOpen, setIsDesModalOpen] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [timeCategory, setTimeCategory] = useState(0);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [visibleItem, setVisibleItem] = useState<string>('短時間');

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const containerWidth = scrollContainerRef.current.offsetWidth;

      // 位置に基づいて表示されているアイテムを特定
      const index = Math.round(scrollLeft / containerWidth);

      // インデックスに応じて表示されるアイテムを設定
      switch (index) {
        case 0:
          setVisibleItem('短時間');
          setTimeCategory(0);
          break;
        case 1:
          setVisibleItem('数時間');
          setTimeCategory(1);
          break;
        case 2:
          setVisibleItem('1日');
          setTimeCategory(2);
          break;
        default:
          setVisibleItem('短時間');
          setTimeCategory(0);
      }
    }
  };

    useEffect(() => {
      // 表示されているアイテムに応じて背景色を変更
      const getBackgroundColor = () => {
        switch (visibleItem) {
          case '短時間':
            return '#FCC605';
          case '数時間':
            return '#6CB9FF';
          case '1日':
            return '#FC842E';
          default:
            return '#FCC605';
        }
      };

      // bodyタグの背景色を設定
      document.body.style.backgroundColor = getBackgroundColor();

      // コンポーネントがアンマウントされるときに背景色をリセット
      return () => {
        document.body.style.backgroundColor = '';
      };
    }, [visibleItem]);


  // トグルの切り替え
  const handleToggle = () => setIsMixMode(!isMixMode);
  const userId = 1; //あとで変更できるようにする


  // ガチャボタンが押されたときの処理
  const handleGachaClick = async () => {
    const endpoint = isMixMode
      ? `http://localhost:8080/bucketls/popSelect/${timeCategory}/all`
      : `http://localhost:8080/bucketls/popSelect/${timeCategory}/${userId}`;
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
        {/* ガチャ部分 */}
        <div className="mt-10">
        {isMixMode && <Image src={"/images/mixedBg.png"} alt="mixedBG" width={390} height={840} className="fixed top-0 left-1/2 transform -translate-x-1/2 opacity" />}
          <div
            className="overflow-x-auto"
            ref={scrollContainerRef}
            onScroll={handleScroll}
          >
            <div className="flex space-x-4 max-w-xs mx-auto px-3">
              {/* 短時間 */}
              <div className="flex bg-white rounded-[30px] border-2 border-black relative w-[312px] h-[418px] justify-center items-center min-w-full">
                  <div className="absolute top-3 left-3 bg-white text-[#FCC605] text-sm px-3 py-2 rounded-[100px] border-2 border-[#FCC605] w-[84px] h-[42px] flex justify-center items-center">
                    短時間
                  </div>
                  <Image src="/gacha.png" alt="短時間" width={192} height={338} />
              </div>

              {/* 数時間 */}
              <div className="flex bg-white rounded-[30px] border-2 border-black relative w-[312px] h-[418px] justify-center items-center min-w-full">
                  <div className="absolute top-3 left-3 bg-white text-[#6CB9FF] text-sm px-3 py-2 rounded-[100px] border-2 border-[#6CB9FF] w-[84px] h-[42px] flex justify-center items-center ">
                    数時間
                  </div>
                  <Image src="/gacha.png" alt="短時間" width={192} height={338} />
              </div>

              {/* 一日 */}
              <div className="flex bg-white rounded-[30px] border-2 border-black relative w-[312px] h-[418px] justify-center items-center min-w-full">
                  <div className="absolute top-3 left-3 bg-white text-[#FC842E] text-sm px-3 py-2 rounded-[100px] border-2 border-[#FC842E] w-[84px] h-[42px] flex justify-center items-center ">
                    1日
                  </div>
                  <Image src="/gacha.png" alt="短時間" width={192} height={338} />
              </div>
            </div>
          </div>
          </div>
        {/* ごちゃ混ぜモード切り替え部 */}
        <div className="flex items-center space-x-2 mt-4 justify-center py-3">
          <button
              className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-xs text-black mr-2 border border-black"
              aria-label="ごちゃ混ぜモードの説明"
              onClick={() => setIsDesModalOpen(true)}
            >
            ?
          </button>
          {isDesModalOpen && <DescriptionModal onClose={() => setIsDesModalOpen(false)} />}

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

        {/* ガチャを引くボタン */}
        <button onClick={handleGachaClick} className="mt-4 py-3 px-6 bg-black text-white rounded-full shadow-lg mx-auto block">ガチャを回す</button>
        {isModalOpen && <Modal data={apiResponse} onClose={() => setIsModalOpen(false)} />}

    </div>
  );
};

export default GachaHome;
