'use client'

import React, { Dispatch, SetStateAction, useState } from "react";
import { RoomType } from "../../types/types";
import { fetchAllData } from "./utils/utils";
import { API_URL } from "./utils/config";


export default function Home() {
  const [rooms, setRooms] = useState<RoomType[]>([]);

  const fetchRooms = async (setRooms: Dispatch<SetStateAction<RoomType[]>>) => {
    console.log("fetchRooms")
    try {
      const fetchedRooms = await fetchAllData("rooms");
      setRooms(fetchedRooms);
    } catch (error) {
      console.error(error);
    }
  };

  async function fetchAllData(route: string) {
    // console.log(`Fetching data from: ${API_URL}api/${route}`);
    try {
      // const res = await fetch(`${API_URL}api/${route}`, {
      const res = await fetch(`https://reception-system.vercel.app/api/rooms`, {
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
    console.log("成功")
  }

  return (
    <div>
      <h1>hello, world</h1>
      <button onClick={ () => test() }>データベース接続チェック</button>
      <div>
        { rooms[0]?.name || "no data" }
      </div>
    </div>
  )
}
