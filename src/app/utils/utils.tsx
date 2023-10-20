import { ArrivalRecordCounts, ArrivalType, GeneralTaxiData, GeneralTaxiType, HandleEditDataProps, RoomType } from "../../../types/types";
import { Dispatch, SetStateAction } from "react";


export function formatTimeToJTV(isoDateString: Date) {
  const date = new Date(isoDateString);
  let hours = date.getUTCHours() + 9; // 日本時間に変換
  if (hours >= 24) {
    hours -= 24;
  }
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  return `${String(hours).padStart(2, '0')}:${minutes}`;
}

export function formatTime(isoDateString: Date) {
  const date = new Date(isoDateString);
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  
  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  // CRUDメソッド
  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  
export async function fetchAllData(route: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/${route}`, {
  cache: 'no-store',
  });
  
  const json = await res.json()
  return json[route];
}

export async function postData(route: string, data: Record<string, any>) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/${route}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });  
  const json = await res.json()
  return json[route];
}

export async function updateData(route: string, data: Record<string, any>, id?: number) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/${route}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });  
    
    const json = await res.json()

    if (!res.ok) {
      throw new Error(json.message || `Failed to update ${route} .`);
    }
  }catch (error) {
    console.log(`Error updating ${route}:`, error);
  }
}



export async function handleEditData(props: HandleEditDataProps){
  const { route, data, editingId, onSuccess, onError } = props;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/${route}/${editingId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const responseData = await res.json();
  
  if (!res.ok) {
    throw new Error(responseData.message || "Failed to update data.");
  }
  
  if (onSuccess) {
    onSuccess(responseData);
  }
  
  } catch (error) {
    console.log(`Error updating ${route}:`, error);
    if (onError) {
      onError(error);
    }
  }
}


export function setRoomsMap(rooms: RoomType[]) {
  const roomsMap: Record<number, RoomType> = {};
  rooms.forEach(room => {
    roomsMap[room.id] = room;
  });
  return roomsMap;
}

// 情報の更新
export function deepEqual(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) return true;

  if (typeof obj1 !== "object" || obj1 === null || typeof obj2 !== "object" || obj2 === null) return false;

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (let key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) return false;
  }

  return true;
}

export async function handleEditReserveList(
  editedRooms: Record<number, RoomType>,
  rooms: RoomType[],
  onSuccess: (response: any) => void,
  onError: (error: any) => void
  ) {
    const roomsMap = setRoomsMap(rooms);
    
    const changes: Record<number, RoomType> = {};
    for (const id in editedRooms) {
      const originalRoom = roomsMap[parseInt(id)];
      if (originalRoom && !deepEqual(editedRooms[id], originalRoom)) {
        changes[id] = editedRooms[id];
      }
    }
  if (Object.keys(changes).length === 0) {
    console.log('No changes detected.');
    return;
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/rooms`, {
      method: 'PUT',
      body: JSON.stringify(changes),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const responseData = await res.json();
    if (!res.ok) {
      throw new Error(responseData.message || "Failed to update rooms.");
    }
    onSuccess(responseData);
  } catch (error) {
    onError(error); 
  }
}


export async function handleReserveCountChangeUpdate(
  selectedRoom: RoomType | undefined,
  changeAdultsCount: number,
  changeChildrenCount: number,
  onSuccess: (response: any) => void,
  onError: (error: any) => void
) {
  if (!selectedRoom) {
    console.error("Room not found.");
    return;
  }

  const updatedRoom = {
    ...selectedRoom,
    changedAdultsCount: selectedRoom.changedAdultsCount + changeAdultsCount,
    changedChildrenCount: selectedRoom.changedChildrenCount + changeChildrenCount,
  };

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/rooms/${selectedRoom.id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedRoom),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const responseData = await res.json();
    if (!res.ok) {
      throw new Error(responseData.message || "Failed to update room.");
    }
    onSuccess(responseData);
  } catch (error) {
    onError(error);
  }
}

export async function updateTaxi(
  route: string,
  data: {
    peopleCount: number,
    carCount: number,
    section?: number,
    column?: number,
    index?: number,
    reservationTime?: string,
  },
  editingTaxiId: number,
) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/${route}/${editingTaxiId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    const responseData = await res.json();

    if (!res.ok) {
      throw new Error(responseData.message || "Failed to update taxi .");
    }

  } catch (error) {
    console.log("Error updating taxi;", error);
  }
}




// DELETEメソッド

export const deleteGeneralTaxi = async (id: number) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/generaltaxi/${id}`, {
      method: 'DELETE',
    });
    const responseData = await res.json();
    if (!res.ok) {
      throw new Error(responseData.message || "Failed to delete taxi.");
    }
    return responseData;
  } catch (error) {
    console.error("Error deleting taxi:", error);
    throw error;
  }
};

export const deleteData = async (route: string, id: number) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/${route}/${id}`, {
      method: 'DELETE',
    });
    const responseData = await res.json();
    if (!res.ok) {
      throw new Error(responseData.message || `Failed to delete ${route}.`);
    }
    return responseData;
  } catch (error) {
    console.error(`Error deleting ${route}:`, error);
    throw error;
  }
};

export async function deleteVipTaxi (
  route: string,
  id: number,
  ) {
    console.log(route);
    console.log(id);
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/${route}/${id}`, {
      method: 'DELETE',
    });
    const responseData = await res.json();
    if (!res.ok) {
      throw new Error(responseData.message || "Failed to delete taxi.");
    }
    return responseData;
  } catch (error) {
    console.error("Error deleting taxi:", error);
    throw error;
  }
};


// ========================================================
// handle関数
// ========================================================
export function handleSetIdModalOpen (
  id: number,
  setCurrentId: (id: number) => void,
  setIsModalOpen: (isOpen: boolean) => void
  ) {
  setCurrentId(id);
  setIsModalOpen(true);
};

export async function handleTaxiDelete (
  taxiId: number,
  deleteTaxi: (taxiId: number) => Promise<void>,
  fetchTaxis: (setTaxis: Dispatch<SetStateAction<GeneralTaxiType[]>>) => Promise<void>,
  setTaxis: Dispatch<SetStateAction<GeneralTaxiType[]>>
  ) {
  try {
    await deleteTaxi(taxiId);
    fetchTaxis(setTaxis);
  } catch (error) {
    console.error("Failed to delete taxi:", error);
  }
};


export const createOptionsArray = (start: number, end: number) => {
  const options = [];
  for (let i = start; i <= end; i++) {
    options.push({ value: i, label: i.toString() });
  }
  return options;
}



// taxi
export const fetchGeneralTaxis = async (setGeneralTaxis: Dispatch<SetStateAction<GeneralTaxiType[]>>) => {
  try {
    const fetchedGeneraltaxis = await fetchAllData("generaltaxi");
    setGeneralTaxis(fetchedGeneraltaxis);
  } catch (error) {
    console.error(error);
  }
};

