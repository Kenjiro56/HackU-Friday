import React from 'react';

interface GochaMazeDescProps {
  checked: boolean;
  onChecked: () => void;
  onBtnClick: () => void;
}

const GochaMazeDescContainer: React.FC<GochaMazeDescProps> = ( props ) => {
return (
    <div className="flex items-center space-x-2 justify-center">
      <div className="flex items-center space-x-2 mt-4 justify-center py-3 z-50 bg-[#f8f7f1] px-[16px] py-[10px] rounded-[10px]">
          <button
            className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-xs text-black mr-2 border border-black"
            aria-label="ごちゃ混ぜモードの説明"
            onClick={ props.onBtnClick }
          >
          ?
        </button>
        <span className="text-lg">ごちゃ混ぜモード</span>
        <input type="checkbox" className="toggle-checkbox hidden" id="toggle" checked={ props.checked } onChange={ props.onChecked } />
        <label htmlFor="toggle"
          className={`toggle-label block w-12 h-6 rounded-full cursor-pointer transition-colors ${
            props.checked ? 'bg-black' : 'bg-gray-300'
          }`}>
          <span className={`dot absolute w-6 h-6 bg-white rounded-full transition-transform ${
              props.checked ? 'translate-x-6' : 'translate-x-0'
          }`}></span>
        </label>
      </div>
    </div>
  );
};
export default GochaMazeDescContainer;
