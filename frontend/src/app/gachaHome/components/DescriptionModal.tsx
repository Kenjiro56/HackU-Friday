import React from 'react';

interface ModalProps {
  onClose: () => void;
}



const DescriptionModal: React.FC<ModalProps> = ({ onClose }) => {

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      {/* モーダル本体 */}
      <div className="bg-white rounded-xl p-6 w-80 shadow-lg border-black border-2 z-10 ">
        <h2 className="text-center text-xl font-bold mb-4">ごちゃ混ぜモードって？？</h2>
        <p className="text-center text-sm mb-6">
          じぶん以外のユーザーが追加した<br/>「やりたいこと」をガチャに混ぜて回せるモードのことだよ！<br/>新たなアソビに出会えるかも！？
        </p>
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="py-2 px-6 bg-black text-white rounded-full text-sm"
          >
            とじる
          </button>
        </div>
      </div>
    </div>
  );
};

export default DescriptionModal;
