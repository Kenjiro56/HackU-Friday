import React from 'react';

interface Props {
  onClick: () => void;
}

const AddButton: React.FC<Props> = (props) => {
  return (
    <button
      onClick={props.onClick}
      style={{
        position: 'fixed',
        right: '20px',
        bottom: '20px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: 'black',
        color: 'white',
        fontSize: '24px',
        border: 'none',
        cursor: 'pointer',
    }}
  >
    +
</button>
  );
}

export default AddButton;
