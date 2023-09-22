// import { Response } from 'express';
import { NextResponse } from 'next/server';
import { main } from '../../room/route';
import prisma from '../../../../../prisma';

// 各部屋情報の取得
export const GET = async (req: Request, res: NextResponse) => {
  try {
    const id: number = parseInt(req.url.split("/room/")[1]);
    await main();

    const room = await prisma.room.findFirst({ where: { id }});

    if (!room) {
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Success", room }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};


// 各部屋情報の更新
export const PUT = async (req: Request, res: NextResponse) => {
  try {
    const id: number = parseInt(req.url.split("/room/")[1]);
    // const requestBody = await req.json();
    
    const {
      company,
      reserveAdultsCount,
      reserveChildrenCount,
      scheduledArrival,
    } = await req.json();
    
    await main();

    const room = await prisma.room.update({
      data: {
        company,
        reserveAdultsCount,
        reserveChildrenCount,
        scheduledArrival,
      },
      where: { id },
    });

    return NextResponse.json({ message: "Success", room }, { status: 200 });
  } catch (error) {
    console.error("Error in PUT method:", error);  // エラーの詳細をログに出力
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};