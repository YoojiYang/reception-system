import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../../prisma';
import { genericGET, genericPUT, main, taxiDELETE } from '../../utils/utils';

// 各予約情報の取得
export const GET = async (req: NextRequest, res: NextResponse) => {
  const id: number = parseInt(req.url.split("/viptaxi/")[1]);

  return genericGET(req, res, () => prisma.vipTaxi.findMany({
    where: { id },
    include: {
      taxi: true,
      room: true,
    },
    orderBy: { id: "asc" },
  }), "viptaxi");
};

// タクシーの各予約情報の更新
export const PUT = async (req: NextRequest, res: NextResponse) => {
  return genericPUT(req, res, async (id, data) => {
    return await prisma.vipTaxi.update({
      data: {
        taxi: {
          update: {
            peopleCount: data.peopleCount,
            carCount: data.carCount,
            reservationTime: data.reservationTime,
          }
        }
      },
      where: { id },
    });
  }, "viptaxi");
};


export const DELETE = async (req: NextRequest, res: NextResponse) => {
  return taxiDELETE(req, res,
    async (id) => {
      const vipTaxiRecord = await prisma.vipTaxi.findUnique({
        where: { id },
        select: {
          taxiId: true,
        }
      });
      return vipTaxiRecord;
    },
    async (taxiId) => {
      if (!taxiId) {
        throw new Error("taxiId is not defined");
      }
      return await prisma.taxi.delete({
        where: { id: taxiId },
      });
    },
    "viptaxi"
  );
};
