import prisma from "../../../../prisma";
import { NextRequest, NextResponse } from "next/server";
import { genericGET, genericPOST, main } from "../utils/utils";

// 全到着情報の取得
export const GET = (req: NextRequest, res: NextResponse) => {
  return genericGET(req, res, () => prisma.arrival.findMany({
    include: { room: true },
    orderBy: { id: "asc" },
  }), "arrival");
}

export const POST = async (req: NextRequest, res: NextResponse) => {
  return genericPOST(req, res, (data) => {
    return prisma.arrival.create({
      data: {
        roomId: data.roomId,
        adultsCount: data.adultsCount,
        childrenCount: data.childrenCount,
      }
    });
  }, "arrival");
};