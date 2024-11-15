import React from "react";

type ModalProps = {
  onClose: () => void;
  children: React.ReactNode;
  isOpen: boolean;
};

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="bg-white shadow-lg max-w-md w-full z-50 border-2 border-black">
        <button
          className="absolute top-4 right-4 px-4 py-2 bg-black text-white z-50 hover:scale-110"
          onClick={onClose}
        >
          X
        </button>
        {children}
      </div>
      <div className="fixed inset-0 bg-black opacity-50"></div>
    </div>
  );
};

export default Modal;
