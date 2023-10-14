import { NextRequest, NextResponse } from 'next/server';
import { genericDELETE, genericGET, genericPUT } from '../../utils/utils';
import prisma from '../../../../../prisma';

export const GET = async (req: NextRequest, res: NextResponse) => {
  const id: number = parseInt(req.url.split("/generaltaxi/")[1]);

  return genericGET(req, res, () => prisma.generalTaxi.findMany({
    where: { id },
    include: { taxi: true },
    orderBy: { id: "asc" },
  }), "generaltaxi");
};

export const PUT = async (req: NextRequest, res: NextResponse) => {
  return genericPUT(req, res,
    async (id, data) => {
      const generalTaxiRecord = await prisma.generalTaxi.findUnique({
        where: { id },
        select: {
          taxiId: true,
        }
      });

      if (!generalTaxiRecord || !generalTaxiRecord.taxiId) {
        throw new Error("taxiId is not defined");
      }

      await prisma.taxi.update({
        where: { id: generalTaxiRecord.taxiId },
        data: {
          peopleCount: data.peopleCount,
          carCount: data.carCount,
          reservationTime: data.reservationTime,
        }
      });

      return await prisma.generalTaxi.update({
        where: { id },
        data: {
          section: data.section,
          column: data.column,
          index: data.index,
        }
      });
    },
    "generaltaxi"
  );
};

export const DELETE = async (req: NextRequest, res: NextResponse) => {
  return genericDELETE(req, res,
    async (id) => {
      const generalTaxiRecord = await prisma.generalTaxi.findUnique({
        where: { id },
        select: {
          taxiId: true,
        }
      });
      return generalTaxiRecord;
    },
    async (taxiId) => {
      if (!taxiId) {
        throw new Error("taxiId is not defined");
      }
      return await prisma.taxi.delete({
        where: { id: taxiId },
      });
    },
    "generaltaxi"
  );
};