import prisma from '../../../../../prisma';
// import { cors } from '@/app/lib/cors';
import { NextApiRequest, NextApiResponse } from 'next';
import { genericGET, genericPUT, main } from '../../utils/utils';
import { NextRequest, NextResponse } from 'next/server';

// 各部屋情報の取得

export const GET = async (req: NextRequest, res: NextResponse) => {
  const roomId: number = parseInt(req.url.split("/arrival/")[1]);

  return genericGET(req, res, () => prisma.arrival.findMany({
    where: { roomId },
    orderBy: { id: "asc" },
  }), "arrival");
};

export const PUT = async (req: NextRequest, res: NextResponse) => {
  return genericPUT(req, res, async (id, data) => {
    return await prisma.arrival.update({
      data: {
        adultsCount: data.adultsCount,
        childrenCount: data.childrenCount,
        arrivalTime: data.arrivalTime,
      },
      where: { id },
    });
  }, "arrival");
};