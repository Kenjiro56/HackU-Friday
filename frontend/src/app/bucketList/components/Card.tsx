import React from 'react';

interface BucketItem{
  id: number;
  user_id: number;
  bucket_title: string;
  time_id: number;
  loop_flag: boolean;
  description: string;
}

const Card: React.FC<BucketItem> = ({ id, bucket_title, time_id }) => {
  return (
    <div className="card">
      <h2>{bucket_title}</h2>
    </div>
  );
}

export default Card;
