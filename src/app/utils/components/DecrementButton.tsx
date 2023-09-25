import React from 'react';

type DecrementButtonProps = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  decrementValue?: number;
  className?: string;
};

const DecrementButton: React.FC<DecrementButtonProps> = ({ count, setCount, decrementValue = 1, className }) => {
  return (
    <button
      className={`text-3xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ${className}`}
      onClick={(e) => {
        e.preventDefault();
        setCount(count - decrementValue);
      }}
    >
      -
    </button>
  );
};

export default DecrementButton;


