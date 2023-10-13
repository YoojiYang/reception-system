import { NextRequest, NextResponse } from 'next/server';
import { genericGET, main } from '../utils/utils';
import { RoomType } from '../../../../types/types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({ log: ["info"] });

// 全部屋の情報の取得
export const GET = (req: NextRequest, res: NextResponse) => {
  return genericGET(req, res, () => prisma.room.findMany(), "rooms");
}

// 1. updateAllRooms関数の修正
const updateMultipleRooms = async (roomsData: Record<number, RoomType>) => {
  const updatePromises = [];

  for (const roomId in roomsData) {
    const roomData = roomsData[roomId];
    updatePromises.push(
      prisma.room.update({
        where: { id: roomData.id },
        data: {
          company: roomData.company,
          reserveAdultsCount: roomData.reserveAdultsCount,
          reserveChildrenCount: roomData.reserveChildrenCount,
          scheduledArrival: roomData.scheduledArrival,
          // 他のフィールドも必要に応じて追加
        },
      })
    );
  }

  return await Promise.all(updatePromises);
};

// 2. APIエンドポイントの作成
export const PUT = async (req: NextRequest, res: NextResponse) => {
  try {
    await main();
     // req.bodyの内容を文字列として読み取る
    const rawData = await req.text();

    const roomsData: Record<number, RoomType> = JSON.parse(rawData);
    console.log("roomsData:", roomsData);
    const results = await updateMultipleRooms(roomsData);

    return NextResponse.json({ message: "Success", results }, { status: 200 });
  } catch (error) {
    console.error("Error in PUT method for rooms:", error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};
