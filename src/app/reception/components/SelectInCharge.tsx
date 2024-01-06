import * as React from 'react';
import { useTheme, Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { fetchInCharge } from '@/app/utils/utils';
import { InChargeType, RoomInChargeType } from '../../../../types/types';
import { useRooms } from '@/app/context/RoomsContext';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface props {
  updateInChargesList: RoomInChargeType[];
  setUpdateInChargesList: React.Dispatch<React.SetStateAction<RoomInChargeType[]>>;
  roomId: number;
}

export default function SelectInCharge({ updateInChargesList, setUpdateInChargesList, roomId }: props) {
  const theme = useTheme();
  const { rooms } = useRooms();
  const [personName, setPersonName] = React.useState<string[]>([]);
  const [inChargesList, setInChargesList] = React.useState<InChargeType[]>([]);


  const handleChange = (event: SelectChangeEvent<string[]>, roomId: number) => {
    const {
      target: { value },
    } = event;

    // 選択された名前を配列に変換
    const selectedNames = typeof value === 'string' ? value.split(',') : value;

    // 選択された名前からidを取得
    const selectedIds = selectedNames.map((name) => {
      const found = inChargesList.find((inCharge) => inCharge.name === name);
      return found ? found.id : null;
    }).filter((id) => id !== null) as number[];

    // DBに登録する形に変換
    const newInChargesForRoom = selectedIds.map(inChargeId => ({
      roomId: roomId,
      inChargeId: inChargeId,
    }));

    const updatedInChargesList = [...updateInChargesList.filter(inCharge => inCharge.roomId !== roomId), ...newInChargesForRoom];

    console.log("updateInChargesList", updatedInChargesList);
    setPersonName(selectedNames);
    setUpdateInChargesList(updatedInChargesList);
  };

  const handleRoomInChargeChage = (roomId: number) => (event: SelectChangeEvent<string[]>) => {
    handleChange(event, roomId);
  }

  React.useEffect(() => {
    fetchInCharge(setInChargesList);

    const currentRoomInCharges = rooms.find(room => room.id === roomId)?.inCharges;

    if (currentRoomInCharges) {
      const roomInChargeList = currentRoomInCharges.map(inCharge => ({
        roomId: roomId,
        inChargeId: inCharge.inChargeId,
      }));
      setUpdateInChargesList(prev => {
        const updatedList = prev.filter(inCharge => inCharge.roomId !== roomId);
        return [...updatedList, ...roomInChargeList];
      });
      
      console.log("roomInChargeList: ",roomInChargeList)
      console.log("updateInChargeList: ",updateInChargesList)

      // 部屋に登録されている担当者の名前を取得
      const inChargeNames = currentRoomInCharges.map(inCharge => inCharge.inCharge?.name || "");
      setPersonName(inChargeNames);
    }
  }, [rooms, roomId]);

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          defaultValue={ personName }
          value={ personName }
          onChange={ handleRoomInChargeChage(roomId) }
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {inChargesList.map((inCharge) => (
            <MenuItem
              key={ inCharge.id }
              value={ inCharge.name }
              style={ getStyles(inCharge.name, personName, theme) }
            >
              { inCharge.name }
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}