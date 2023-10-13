'use client'

import React, { Dispatch, SetStateAction, useState } from "react";
import { RoomType } from "../../types/types";
import ReserveList from "./reception/components/ReserveList";

export default function Home() {
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [editing, setEditing] = useState<boolean>(false); // 編集画面かどうかを判断するためのstate

  const fetchRooms = async (setRooms: Dispatch<SetStateAction<RoomType[]>>) => {
    try {
      const fetchedRooms = await fetchAllData("rooms");
      setRooms(fetchedRooms);
    } catch (error) {
    }
  };

  async function fetchAllData(route: string) {
    // console.log(`Fetching data from: ${API_URL}api/${route}`);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/${route}`, {
        cache: 'no-store',
      });
  
      // レスポンスステータスの確認
      console.log(`Response status: ${res.status} ${res.statusText}`);
  
      const json = await res.json();
  
      // レスポンスボディ全体の確認
      console.log('Response body:', json);
  
      console.log(json[route]);
  
      return json[route];
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  }
  
  

  function test() {
    fetchRooms(setRooms);
  }

  const route = "rooms";

  return (
    <div>
      <h1>hello, world</h1>
      <p>{ `${process.env.NEXT_PUBLIC_API_HOST}/api/${route}` }</p>
      <button onClick={ () => fetchRooms(setRooms) }>テスト</button>
      <div>
        <p>
        rooms: {rooms[0]?.name}
        </p>
        <p>
        rooms: {rooms[0]?.company}
        </p>
        <p>
        rooms: {rooms[0]?.reserveAdultsCount}
        </p>
      </div>
    </div>
  )


}
