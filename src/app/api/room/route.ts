import { PrismaClient } from '@prisma/client';
import { Response } from 'express';
import { NextResponse } from 'next/server';
// import prisma from '../../../../prisma';

const prisma = new PrismaClient();

export async function main() {
  try {
    await prisma.$connect();
  } catch (error) {
    console.error(error);
    throw new Error("DB接続に失敗しました");
  }
};

// 全部屋の情報の取得
export const GET = async (req: Request, res: NextResponse) => {
  try {
    await main();
    const rooms = await prisma.room.findMany();
    return NextResponse.json({ message: "Success", rooms }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

// 全部屋の情報の更新
export const PUT = async (req: Request, res: NextResponse) => {
  try {
    const roomsData = await req.json();
    
    await main();

    for (const roomID in roomsData) {
      if (roomsData.hasOwnProperty(roomID)) {
        const roomData = roomsData[roomID];
        await prisma.room.update({
          where: { id: parseInt(roomID) },
          data: {
            company: roomData.company,
            reserveAdultsCount: roomData.reserveAdultsCount,
            reserveChildrenCount: roomData.reserveChildrenCount,
            scheduledArrival: roomData.scheduledArrival,
          },
        });
      }
    }

    return NextResponse.json({ message: "Success", roomsData }, { status: 200 });
  } catch (error) {
    console.error("Error in PUT method:", error);  // エラーの詳細をログに出力
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};