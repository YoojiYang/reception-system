import React from 'react';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { MultiSectionDigitalClock } from '@mui/x-date-pickers/MultiSectionDigitalClock';
import dayjs, { Dayjs } from 'dayjs';
import { RoomType } from '../../../../types/types';
import { convertUTCToJST } from '@/app/utils/utils';

interface SelectReserveTimeProps {
  roomId: number;
  handleInputChange: (roomId: number, key: keyof RoomType, value: any) => void;
  defaultTime?: Date;
}

export const SelectReserveTime: React.FC<SelectReserveTimeProps> = ({ roomId, handleInputChange, defaultTime }) => {
  const [value, setValue] = React.useState<Dayjs | null>(null);

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
    if (newValue) {
      handleInputChange(roomId, "scheduledArrival", convertUTCToJST(newValue));
    }
  };

  const defaultTimeDayjs = defaultTime ? dayjs(defaultTime) : null;

  return (
    <div className='h-full overflow-hidden'>
      <DemoItem>
        <MultiSectionDigitalClock
          defaultValue={ defaultTimeDayjs }
          value={ value }
          onChange={ handleChange }
          // renderInput={ (params) => <TextField {...params} /> }
          ampm={ false }
        />
      </DemoItem>
    </div>
  );
};

export default SelectReserveTime;


