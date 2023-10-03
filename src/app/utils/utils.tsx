import prisma from "../../../prisma";
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

