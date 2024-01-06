import { NextRequest, NextResponse } from 'next/server';
import { genericDELETE, genericGET, genericPOST, main } from '../utils/utils';
import prisma from '../../../../prisma';
import { RoomInCharge } from '@prisma/client';
import { RoomInChargeType } from '../../../../types/types';


// 全部屋の情報の取得
export const GET = (req: NextRequest, res: NextResponse) => {
  return genericGET(
    req,
    res,
    () => prisma.roomInCharge.findMany(),
    "roomInCharge"
    );
}

export const POST = async (req: NextRequest, res: NextResponse) => {
  return genericPOST(req, res, (data: RoomInChargeType[]) => {
    return prisma.roomInCharge.createMany({
      data: data.map(item => ({
        roomId: item.roomId,
        inChargeId: item.inChargeId,
      }))
    });
  }, "roomInCharge");
};


export const DELETE = async (req: NextRequest, res: NextResponse) => {
  try {
    await main();
    await prisma.roomInCharge.deleteMany();

    return NextResponse.json({ message: "Success" }, { status: 200, headers: { "Access-Control-Allow-Origin": "*" } });
    } catch (error) {
      console.error(`Error in DELETE method for roomInCharge :`, error);
      return NextResponse.json({ message: "Error", error }, { status: 500, headers: { "Access-Control-Allow-Origin": "*" } });
    }
}
