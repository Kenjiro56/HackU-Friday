import React from 'react';
import Image from 'next/image';

interface Props {
  label: string;
  srcPath: string;
  imgWidth: number;
  imgHeight: number;
}

const GachaThumbnail: React.FC<Props> = ( props ) => {
  return (
    <div className="flex bg-white rounded-[30px] border-2 border-black relative w-[312px] h-[418px] justify-center items-center min-w-full mr-4">
      <div className="absolute top-3 left-3 bg-white text-[#FCC605] text-sm px-3 py-2 rounded-[100px] border-2 border-[#FCC605] w-[84px] h-[42px] flex justify-center items-center">
      { props.label }
      </div>
      <Image src={ props.srcPath } alt={ props.label } width={ props.imgWidth } height={ props.imgHeight } />
    </div>
  );
}

export default GachaThumbnail;
