import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma";
// import { cors } from "@/app/lib/cors";
import { NextApiRequest, NextApiResponse } from "next";
import { genericGET, genericPOST, main } from "../utils/utils";
import { rejects } from "assert";


export const GET = (req: NextRequest, res: NextResponse) => {
  return genericGET(req, res, () => prisma.generalTaxi.findMany({
    include: { taxi: true },
    orderBy: { id: "asc" },
  }), "generaltaxi");
}

// VIPタクシーの全情報の取得


// export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
//   // cors(req, res);
//   try {
//     await main();

//     const generalTaxis = await prisma.generalTaxi.findMany({
//       include: {
//         taxi: true,
//       },
//       orderBy: { id: "asc" },
//     });

//     res.status(200).json({ message: "Success", generalTaxis });
//   } catch (error) {
//     res.status(500).json({ message: "Error", error });
//   } finally {
//     await prisma.$disconnect();
//   }
// };

export const POST = async (req: NextRequest, res: NextResponse) => {
  return genericPOST(req, res, (data) => {
    return prisma.generalTaxi.create({
      data: {
        section: data.section,
        column: data.column,
        index: data.index,
        taxi: {
          create: {
            peopleCount: data.peopleCount,
            carCount: data.carCount,
            reservationTime: data.reservationTime,
          }
        }
      }
    });
  }, "generaltaxi");
};