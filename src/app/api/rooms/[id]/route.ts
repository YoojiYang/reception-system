import { NextResponse } from 'next/server';
import prisma from '../../../../../prisma';
import { main } from '@/app/utils/utils';
import { cors } from '@/app/lib/cors';

// 各部屋情報の取得
export const GET = async (req: Request, res: NextResponse) => {
  cors(req, res);
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
  cors(req, res);
  try {
    const id: number = parseInt(req.url.split("/room/")[1]);
    // const requestBody = await req.json();
    
    const {
      company,
      reserveAdultsCount,
      reserveChildrenCount,
      changedAdultsCount,
      changedChildrenCount,
      scheduledArrival,
    } = await req.json();
    
    await main();

    const room = await prisma.room.update({
      data: {
        company,
        reserveAdultsCount,
        reserveChildrenCount,
        changedAdultsCount,
        changedChildrenCount,
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