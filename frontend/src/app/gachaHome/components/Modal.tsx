// Modal.tsx
import React from 'react';

interface ModalProps {
  data: any;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ data, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <button onClick={onClose}>閉じる</button>
        <pre>{JSON.stringify(data, null, 2)}</pre> {/* データをJSON形式で表示 */}
      </div>
    </div>
  );
};

export default Modal;
