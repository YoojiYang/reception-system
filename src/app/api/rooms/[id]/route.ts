import { NextRequest, NextResponse } from 'next/server';
import { genericGET, genericPUT } from '../../utils/utils';
import prisma from '../../../../../prisma';


// 各部屋情報の取得
export const GET = async (req: NextRequest, res: NextResponse) => {
  const id: number = parseInt(req.url.split("/rooms/")[1]);

  return genericGET(req, res, () => prisma.room.findMany({
    where: { id },
    orderBy: { id: "asc" },
  }), "rooms");
};

// 各部屋情報の更新
export const PUT = async (req: NextRequest, res: NextResponse) => {
  return genericPUT(req, res, async (id, data) => {
    return await prisma.room.update({
      data: {
        company: data.company,
        reserveAdultsCount: data.reserveAdultsCount,
        reserveChildrenCount: data.reserveChildrenCount,
        changedAdultsCount: data.changedAdultsCount,
        changedChildrenCount: data.changedChildrenCount,
        scheduledArrival: data.scheduledArrival,
      },
      where: { id },
    });
  }, "rooms");
};
