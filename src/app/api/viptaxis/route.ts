import prisma from "../../../../prisma";
// import { cors } from "@/app/lib/cors";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { genericGET, main } from "../utils/utils";


export const GET = (req: NextRequest, res: NextResponse) => {
  return genericGET(req, res, () => prisma.vipTaxi.findMany({
    include: { room: true, taxi: true, },
    orderBy: { id: "asc" },
  }), "viptaxis");
}


export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { needOrNot, roomId, peopleCount, carCount, reservationTime } = req.body;
    
    await main();
    
    const createdVipTaxi = await prisma.vipTaxi.create({
      data: {
        needOrNot,
        room: {
          connect: {
            id: roomId
          }
        },
        taxi: {
          create: {
            peopleCount,
            carCount,
            reservationTime, 
          }
        }
      },
      include: {
        taxi: true
      }
    });

    const createdTaxi = createdVipTaxi.taxi;
    
    res.status(201).json({ message: "Success", taxi: createdTaxi, vipTaxi: createdVipTaxi });
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  } finally {
    await prisma.$disconnect();
  }
}