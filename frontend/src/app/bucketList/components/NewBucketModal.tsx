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

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 255) {
      setDescription(value);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button onClick={onClose}>閉じる</button>

        {/* 時間カテゴリボタン */}
        <div>
          <button onClick={() => setTimeId(0)}>短時間</button>
          <button onClick={() => setTimeId(1)}>数時間</button>
          <button onClick={() => setTimeId(2)}>1日</button>
        </div>

        {/* 繰り返しボタン */}
        <div>
          <button onClick={() => setLoopFlag(true)}>繰り返す</button>
          <button onClick={() => setLoopFlag(false)}>一度だけ</button>
        </div>

        {/* やりたいことフォーム */}
        <input
          type="text"
          placeholder="やりたいこと"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          required
        />

        {/* 詳細フォーム */}
        <textarea
          placeholder="詳細 (任意)"
          value={details}
          onChange={handleDescriptionChange}
          maxLength={255}
        ></textarea>
        <p>{255 - details.length} 文字残り</p>

        {/* 決定ボタン */}
        <button onClick={handleSubmit}>決定</button>
      </div>
    </div>
  );

};
