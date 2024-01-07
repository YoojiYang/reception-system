import { NextRequest, NextResponse } from "next/server";
import { genericGET, genericPOST } from "../utils/utils";
import prisma from "../../../../prisma";

// 全到着情報の取得
export const GET = (req: NextRequest, res: NextResponse) => {
  return genericGET(req, res, () => prisma.arrival.findMany({
    include: {
      room: {
        include: {
          inCharges: {
            include: {
              inCharge: true,
            },
          },
        },
      },
    },
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