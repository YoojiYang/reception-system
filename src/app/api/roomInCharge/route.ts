import { NextResponse } from "next/server";
import prisma from "../../../../prisma";
import { main } from "@/app/utils/utils";
import { NextApiRequest, NextApiResponse } from "next";

// export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     await main();

//     const roomId = parseInt(req.query.roomId as string);
//     const roomInCharges = await prisma.roomInCharge.findMany({
//       where: {
//         roomId: roomId
//       },
//       include: {
//         inCharge: true
//       }
//     });
//     const inCharges = roomInCharges.map(ric => ric.inCharge.name);
//     return NextResponse.json({ message: "Success", inCharges }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ message: "Error", error }, { status: 500 });
//   } finally {
//     await prisma.$disconnect();
//   }
// };

// export const POST = async (req: Request, res: NextResponse) => {
//   try {
//     const { roomId, inChargeId } = await req.json();

//     const roomInCharge = await prisma.roomInCharge.create({
//       data: {
//         roomId,
//         inChargeId
//       }
//     });

//     return NextResponse.json({ message: "Success", roomInCharge }, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ message: "Error", error }, { status: 500 });
//   } finally {
//     await prisma.$disconnect();
//   }
// };