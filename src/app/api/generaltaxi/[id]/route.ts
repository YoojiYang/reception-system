import { NextResponse } from 'next/server';
import prisma from '../../../../../prisma';
import { main } from '@/app/utils/utils';
import { cors } from '@/app/lib/cors';

// 各予約情報の取得
export const GET = async (req: Request, res: NextResponse) => {
  cors(req, res);
  try {
    const id: number = parseInt(req.url.split("/generaltaxi/")[1]);
    await main();
    const generalTaxi = await prisma.generalTaxi.findMany({ 
      where: { id },
      include: {
        taxi: true,
      },
    });

    return NextResponse.json({message: "Success", generalTaxi }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};


// タクシーの各予約情報の更新
export const PUT = async (req: Request, res: NextResponse) => {
  cors(req, res);
  try {
    const id: number = parseInt(req.url.split("/generaltaxi/")[1]);
    
    const requestBody = await req.json();

    const {
      section,
      column,
      index,
      peopleCount,
      carCount,
      reservationTime,
    } = requestBody;

    await main();

    const generalTaxi = await prisma.generalTaxi.update({
      data: {
        section,
        column,
        index,
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
    return NextResponse.json({ message: "Success", generalTaxi }, { status: 200 });
  } catch (error) {
    console.error("Error in PUT method:", error);  // エラーの詳細をログに出力
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

// タクシーの各予約情報の削除
export const DELETE = async (req: Request, res: NextResponse) => {
  cors(req, res);
  try {
    const id: number = parseInt(req.url.split("/generaltaxi/")[1]);

    await main();

    const generalTaxi = await prisma.generalTaxi.findUnique({
      where: { id },
      select: {
        taxiId: true,
      }
    });
    if (!generalTaxi || !generalTaxi.taxiId) {
      return NextResponse.json({ message: "Taxi not found for the given generalTaxi ID", error: "No such taxi" }, { status: 404 });
    }

    await prisma.taxi.delete({
      where: { id: generalTaxi.taxiId },
    });

    return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });

  } catch (error) {
    console.error("Error in DELETE method:", error);  // エラーの詳細をログに出力
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
