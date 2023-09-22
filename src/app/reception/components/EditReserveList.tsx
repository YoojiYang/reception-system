import { useState, useEffect } from "react";
import { RoomType, InChargeType, EditReserveListProps } from '../../types';
import ReserveIndex from './ReserveIndex';
import { formatTime } from '../../utils/utils';

async function fetchAllRooms() {
  const res = await fetch('http://localhost:3000/api/room', {
    cache: 'no-store',
  });

  const json = await res.json()
  
  return json.rooms;
}

async function fetchAllInCharges() {
  const res = await fetch('http://localhost:3000/api/inCharge', {
    cache: 'no-store',
  });

  const json = await res.json()
  
  return json.inCharges;
}

// function formatTime(isoDateString: string) {
//   const date = new Date(isoDateString);
//   const hours = String(date.getUTCHours()).padStart(2, '0');
//   const minutes = String(date.getUTCMinutes()).padStart(2, '0');
//   return `${hours}:${minutes}`;
// }



const EditReserveList = ({ setEditing }: EditReserveListProps) => {
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [inCharges, setInCharges] = useState<InChargeType[]>([]);
  const[editedRooms, setEditedRooms] = useState<Record<number, RoomType>>({});
  
  const handleInputChange = (roomId: number, key: keyof RoomType, value: any) => {
    setEditedRooms(prevRooms => ({
      ...prevRooms,
      [roomId]: {
        ...prevRooms[roomId],
        [key]: value
      }
    }));
  };

  const handleRegister = async () => {
    console.log('handleRegister: ', editedRooms);
    try {
      const res = await fetch(`http://localhost:3000/api/room`, {
        method: 'PUT',
        body: JSON.stringify(editedRooms),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const responseData = await res.json();
      console.log("Response from API:", responseData);
      if (!res.ok) {
        throw new Error(responseData.message || "Failed to update rooms.");
      }
      setEditing(false);
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(() => {
    async function loadRooms() {
      try {
        const fetchedRooms = await fetchAllRooms();
        setRooms(fetchedRooms);
      } catch (error) {
        console.error(error);
      }
    }
    loadRooms();
  }, []);

  useEffect(() => {
    async function loadInCharges() {
      try {
        const fetchedInCharges = await fetchAllInCharges();
        setInCharges(fetchedInCharges);
      } catch (error) {
        console.error(error);
      }
    }
    loadInCharges();
  }, []);
  
  useEffect(() => {
    console.log("Edited rooms updated:", editedRooms);
  }, [editedRooms]);
  
  return (
    <div>
        <div className='h-32 flex items-center justify-end'>
          <button
            onClick={ handleRegister }
            className='w-24 py-4 mr-8 rounded-md shadow-md bg-[#fb923c] text-xl'
            >
          登録
          </button>
        </div>
        
        <ReserveIndex />

        {rooms
          .sort((a: RoomType, b: RoomType) => a.id - b.id)
          .map((room: RoomType) => (
          <form key={room.id} className='col-span-8 text-center h-full flex items-center justify-center'>
            <div className='h-12 mt-4 grid grid-cols-9 gap-2 items-center'>
              <p className='text-center h-full flex items-center justify-center'>{ room.name }</p>
                {/* 会社名 */}
                <input
                  type='text'
                  name='company'
                  defaultValue={ room.company }
                  onChange={ (e) => handleInputChange(room.id, 'company', e.target.value) }
                  className='col-span-3 text-center h-full flex items-center justify-center'
                />
                {/* 大人の人数 */}
                <input
                  type='number'
                  name='adultsCount'
                  defaultValue={ room.reserveAdultsCount }
                  onChange={ (e) => handleInputChange(room.id, 'reserveAdultsCount', parseInt(e.target.value)) }
                  className='text-center h-full flex items-center justify-center'
                />
                {/* 子供の予約人数 */}
                <input
                  type='number'
                  name='childrenCount'
                  defaultValue={ room.reserveChildrenCount }
                  onChange={ (e) => handleInputChange(room.id, 'reserveChildrenCount', parseInt(e.target.value)) }
                  className='text-center h-full flex items-center justify-center'
                />
                {/* 到着予定時刻 */}
                <input
                  type='text'
                  name='scheduledArrival'
                  defaultValue={ formatTime(room.scheduledArrival) }
                  onChange={ (e) => {
                    const timeValue = e.target.value;
                    const [hours, minutes] = timeValue.split(':').map(Number);

                    const currentDate = new Date();
                    currentDate.setUTCHours(hours, minutes, 0, 0);
                    const isoString = currentDate.toISOString();

                    handleInputChange(room.id, 'scheduledArrival', isoString);
                  }}
                  className='text-center h-full flex items-center justify-center'
                />
                {/* 担当者 */}
                <select name="inCharge" className='text-center h-full flex items-center justify-center' multiple>
                  {inCharges.map((inCharge: InChargeType) => (
                    <option key={ inCharge.id } value={ inCharge.id }>{ inCharge.name }</option>
                  ))}
                </select>
            </div>
          </form>
        ))}
    </div>
  );
}

export default EditReserveList;