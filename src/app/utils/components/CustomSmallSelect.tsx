import React from 'react';
import Select, { StylesConfig } from 'react-select';

type CustomSelectProps = {
  options: { value: number; label: string }[];
  name: string;
  value: number;
  onChange: (value: number) => void;
  className?: string;
  styles?: StylesConfig<{ value: number; label: string }, false>;
};

const CustomSmallSelect: React.FC<CustomSelectProps> = ({ options, name, value, onChange, className, styles }) => {
  
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
      name={ name }
      value={ options.find(option => option.value === value) }
      onChange={ handleChange }
      className={ `text-center h-full w-full flex items-center justify-center z-20 ${className} cursor-pointer` }
      styles={ styles }
    />
  );
};

export default CustomSmallSelect;
