import React from 'react';
import Select from 'react-select';

type CustomSelectProps = {
  options: { value: number; label: string }[];
  name: string;
  value: number;
  onChange: (value: number) => void;
  className?: string;
};

const CustomSelect: React.FC<CustomSelectProps> = ({ options, name, value, onChange, className }) => {
  
  const handleChange = (selectedOption: any) => {
    if (selectedOption) {
      onChange(selectedOption.value);
    } else {
      onChange(options[0].value);
    }
  };

  return (
    <Select
      options={ options }
      isClearable={ true }
      name={ name }
      value={ options.find(option => option.value === value) }
      onChange={ handleChange }
      className={ `text-center h-full w-full flex items-center justify-center text-xl bg-inherit z-30 ${className}` }
    />
  );
};

export default CustomSelect;
