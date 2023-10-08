import { useRef } from "react";
import { ModalProps } from "../../../../types/types";

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, children }) => {
  const modalContentRef = useRef<HTMLDivElement | null>(null);
  
  if (!isVisible) return null;

  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!modalContentRef.current?.contains(event.target as Node)) {
      onClose();
    }
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-screen" onClick={ handleOutsideClick }>
      <div className="fixed top-60 left-40 bg-blue-300/50 w-4/5 rounded-xl items-center justify-center z-10">
        <div 
          ref={ modalContentRef }
          className="bg-blue-50/90 p-10 m-12 h-auto rounded-xl overflow-y-auto"
          >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
