import React from 'react';
import Select, { StylesConfig } from 'react-select';

type CustomSelectProps = {
  options: { value: string; label: string }[];
  name: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  styles?: StylesConfig<{ value: string; label: string }, false>;
};

const CustomStringSelect: React.FC<CustomSelectProps> = ({ options, name, value, onChange, className, styles }) => {
  
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
      styles={ styles }
    />
  );
};

export default CustomStringSelect;
