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

    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-700 bg-opacity-50">
      <button
        onClick={() => onClose()}
        className="absolute top-6 left-6 flex items-center text-black font-semibold"
      >
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M25 50C38.8071 50 50 38.8071 50 25C50 11.1929 38.8071 0 25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50Z" fill="#111111"/>
          <path d="M25.0711 32.0711L18 25L25.0711 17.9289" stroke="#F8F7F1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M32.1421 25H18" stroke="#F8F7F1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* モーダルの内容 */}
      <div className="bg-[#fdfcf5] w-[351px] h-[565px] max-w-md rounded-2xl p-6 shadow-lg relative flex flex-col items-center">

        {/* 時間選択ボタン */}
        <div className="flex justify-around w-full mb-4 mt-5">
          <button onClick={() => setTimeId(0)} className={`
            ${timeId === 0 ? 'bg-[#fcc605] text-white' : 'bg-white text-[#fcc605]'}
            font-semibold py-2 px-4 rounded-full border-2 border-[#f9c754] w-[87px] h-[42px]
          `}>短時間</button>

          <button onClick={() => setTimeId(1)} className={`
            ${timeId === 1 ?'bg-[#6cb9ff] text-white': 'bg-white text-[#6cb9ff]'}
            font-semibold py-2 px-4 rounded-full border-2 border-[#6cb9ff] w-[87px] h-[42px]
          `}>数時間</button>

          <button onClick={() => setTimeId(2)} className={`
            ${timeId === 2 ?'bg-[#fc842e] text-white': 'bg-white text-[#fc842e]'}
            font-semibold py-2 px-4 rounded-full border-2 border-[#ff935d] w-[87px] h-[42px]
          `}>1日</button>
        </div>

        {/* 繰り返す・一度だけボタン */}
        <div className="flex justify-around w-full mb-4 mt-4">
          <button onClick={() => setLoopFlag(false)}
            className={`
              ${loopFlag === false ? 'bg-black text-white' : 'bg-white text-black'}
              font-semibold py-2 px-6 rounded-full border-2 border-black`}
          >一度だけ</button>
          <button onClick={() => setLoopFlag(true)}
            className={`
              ${loopFlag === true ? 'bg-black text-white' : 'bg-white text-black'}
              font-semibold py-2 px-6 rounded-full border-2 border-black`}
          >繰り返す</button>
        </div>


        {/* やりたいことのタイトル */}
        <div className="text-left w-full mb-2 font-semibold mt-4">やりたいこと</div>
        <input
          type="text"
          value={bucketTitle}
          onChange={(e) => setBucketTitle(e.target.value)}
          required
          className="w-full mb-4 px-4 py-2 border-2 border-black rounded-full text-left focus:outline-none focus:ring-2 focus:ring-blue-300"
        />


        {/* メモのセクション */}
        <div className="text-left w-full mb-2 font-semibold">メモ</div>
        <textarea
          placeholder="メモ"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={255}
          className="w-full mb-4 p-4 border-2 border-black rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
          rows={4} // 行数を指定
        ></textarea>



        {/* 決定ボタン */}
        <button
          onClick={handleSubmit}
          className="bg-black text-white font-semibold py-2 px-6 rounded-full mt-4"
        >
          決定
        </button>
      </div>
    </div>
  );

};

export default NewBucketModal;
