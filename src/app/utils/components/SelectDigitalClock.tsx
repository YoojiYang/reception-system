import React, { Dispatch, SetStateAction } from 'react';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { MultiSectionDigitalClock } from '@mui/x-date-pickers/MultiSectionDigitalClock';
import dayjs, { Dayjs } from 'dayjs';

interface SelectDigitalClockProps {
  setReservationTime: Dispatch<SetStateAction<Dayjs | undefined>>;
}

export const SelectDigitalClock: React.FC<SelectDigitalClockProps> = ({ setReservationTime }) => {
  const [value, setValue] = React.useState<Dayjs | null>(null);

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
    if (newValue) {
      setReservationTime(newValue);
      console.log('newValue', newValue);
    }
  }

  const now = dayjs();
  const currentHour = now.hour();

  // TODO: ここで初期値を設定する
  // 初期値をナイターの場合は21時に、デイゲームの場合は16時に設定
  let defaultValue = now.hour(21).minute(0).toDate();
  if (currentHour >= 4 && currentHour <= 16) {
    defaultValue = now.hour(16).minute(0).toDate();
  }

  return (
    <div className='h-full overflow-hidden'>
      <DemoItem>
        <MultiSectionDigitalClock
          // defaultValue={  }
          value={ value }
          onChange={ handleChange }
          ampm={ false }
        />
      </DemoItem>
    </div>
  );
};

export default SelectDigitalClock;


