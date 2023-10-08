import prisma from "../../../prisma";
import { GeneralTaxiData, GeneralTaxiType, RoomType } from "../../../types/types";
import { API_URL } from "./config";


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

export async function main() {
  try {
    await prisma.$connect();
  } catch (error) {
    console.error(error);
    throw new Error("DB接続に失敗しました");
  }
};


export async function fetchAllRooms() {
  const res = await fetch(`${API_URL}/room`, {
    cache: 'no-store',
  });

  const json = await res.json()
  
  return json.rooms;
}

export async function fetchAllArrivals() {
  const res = await fetch(`${API_URL}/arrival`, {
    cache: 'no-store',
  });

  const json = await res.json()
  
  return json.arrivals;
}

export async function fetchAllGeneralTaxis() {
  const res = await fetch(`${API_URL}/generaltaxi`, {
    cache: 'no-store',
  });

  const json = await res.json()
  
  return json.generalTaxis;
}

export async function fetchAllInCharges() {
  const res = await fetch(`${API_URL}/inCharge`, {
    cache: 'no-store',
  });

  const json = await res.json()
  
  return json.inCharges;
}

export async function fetchArrivalsForRoom(roomId: number) {
  const response = await fetch(`${API_URL}/arrival/${roomId}`);
  const data = await response.json();
  return data;
}

export async function postArrival(roomId: number, adultsCount: number, childrenCount: number) {
  const res = await fetch(`${API_URL}/arrival`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ roomId, adultsCount, childrenCount }),
  });  
  const json = await res.json()
  
  return json.arrival;
}

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


export function setRoomsMap(rooms: RoomType[]) {
  const roomsMap: Record<number, RoomType> = {};
  rooms.forEach(room => {
    roomsMap[room.id] = room;
  });
  return roomsMap;
}


export async function handleEditReserveList(
  editedRooms: Record<number, RoomType>,
  rooms: RoomType[],
  API_URL: string,
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
    const res = await fetch(`${API_URL}/room`, {
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
  rooms: RoomType[],
  API_URL: string,
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
    const res = await fetch(`${API_URL}/room/${selectedRoom.id}`, {
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

export async function postGeneralTaxi(data: GeneralTaxiData) {
  console.log(data);
  const { section, column, index, peopleCount, carCount } = data;

  const res = await fetch(`${API_URL}/generaltaxi`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ section, column, index, peopleCount, carCount }),
  });  
  const json = await res.json()
  
  return json.generalTaxi;
}

export async function updateGeneralTaxi(
  data: GeneralTaxiData,
  editingTaxiId: number,
) {
  const { section, column, index, peopleCount, carCount } = data;

  try {
    const res = await fetch(`${API_URL}/generaltaxi/${editingTaxiId}`, {
      method: 'PUT',
      body: JSON.stringify({ section, column, index, peopleCount, carCount }),
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


export function handleSetIdModalOpen (
  id: number,
  setCurrentId: (id: number) => void,
  setIsModalOpen: (isOpen: boolean) => void
  ) {
  setCurrentId(id);
  setIsModalOpen(true);
};


export const deleteGeneralTaxi = async (id: number) => {
  try {
    const res = await fetch(`${API_URL}/generaltaxi/${id}`, {
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
