import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma";
import { genericPOST } from "../utils/utils";

export const POST = async (req: NextRequest, res: NextResponse) => { 
  return genericPOST (req, res, async () => {
    await prisma.room.updateMany({
      data: {
        scheduledArrival: null, // DateTime型の場合、nullを設定することで初期化できます
        reserveAdultsCount: 0,
        reserveChildrenCount: 0,
        changedAdultsCount: 0,
        changedChildrenCount: 0,
        taxiReservation: "Unconfirmed",
      }
    });

    await prisma.taxi.deleteMany();
    await prisma.arrival.deleteMany();

    // 2. 連番のIDをリセット (PostgreSQLの場合)
    await prisma.$executeRaw`ALTER SEQUENCE "Taxi_id_seq" RESTART WITH 1;`;
    await prisma.$executeRaw`ALTER SEQUENCE "Arrival_id_seq" RESTART WITH 1;`;
  }, "resetdatabase");
};
