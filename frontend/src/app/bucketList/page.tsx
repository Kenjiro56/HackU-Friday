'use client';
import React, { useState, useEffect } from 'react';
import NewBucketModal from './components/NewBucketModal';
import Card from './components/Card';


const buckerListView: React.FC = () => {
  const [bucketItems, setBucketItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const userId = 1; //あとで変更できるようにする
  const dummyData = [
    {
      id: 1,
      user_id: 1,
      bucket_title: 'バケットリスト1',
      time_id: 0,
      loop_flag: false,
      description: 'バケットリスト1の説明',
    },
    {
      id: 2,
      user_id: 1,
      bucket_title: 'バケットリスト2',
      time_id: 3,
      loop_flag: false,
      description: 'バケットリスト1の説明',
    },
    {
      id: 3,
      user_id: 1,
      bucket_title: 'バケットリスト3',
      time_id: 0,
      loop_flag: false,
      description: 'バケットリスト1の説明',
    },
    {
      id: 4,
      user_id: 1,
      bucket_title: 'バケットリスト4',
      time_id: 1,
      loop_flag: false,
      description: 'バケットリスト1の説明',
    },
    {
      id: 5,
      user_id: 1,
      bucket_title: 'バケットリスト5',
      time_id: 2,
      loop_flag: false,
      description: 'バケットリスト1の説明',
    },
    {
      id: 1,
      user_id: 1,
      bucket_title: 'バケットリスト6',
      time_id: 1,
      loop_flag: false,
      description: 'バケットリスト1の説明',
    },
  ];

  useEffect(() => {
    setLoading(false);
    setBucketItems(dummyData);

    // const fetchBucketItems = async () =>{
    //   try{
    //     const response = await fetch(`http://localhost:8080/bucketls/getAll/${userId}`);
    //     const data = await response.json();
    //     setBucketItems(data);
    //   } catch (error) {
    //     console.error('バケットリストの取得に失敗しました:', error);
    //   }finally{
    //     setLoading(false);
    //   }
    // };
    // fetchBucketItems();
  }, []);
  const handleAddClick = () => {
    // 追加ボタンがクリックされたときの処理をここに書きます
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEditClick = (id: number) => {
    console.log('Editボタンがクリックされました', id);
  };
    return (
        <div>
          {loading ? (
            <p>読み込み中...</p>
          ):(
            <ul>
              {bucketItems.map((item) => (
                // <li key={item.id}>{item.bucket_title}
                // <button
                //   onClick={() => handleEditClick(item.id)}

                // >Edit</button>
                // </li>
                <Card id={item.id} bucket_title={item.bucket_title} time_id={item.time_id}/>
              ))}
            </ul>
          )}

          <button
                  onClick={handleAddClick}
                  style={{
                    position: 'fixed',
                    right: '20px',
                    bottom: '20px',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    fontSize: '24px',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  +
            </button>
            {isModalOpen && (
              <NewBucketModal onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default buckerListView;
