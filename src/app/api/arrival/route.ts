import prisma from "../../../../prisma";
import { NextRequest, NextResponse } from "next/server";
import { genericGET, main } from "../utils/utils";

// 全到着情報の取得
export const GET = (req: NextRequest, res: NextResponse) => {
  return genericGET(req, res, () => prisma.arrival.findMany({
    include: { room: true },
    orderBy: { id: "asc" },
  }), "arrivals");
}

export const POST = async (req: NextRequest, res: NextResponse) => {
  // cors(req, res);
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