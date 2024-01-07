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

const CustomSelect: React.FC<CustomSelectProps> = ({ options, name, value, onChange, className, styles }) => {
  
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
      className={ `text-center flex items-center justify-center z-30 ${className} cursor-pointer` }
      styles={ styles }
    />
  );
};

export default CustomSelect;
