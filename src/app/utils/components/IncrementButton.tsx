import React from 'react';

type IncrementButtonProps = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  incrementValue?: number;
  className?: string;
};

const IncrementButton: React.FC<IncrementButtonProps> = ({ count, setCount, incrementValue = 1, className }) => {
  return (
    <button
      className={`text-3xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ${className}`}
      onClick={(e) => {
        e.preventDefault();
        setCount(count + incrementValue);
      }}
    >
      +
    </button>
  );
};

export default IncrementButton;