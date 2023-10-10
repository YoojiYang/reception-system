import { NextResponse } from 'next/server';
import prisma from '../../../../prisma';
import { NextApiRequest, NextApiResponse } from 'next';
// import { cors } from '@/app/lib/cors';

// 全部屋の情報の取得
// export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
// cors(req, res);
//   try {
//     await main();

//     const roomId = req.query?.roomId;
//     console.log("req.query:", req.query);
    
//     if (!roomId) {
//       return NextResponse.json({ message: "Error", error: "roomId is not defined" }, { status: 400 });
//     }

//     const roomInCharges = await prisma.roomInCharge.findMany({
//       where: {
//         roomId: parseInt(roomId as string)
//       },
//       include: {
//         inCharge: true
//       }
//     });

//     const inCharges = roomInCharges.map(ric => ric.inCharge.name);
    
//     return NextResponse.json({ message: "Success", inCharges }, { status: 200 });
//   } catch (error) {
//     console.error("Error in GET method:", error);  // エラーの詳細をログに出力
//     return NextResponse.json({ message: "Error", error }, { status: 500 });
//   } finally {
//     await prisma.$disconnect();
//   }
// };