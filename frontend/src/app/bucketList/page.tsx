'use client';
import React, { useState, useEffect } from 'react';


const buckerListView: React.FC = () => {
  const [bucketItems, setBucketItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
    return (
        <div>
          {loading ? (
            <p>読み込み中...</p>
          ):(
            <ul>
              {bucketItems.map((item) => (
                <li key={item.id}>{item.bucket_title}</li>
              ))}
            </ul>
          )}
        </div>
    );
};

export default buckerListView;
