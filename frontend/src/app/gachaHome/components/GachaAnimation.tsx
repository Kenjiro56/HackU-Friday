import React, { useState, useEffect }  from 'react';
interface GachaAnimationProps {
  time_id: number;
}

const GachaAnimation: React.FC<GachaAnimationProps> = ( {time_id} ) => {
  const [timestamp, setTimestamp] = useState(Date.now());
  useEffect(() => {
    setTimestamp(Date.now());
    { playSound() }
  }, []);

  const playSound = () => {
    const audio = new Audio("/sounds/gachaSE.mp3");
    audio.play();
  };

  const selectGif = () =>{
    switch(time_id){
      case 0:
        return "/gifs/gachaAnimation0.gif";
      case 1:
        return "/gifs/gachaAnimation1.gif";
      case 2:
        return "/gifs/gachaAnimation2.gif";
      default:
        return "/gifs/gachaAnimation0.gif";
    }
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex space-x-4 max-w-xs mx-auto px-4">
      <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="flex bg-white rounded-[30px] border-2 border-black relative justify-center items-center p-4">
          <img src={`${selectGif()}?${timestamp}`} alt="Loading animation"/>
        </div>
      </div>
    </div>
  );
};
export default GachaAnimation;
