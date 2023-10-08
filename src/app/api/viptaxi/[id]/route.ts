import { NextResponse } from 'next/server';
import prisma from '../../../../../prisma';
import { main } from '@/app/utils/utils';

// 各部屋情報の取得
export const GET = async (req: Request, res: NextResponse) => {
  try {
    const id: number = parseInt(req.url.split("/viptaxi/")[1]);
    await main();
    const vipTaxi = await prisma.vipTaxi.findMany({ 
      where: { id },
      include: {
        taxi: true,
        room: true,
      },
    });

    return NextResponse.json({message: "Success", vipTaxi }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};


// タクシーの各予約情報の更新
export const PUT = async (req: Request, res: NextResponse) => {
  
  try {
    const id: number = parseInt(req.url.split("/viptaxi/")[1]);
    
    const requestBody = await req.json();

    const {
      needOrNot,
      column,
      index,
      peopleCount,
      carCount,
      reservationTime,
    } = requestBody;

    console.log("Request body:", requestBody);
    console.log("Parsed ID:", id);

    await main();

    const vipTaxi = await prisma.vipTaxi.update({
      data: {
        needOrNot,
        taxi: {
          update: {
            peopleCount,
            carCount,
            reservationTime,
          }
        }
      },
      where: { id },
    });
    return NextResponse.json({ message: "Success", vipTaxi }, { status: 200 });
  } catch (error) {
    console.error("Error in PUT method:", error);  // エラーの詳細をログに出力
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

// タクシーの各予約情報の削除
export const DELETE = async (req: Request, res: NextResponse) => {
  try {
    const id: number = parseInt(req.url.split("/viptaxi/")[1]);

    await main();

    const vipTaxi = await prisma.vipTaxi.findUnique({
      where: { id },
      select: {
        taxiId: true,
      }
    });
    if (!vipTaxi || !vipTaxi.taxiId) {
      return NextResponse.json({ message: "Taxi not found for the given vipTaxi ID", error: "No such taxi" }, { status: 404 });
    }

    await prisma.taxi.delete({
      where: { id: vipTaxi.taxiId },
    });

    return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });

  } catch (error) {
    console.error("Error in DELETE method:", error);  // エラーの詳細をログに出力
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
