import { NextRequest, NextResponse } from 'next/server';
import { genericGET, main } from '../utils/utils';
import { RoomType } from '../../../../types/types';
import prisma from '../../../../prisma';

// 全部屋の情報の取得
export const GET = (req: NextRequest, res: NextResponse) => {
  return genericGET(
    req,
    res,
    () => prisma.room.findMany({
      include: {
        inCharges: {
          include: {
            inCharge: true
          }
        }
      }
    }),
    "rooms"
    );
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
          taxiReservation: roomData.taxiReservation,
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
    const rawData = await req.text();

    const roomsData: Record<number, RoomType> = JSON.parse(rawData);
    const results = await updateMultipleRooms(roomsData);

    return NextResponse.json({ message: "Success", results }, { status: 200 });
  } catch (error) {
    console.error("Error in PUT method for rooms:", error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};
