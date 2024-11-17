import React from 'react';
import Image from 'next/image';
import decideLabel from '../../../utils/decideLabel';
import timeCategoryAttribute from '../../../constants/timeCategoryAttribute';

interface Props {
  timeCategory: number;
  srcPath: string;
  imgWidth: number;
  imgHeight: number;
}

const GachaThumbnail: React.FC<Props> = ( props ) => {
  const timeAttribute = timeCategoryAttribute[props.timeCategory];
  return (
    <div className="flex bg-white rounded-[30px] border-2 border-black relative w-[312px] h-[418px] justify-center items-center min-w-full mr-4">
      <div className={`absolute top-3 left-3 bg-white text-sm px-3 py-2 rounded-[100px] border-2 w-[84px] h-[42px] flex justify-center items-center
      ${ props.timeCategory === 0 ? 'border-[#fcc605] text-[#fcc605]' :
        props.timeCategory === 1 ? 'border-[#6cb9ff] text-[#6cb9ff]' :
        props.timeCategory === 2 ? 'border-[#fc842e] text-[#fc842e]' :
        'border-[#fcc605] text-[#fcc605]'

      }
      `}>
      { timeAttribute.label }
      </div>
      <Image src={ props.srcPath } alt={ timeAttribute.label } width={ props.imgWidth } height={ props.imgHeight } />
    </div>
  );
}

export default GachaThumbnail;
