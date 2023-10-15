import React from 'react';
import AddIcon from '@mui/icons-material/Add';

type IncrementButtonProps = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  incrementValue?: number;
  className?: string;
};

const IncrementButton: React.FC<IncrementButtonProps> = ({ count, setCount, incrementValue = 1, className }) => {
  return (
    <button
      className={`h-12 w-12 text-xl bg-blue-500 hover:bg-blue-700 text-white rounded-2xl ${className}`}
      onClick={(e) => {
        e.preventDefault();
        setCount(count + incrementValue);
      }}
    >
      <AddIcon />
    </button>
  );
};

export default IncrementButton;