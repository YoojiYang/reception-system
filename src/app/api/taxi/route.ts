import { NextRequest, NextResponse } from "next/server";
import { genericGET, genericPOST } from "../utils/utils";
import prisma from "../../../../prisma";

export const GET = (req: NextRequest, res: NextResponse) => {
  return genericGET(req, res, () => prisma.taxi.findMany({
    include: { room: true },
    orderBy: { id: "asc" },
  }), "taxi");
}

export const POST = async (req: NextRequest, res: NextResponse) => {

  return genericPOST(req, res, (data) => {
    return prisma.taxi.create({
      data: {
        id: data.id,
        peopleCount: data.peopleCount,  
        reservationTime: data.reservationTime,
        afterEvent: data.afterEvent,
        taxiCompany: data.taxiCompany,
        memo: data.memo,
        isCompleted: data.isCompleted,
        isCancel: data.isCancel,
        roomId: data.roomId,
        section: data.section,
        column: data.column,
        index: data.index,
      }
    });
  }, "taxi");
};