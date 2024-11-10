import React from 'react';
import { useRouter } from 'next/router';

interface GachaButtonProps {
  mixMode: boolean;
  timeCategoryIndex: number;
}

const GachaButton: React.FC<GachaButtonProps> = ({ mixMode, timeCategoryIndex }) => {
  const router = useRouter();
  // ここあとでUserContextから取得するできるようにする
  const userId = 1;
  const handleGachaButtonClicked = async () => {
  try{
    const fetchUrl = mixMode
      ? `http://localhost:8080/popSelect/${timeCategoryIndex}/all`
      : `http://localhost:8080/popSelect/${timeCategoryIndex}/${userId}`

    const response = await fetch(fetchUrl);
    if (!response.ok) {
      throw new Error('データ取得に失敗！');
    }
    const data = await response.json();

    router.push({
      pathname: '/resultView',
      query: { data: JSON.stringify(data) }
    });
  }catch(e){
    console.error(e);
  }
};

  return (
    <button onClick={handleGachaButtonClicked}>ガチャを引く</button>
  );
}

export default GachaButton;
