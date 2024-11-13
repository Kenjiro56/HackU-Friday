import React from 'react';

interface BucketItem{
  item_id: number;
  user_id: number;
  bucket_title: string;
  time_id: number;
  loop_flag: boolean;
  description: string;
}

const Card: React.FC<BucketItem> = ({ item_id, bucket_title, time_id }) => {
  return (
    <div className={`flex items-center justify-between p-2 rounded-full border-2 my-2 w-[312px] border-2 border-black ${
      time_id === 0 ? 'bg-[#fcc605]' :
      time_id === 1 ? 'bg-[#6cb9ff]' :
      time_id === 2 ? 'bg-[#fc842e]' :
      'bg-[#fcc605]'
    }`}>
      <span className="text-black font-bold pl-2">{bucket_title}</span>
      <button>
       <svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 30.3586C23.2843 30.3586 30 23.6429 30 15.3586C30 7.07437 23.2843 0.358643 15 0.358643C6.71573 0.358643 0 7.07437 0 15.3586C0 23.6429 6.71573 30.3586 15 30.3586Z" fill="#111111"/>
          <path d="M21.3806 10.968C21.7771 10.5716 21.9999 10.0338 22 9.47312C22.0001 8.91239 21.7774 8.37461 21.381 7.97807C20.9845 7.58153 20.4468 7.35871 19.8861 7.35864C19.3254 7.35857 18.7876 7.58125 18.3911 7.97769L8.38146 17.9897C8.20733 18.1633 8.07855 18.3771 8.00646 18.6122L7.0157 21.8763C6.99632 21.9411 6.99485 22.01 7.01146 22.0757C7.02808 22.1413 7.06214 22.2012 7.11005 22.249C7.15796 22.2969 7.21792 22.3308 7.28357 22.3473C7.34923 22.3638 7.41812 22.3623 7.48296 22.3428L10.7477 21.3527C10.9826 21.2813 11.1964 21.1533 11.3702 20.98L21.3806 10.968Z" stroke="#F5F5F5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16.7061 10.0057L19.3531 12.6528" stroke="#F5F5F5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}

export default Card;
