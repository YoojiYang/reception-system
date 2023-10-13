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
  return genericPUT(req, res, async (id, data) => {
    return await prisma.generalTaxi.update({
      data: {
        section: data.section,
        column: data.column,
        index: data.index,
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
  }, "generaltaxi");
};

// // タクシーの各予約情報の更新
// export const PUT = async (req: NextApiRequest, res: NextApiResponse) => {
//   // cors(req, res);

//   if (!req.url) {
//     throw new Error("URL is not defined");
//   }

//   try {
//     const id: number = parseInt(req.url.split("/generaltaxi/")[1]);
    
//     const requestBody = req.body;

//     const {
//       section,
//       column,
//       index,
//       peopleCount,
//       carCount,
//       reservationTime,
//     } = requestBody;

//     await main();

//     const generalTaxi = await prisma.generalTaxi.update({
//       data: {
//         section,
//         column,
//         index,
//         taxi: {
//           update: {
//             peopleCount,
//             carCount,
//             reservationTime,
//           }
//         }
//       },
//       where: { id },
//     });
//     res.status(200).json({ message: "Success", generalTaxi });
//   } catch (error) {
//     console.error("Error in PUT method:", error);  // エラーの詳細をログに出力
//     res.status(500).json({ message: "Error", error });
//   } finally {
//     await prisma.$disconnect();
//   }
// };


export const DELETE = async (req: NextRequest, res: NextResponse) => {
  return genericDELETE(req, res,
    async (id) => {
      return await prisma.generalTaxi.findUnique({
        where: { id },
        select: {
          taxiId: true,
        }
      });
    },
    async (taxiId) => {
      return await prisma.taxi.delete({
        where: { id: taxiId },
      });
    },
    "generaltaxi"
  );
};

