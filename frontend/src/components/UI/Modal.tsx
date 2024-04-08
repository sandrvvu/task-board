import React, { ReactNode, MouseEvent, FC } from "react";
import { MdClose } from "react-icons/md";

type ModalProps = {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal: FC<ModalProps> = ({ visible, onClose, children}: ModalProps) => {
  if (!visible) return null;

  const handleOnClose = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className=" bg-white shadow w-fit relative z-100">
        <div className="bg-indigo-400 w-full h-10"></div>
        <button
          onClick={handleOnClose}
          className="text-lg text-gray-800 py-2 px-4 top-1 right-1 absolute"
        >
          <MdClose />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
