import React from 'react';

interface CustomButtonProps {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ text, onClick, type = "button", className }) => {
  return (
    <button 
      type={type}
      onClick={onClick}
      className={ `bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full z-20 ${className}` }
    >
      {text}
    </button>
  );
}

export default CustomButton;
