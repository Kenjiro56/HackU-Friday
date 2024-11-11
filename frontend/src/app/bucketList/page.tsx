'use client';
import React, { useState, useEffect } from 'react';
import NewBucketModal from './components/NewBucketModal';


const buckerListView: React.FC = () => {
  const [bucketItems, setBucketItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const userId = 1; //あとで変更できるようにする
  useEffect(() => {
    const fetchBucketItems = async () =>{
      try{
        const response = await fetch(`http://localhost:8080/bucketls/getAll/${userId}`);
        const data = await response.json();
        setBucketItems(data);
      } catch (error) {
        console.error('バケットリストの取得に失敗しました:', error);
      }finally{
        setLoading(false);
      }
    };
    fetchBucketItems();
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
                <li key={item.id}>{item.bucket_title}
                <button
                  onClick={() => handleEditClick(item.id)}

                >Edit</button>
                </li>
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
