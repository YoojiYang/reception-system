import { NextRequest, NextResponse } from "next/server";
import { genericDELETE, genericGET, genericPUT } from "../../utils/utils";

// 各部屋情報の取得
export const GET = async (req: NextRequest, res: NextResponse) => {
  const roomId: number = parseInt(req.url.split("/taxi/")[1]);

  return genericGET(req, res, () => prisma.taxi.findMany({
    where: { roomId },
    orderBy: { id: "asc" },
  }), "taxi");
};


export const PUT = async (req: NextRequest, res: NextResponse) => {
  return genericPUT(req, res, async (id, data) => {
    return await prisma.taxi.update({
      data: {
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
      },
      where: { id },
    });
  }, "taxi");
};

export const DELETE = async (req: NextRequest, res: NextResponse) => {
  return genericDELETE(req, res,
    async (id) => {
      return await prisma.taxi.delete({
        where: { id },
      });
    },
    "taxi"
  );
}
