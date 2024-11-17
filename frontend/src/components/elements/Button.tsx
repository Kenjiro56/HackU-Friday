import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      className="mt-4 py-3 px-6 bg-black text-white rounded-full shadow-lg mx-auto block z-50"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
export default Button;
