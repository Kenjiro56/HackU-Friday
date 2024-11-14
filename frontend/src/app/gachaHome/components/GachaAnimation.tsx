import React, { useState, useEffect }  from 'react';

const GachaAnimation: React.FC = () => {
  const [timestamp, setTimestamp] = useState(Date.now());
  useEffect(() => {
    setTimestamp(Date.now());
  }, []);

  const playSound = () => {
    const audio = new Audio("/sounds/gachaSE.mp3");
    audio.play();
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex space-x-4 max-w-xs mx-auto px-4">
      <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="flex bg-white rounded-[30px] border-2 border-black relative justify-center items-center p-4">
          <img src={`gachaAnimation.gif?${timestamp}`} alt="Loading animation"/>
          { playSound() }
        </div>
      </div>
    </div>
  );
};
export default GachaAnimation;
