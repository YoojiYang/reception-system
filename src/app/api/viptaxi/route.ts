import { NextResponse } from "next/server";
import prisma from "../../../../prisma";
import { main } from "@/app/utils/utils";

// VIPタクシー、およびtaxiとroomデータベースからの関連情報取得
export const GET = async (req: Request, res: NextResponse) => {
  try {
    await main();

    const vipTaxis = await prisma.vipTaxi.findMany({
      include: {
        room: true,
        taxi: true,
      },
      orderBy: { id: "asc" },
    });

    return NextResponse.json({ message: "Success", vipTaxis }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async (req: Request, res: NextResponse) => {
  try {
    const { needOrNot, roomId, peopleCount, carCount, reservationTime } = await req.json();
    
    await main();
    
    const createdVipTaxi = await prisma.vipTaxi.create({
      data: {
        needOrNot,
        room: {
          connect: {
            id: roomId
          }
        },
        taxi: {
          create: {
            peopleCount,
            carCount,
            reservationTime, 
          }
        }
      },
      include: {
        taxi: true
      }
    });

    const createdTaxi = createdVipTaxi.taxi;
    
    return NextResponse.json({ message: "Success", taxi: createdTaxi, vipTaxi: createdVipTaxi }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}