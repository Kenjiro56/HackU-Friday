'use client';
import React, { useState, useEffect } from 'react';
import NewBucketModal from './components/NewBucketModal';
import Card from './components/Card';
import AddButton from './components/AddButton';


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

  // 削除する用の関数
  const handleDeleteClick = async (id: number) => {
    try {
      const deleteResponse = await fetch(`http://localhost:8080/bucketls/delete/${id}`, {
        method: 'DELETE',
      });

      if (deleteResponse.ok) {
        console.log(`アイテム ${id} の削除に成功しました`);
      } else {
        console.error('アイテムの削除に失敗しました');
      }
    } catch (error) {
      console.error('アイテムの削除中にエラーが発生しました:', error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddItem = (item: any) => {
    setBucketItems([...bucketItems, item]);
  };

  const handleEditClick = (id: number) => {
    console.log('Editボタンがクリックされました', id);
  };
    return (
        <div className="min-h-screen mt-[300px]">
          {loading ? (
            <p>読み込み中...</p>
          ):(
            <ul>
              {bucketItems.map((item) => (
                <Card key={item.id} item_id={item.id} bucket_title={item.bucket_title} time_id={item.time_id}/>
              ))}
            </ul>
          )}
          <AddButton onClick={handleAddClick}/>
          {isModalOpen &&
            <NewBucketModal onClose={handleCloseModal} onAddItem={handleAddItem}/>
          }
          {/* <button onClick={handleDeleteClick(18)}>削除する</button> */}


        </div>
    );
};

export default buckerListView;
