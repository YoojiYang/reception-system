import { NextResponse } from "next/server";
import prisma from "../../../../prisma";
import { main } from "@/app/utils/utils";

// 全到着情報の取得
export const GET = async (req: Request, res: NextResponse) => {
  try {
    await main();
    const arrivals = await prisma.arrival.findMany({
      include: { room: true },
      orderBy: { id: "asc" },
    });
    return NextResponse.json({ message: "Success", arrivals }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async (req: Request, res: NextResponse) => {
  try {
    const { roomId, adultsCount, childrenCount } = await req.json();
    
    await main();
    
    const arrival = await prisma.arrival.create({ data: { roomId, adultsCount, childrenCount }});
    return NextResponse.json({ message: "Success", arrival }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}