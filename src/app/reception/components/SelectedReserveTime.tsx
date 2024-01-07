import React, { useEffect, useRef } from 'react';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { MultiSectionDigitalClock } from '@mui/x-date-pickers/MultiSectionDigitalClock';
import dayjs, { Dayjs } from 'dayjs';
import { RoomType } from '../../../../types/types';
import { convertUTCToJST } from '@/app/utils/utils';
import { borderBlueCSS, receptionEditCSS } from '@/app/utils/style';

interface SelectReserveTimeProps {
  roomId: number;
  handleInputChange: (roomId: number, key: keyof RoomType, value: any) => void;
  defaultTime?: Date;
}

export const SelectReserveTime: React.FC<SelectReserveTimeProps> = ({ roomId, handleInputChange, defaultTime }) => {
  const [value, setValue] = React.useState<Dayjs | null>(null);
  const [isActive, setIsActive] = React.useState<boolean>(false);
  const clockRef = useRef<HTMLDivElement>(null);

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
    if (newValue) {
      handleInputChange(roomId, "scheduledArrival", convertUTCToJST(newValue));
    }
  };

  const defaultTimeDayjs = defaultTime ? dayjs(defaultTime) : null;

  const handleClockClick = (e: any) => {
    e.stopPropagation();
    setIsActive(true);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (clockRef.current && !clockRef.current.contains(e.target as Node)) {
      setIsActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, []);

  return (
    <div>
      <div ref={ clockRef } onClick={ handleClockClick } className='mt-2'>
        <DemoItem>
          <MultiSectionDigitalClock
            defaultValue={ defaultTimeDayjs }
            value={ value }
            onChange={ handleChange }
            className={`
              ${ receptionEditCSS.number } ${borderBlueCSS}
              ${isActive ? "h-40 text-center z-10 bg-gray-100" : "h-12 overflow-hidden text-center" } 
            `}
            ampm={ false }
            />
        </DemoItem>
      </div>
    </div>
  );
};

export default SelectReserveTime;


