import { NextRequest, NextResponse } from "next/server";
import { genericGET, main } from "../utils/utils";
import prisma from "../../../../prisma";
import { TaxiType } from "../../../../types/types";


export const GET = (req: NextRequest, res: NextResponse) => {
  return genericGET(req, res, () => prisma.taxi.findMany({
    include: { room: true },
    orderBy: { id: "asc" },
  }), "taxi");
}

type CreateFunction = (data: TaxiType) => Promise<any>;

const taxiPOST = async (
  req: NextRequest,
  res: NextResponse,
  createFn: CreateFunction,
  endpoint: string
) => {
  try {
    const data =await req.json();

    // isGeneralTaxiがtrueの場合、generalTaxiIdを計算
    if (data.isGeneralTaxi) {
      const usedIds = await prisma.taxi.findMany({
        where: { isGeneralTaxi: true },
        select: { generalTaxiId: true }
      });
      const usedIdsArray = usedIds.map(t => t.generalTaxiId).filter(id => id != null);

      let newGeneralTaxiId = 1;
      while (usedIdsArray.includes(newGeneralTaxiId) || newGeneralTaxiId === 3) {
        newGeneralTaxiId++;
      }

      data.generalTaxiId = newGeneralTaxiId;
    }

    await main();
    const result = await createFn(data);

    return NextResponse.json({ message: "Success", [endpoint]: result }, { status: 201, headers: { "Access-Control-Allow-Origin": "*" } });
  } catch (error) {
    console.error(`Error in POST method for ${endpoint}:`, error);
    return NextResponse.json({ message: "Error", error }, { status: 500, headers: { "Access-Control-Allow-Origin": "*" } });
  }
}

export const POST = async (req: NextRequest, res: NextResponse) => {

  return taxiPOST(req, res, (data) => {
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
        isGeneralTaxi: data.isGeneralTaxi,
        generalTaxiId: data.generalTaxiId,
        roomId: data.roomId,
        section: data.section,
        column: data.column,
        index: data.index,
      }
    });
  }, "taxi");
};