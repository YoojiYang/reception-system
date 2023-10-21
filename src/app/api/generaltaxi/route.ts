import { NextRequest, NextResponse } from "next/server";
import { genericGET, genericPOST } from "../utils/utils";
import prisma from "../../../../prisma";


export const GET = (req: NextRequest, res: NextResponse) => {
  return genericGET(req, res, () => prisma.generalTaxi.findMany({
    include: { taxi: true },
    orderBy: { id: "asc" },
  }), "generaltaxi");
}

export const POST = async (req: NextRequest, res: NextResponse) => {
  return genericPOST(req, res, (data) => {
    return prisma.generalTaxi.create({
      data: {
        section: data.section,
        column: data.column,
        index: data.index,
        taxi: {
          create: {
            peopleCount: data.peopleCount,
            carCount: data.carCount,
            reservationTime: data.reservationTime,
          }
        }
      },
      include: {
        taxi: true
      },
    });
  }, "generaltaxi");
};