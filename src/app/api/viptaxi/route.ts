import prisma from "../../../../prisma";
import { NextRequest, NextResponse } from "next/server";
import { genericGET, genericPOST, main } from "../utils/utils";


export const GET = (req: NextRequest, res: NextResponse) => {
  return genericGET(req, res, () => prisma.vipTaxi.findMany({
    include: { room: true, taxi: true, },
    orderBy: { id: "asc" },
  }), "viptaxis");
}


export const POST = async (req: NextRequest, res: NextResponse) => {
  return genericPOST(req, res, (data) => {
    return prisma.vipTaxi.create({
      data: {
        needOrNot: data.needOrNot,
        room: {
          connect: {
            id: data.roomId,
          }
        },
        taxi: {
          create: {
            peopleCount: data.peopleCount,
            carCount: data.carCount,
            reservationTime: data.reservationTime,
          }
        }
      }
    });
  }, "viptaxis");
};