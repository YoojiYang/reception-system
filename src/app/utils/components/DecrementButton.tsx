import React from 'react';
import RemoveIcon from '@mui/icons-material/Remove';

type DecrementButtonProps = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  decrementValue?: number;
  className?: string;
};

const DecrementButton: React.FC<DecrementButtonProps> = ({ count, setCount, decrementValue = 1, className }) => {
  return (
    <button
      className={`h-12 w-12 text-xl bg-blue-500 hover:bg-blue-700 text-white rounded-2xl ${className}`}
      onClick={(e) => {
        e.preventDefault();
        setCount(count - decrementValue);
      }}
    >
      <RemoveIcon />
    </button>
  );
};

export default DecrementButton;


