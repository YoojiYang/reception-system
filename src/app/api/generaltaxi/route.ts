import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma";
// import { cors } from "@/app/lib/cors";
import { NextApiRequest, NextApiResponse } from "next";
import { genericGET, main } from "../utils/utils";


export const GET = (req: NextRequest, res: NextResponse) => {
  return genericGET(req, res, () => prisma.generalTaxi.findMany({
    include: { taxi: true },
    orderBy: { id: "asc" },
  }), "generalTaxis");
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

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  // cors(req, res);
  try {
    const { section, column, index, peopleCount, carCount, reservationTime } = req.body;
    
    await main();
    
    const createdGeneralTaxi = await prisma.generalTaxi.create({
      data: {
        section,
        column,
        index,
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

    const createdTaxi = createdGeneralTaxi.taxi;
    
    res.status(201).json({ message: "Success", taxi: createdTaxi, generalTaxi: createdGeneralTaxi });
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  } finally {
    await prisma.$disconnect();
  }
}