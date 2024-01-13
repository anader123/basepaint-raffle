import React from "react";
import Modal from "react-modal";

interface SuccessModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  contentLabel: string;
  message: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onRequestClose,
  contentLabel,
  message,
}) => {
  const customStyles = {
    overlay: {
      className:
        "fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center",
    },
    content: {
      className: "bg-gray-400 p-6 rounded-lg shadow-xl mx-auto my-12 max-w-lg",
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={contentLabel}
      className={customStyles.content.className}
      overlayClassName={customStyles.overlay.className}
    >
      <h2 className="text-xl font-semibold mb-4">{contentLabel}</h2>
      <p className="text-gray-700 mb-4">{message}</p>
      <button
        onClick={onRequestClose}
        className="bg-black hover:opacity-[50%] text-white font-bold py-2 px-4 rounded"
      >
        Close
      </button>
    </Modal>
  );
};
export default SuccessModal;
