import { NextRequest, NextResponse } from "next/server";
import { genericDELETE, genericGET, genericPUT } from "../../utils/utils";
import prisma from "../../../../../prisma";


export const GET = async (req: NextRequest, res: NextResponse) => {
  const id: number = parseInt(req.url.split("/inCharge/")[1]);

  return genericGET(req, res, () => prisma.inCharge.findMany({
    where: { id },
    orderBy: { id: "asc" },
  }), "inCharge");
};

export const PUT = async (req: NextRequest, res: NextResponse) => {
  return genericPUT(req, res, async (id, data) => {
    return await prisma.inCharge.update({
      data: {
        name: data.name,
      },
      where: { id },
    });
  }, "inCharge");
};

export const DELETE = async (req: NextRequest, res: NextResponse) => {
  return genericDELETE(req, res,
    async (id) => {
      return await prisma.inCharge.delete({
        where: { id },
      });
    },
    "inCharge"
  );
}
