import React from 'react';

interface ModalProps {
  onClose: () => void;

}

const NewBucketModal: React.FC<ModalProps> = ({ onClose }) => {
  const [bucketTitle, setBucketTitle] = React.useState('');
  const [timeId, setTimeId] = React.useState(0);
  const [loopFlag, setLoopFlag] = React.useState(false);
  const [description, setDescription] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const userId = 1; //あとで変更できるようにする
  const handleSubmit = async () => {
    setIsSubmitting(true);
    const data = {
      userId,
      bucketTitle,
      timeId,
      loopFlag,
      description: description || '',
    };

    try {
      const respionse = await fetch('http://localhost:8080/bucketls/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (respionse.ok) {
        console.log('バケットリストの追加に成功しました');
        onClose();
      }else{
        console.error('バケットリストの追加に失敗しました');
      }
    } catch(error){
        console.error('Error fetching API:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // <div className="modal">
    //   <div className="modal-content">
    //     <button onClick={onClose}>←</button>

    //     {/* 時間カテゴリボタン */}
        // <div>
        //   <button onClick={() => setTimeId(0)}>短時間</button>
        //   <button onClick={() => setTimeId(1)}>数時間</button>
        //   <button onClick={() => setTimeId(2)}>1日</button>
        // </div>

    //     {/* 繰り返しボタン */}
    //     <div>
    //       <button onClick={() => setLoopFlag(true)}>繰り返す</button>
    //       <button onClick={() => setLoopFlag(false)}>一度だけ</button>
    //     </div>

    //     {/* やりたいことフォーム */}
    //     <input
    //       type="text"
    //       placeholder="やりたいこと"
    //       value={bucketTitle}
    //       onChange={(e) => setBucketTitle(e.target.value)}
    //       required
    //     />

    //     {/* 詳細フォーム */}
    //     <textarea
    //       placeholder="メモ"
    //       value={description}
    //       maxLength={255}
    //       onChange={(e) => setDescription(e.target.value)}
    //     ></textarea>

    //     {/* 決定ボタン */}
    //     <button onClick={handleSubmit}>決定</button>
    //   </div>
    // </div>

    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-700 bg-opacity-50">
      {/* モーダルの内容 */}
      <div className="bg-[#fdfcf5] w-[90%] max-w-md rounded-2xl p-6 shadow-lg relative flex flex-col items-center">
        {/* 閉じるボタン (オーバーレイ) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500"
        >
          &times;
        </button>

        {/* 時間選択ボタン */}
        <div className="flex justify-around w-full mb-4">
          <button onClick={() => setTimeId(0)} className={`
            ${timeId === 0 ? 'bg-[#fcc605] text-white' : 'bg-white text-[#fcc605]'}
            font-semibold py-2 px-4 rounded-full border-2 border-[#f9c754]`}>短時間</button>
          <button onClick={() => setTimeId(1)} className={`
            ${timeId === 1 ?'bg-[#6cb9ff] text-white': 'bg-white text-[#6cb9ff]'}
            font-semibold py-2 px-4 rounded-full border-2 border-[#6cb9ff]`}>数時間</button>
          <button onClick={() => setTimeId(2)} className={`
            ${timeId === 2 ?'bg-[#fc842e] text-white': 'bg-white text-[#fc842e]'}
            font-semibold py-2 px-4 rounded-full border-2 border-[#ff935d]`}>1日</button>
        </div>

        {/* 繰り返す・一度だけボタン */}
        <div className="flex justify-around w-full mb-4">
          <button className="bg-black text-white font-semibold py-2 px-6 rounded-full">繰り返す</button>
          <button className="border-2 border-black text-black font-semibold py-2 px-6 rounded-full">一度だけ</button>
        </div>

        {/* やりたいことのタイトル */}
        <div className="text-left w-full mb-2 font-semibold">やりたいこと</div>
        <div className="w-full mb-4 p-2 border-2 border-black rounded-full text-center">
          映画を観に行く
        </div>

        {/* メモのセクション */}
        <div className="text-left w-full mb-2 font-semibold">メモ</div>
        <div className="w-full mb-4 p-4 border-2 border-black rounded-xl">
          <ul className="list-disc list-inside">
            <li>ラストマイル</li>
            <li>ビートルジュース ビートルジュース</li>
            <li>HAPPYEND</li>
          </ul>
        </div>

        {/* 決定ボタン */}
        <button
          onClick={onClose}
          className="bg-black text-white font-semibold py-2 px-6 rounded-full"
        >
          決定
        </button>
      </div>
    </div>
  );

};

export default NewBucketModal;
