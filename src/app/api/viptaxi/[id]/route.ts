import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../../prisma';
import { genericDELETE, genericGET, genericPUT, main } from '../../utils/utils';

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
        needOrNot: data.needOrNot,
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
  return genericDELETE(req, res,
    async (id) => {
      return await prisma.vipTaxi.findUnique({
        where: { id },
        select: {
          taxiId: true,
        }
      });
    },
    async (taxiId) => {
      return await prisma.vipTaxi.delete({
        where: { id: taxiId },
      });
    },
    "viptaxi"
  );
};