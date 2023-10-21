import React, { ReactNode } from 'react';

interface CustomIconButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

const CustomIconButton: React.FC<CustomIconButtonProps> = ({ children, onClick, className }) => {
  return (
    <button 
      type = "button"
      onClick={ onClick }
      className={ `h-12 w-12 text-white font-bold rounded-xl z-2 ${className}` }
    >
      {children}
    </button>
  );
}

export default CustomIconButton;
