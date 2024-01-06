// https://mui.com/material-ui/react-checkbox/
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

interface CheckBoxProps {
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAfterEvent: React.Dispatch<React.SetStateAction<boolean>>;
}


export const IsAfterEventCheckBox: React.FC<CheckBoxProps> = ({ checked, setChecked, setIsAfterEvent }) => {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  React.useEffect(() => {
    setIsAfterEvent(checked);
  }, [checked, setIsAfterEvent]);

  return (
    <div>
      <Checkbox
        {...label}
        checked={checked}
        onChange={ handleChange }
      />
    </div>
  );
}