import { NextResponse } from "next/server";
import prisma from "../../../../prisma";
import { main } from "@/app/utils/utils";
import { cors } from "@/app/lib/cors";

// VIPタクシーの全情報の取得
export const GET = async (req: Request, res: NextResponse) => {
  cors(req, res);
  try {
    await main();

    const generalTaxis = await prisma.generalTaxi.findMany({
      include: {
        taxi: true,
      },
      orderBy: { id: "asc" },
    });

    return NextResponse.json({ message: "Success", generalTaxis }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async (req: Request, res: NextResponse) => {
  cors(req, res);
  try {
    const { section, column, index, peopleCount, carCount, reservationTime } = await req.json();
    
    await main();
    
    const createdGeneralTaxi = await prisma.generalTaxi.create({
      data: {
        section,
        column,
        index,
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

    const createdTaxi = createdGeneralTaxi.taxi;
    
    return NextResponse.json({ message: "Success", taxi: createdTaxi, generalTaxi: createdGeneralTaxi }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}