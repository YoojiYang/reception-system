import { NextResponse } from 'next/server';
import prisma from '../../../../../prisma';
import { main } from '@/app/utils/utils';
import { cors } from '@/app/lib/cors';

// 各部屋情報の取得
export const GET = async (req: Request, res: NextResponse) => {
  cors(req, res);
  try {
    const roomId: number = parseInt(req.url.split("/arrival/")[1]);
    await main();
    const arrival = await prisma.arrival.findMany({ where: { roomId }});

    const totalAdultsCount = arrival.reduce((acc, cur) => acc + cur.adultsCount, 0);
    const totalChildrenCount = arrival.reduce((acc, cur) => acc + cur.childrenCount, 0);
    const totalCount = totalAdultsCount + totalChildrenCount;

    return NextResponse.json({
      message: "Success",
      arrival,
      totalAdultsCount,
      totalChildrenCount,
      totalCount,
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};


// 到着情報の更新
export const PUT = async (req: Request, res: NextResponse) => {
  cors(req, res);
  try {
    const id: number = parseInt(req.url.split("/arrival/")[1]);
    const requestBody = await req.json();
    
    const {
      adultsCount, 
      childrenCount,
      arrivalTime,
    } = requestBody;
    
    await main();
    const arrival = await prisma.arrival.update({
      data: {
        adultsCount,
        childrenCount,
        arrivalTime,
      },
      where: { id },
    });
    return NextResponse.json({ message: "Success", arrival }, { status: 200 });
  } catch (error) {
    console.error("Error in PUT method:", error);  // エラーの詳細をログに出力
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};