// import { cors } from '@/app/lib/cors';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { genericGET, main } from '../utils/utils';

const prisma = new PrismaClient();

// 全部屋の情報の取得
export const GET = (req: NextRequest, res: NextResponse) => {
  return genericGET(req, res, () => prisma.room.findMany(), "rooms");
}

// 全部屋の情報の更新
export const PUT = async (req: NextApiRequest, res: NextApiResponse) => {
  // cors(req, res);
  try {
    const roomsData = req.body;
    
    await main();

    for (const roomID in roomsData) {
      if (roomsData.hasOwnProperty(roomID)) {
        const roomData = roomsData[roomID];
        await prisma.room.update({
          where: { id: parseInt(roomID) },
          data: {
            company: roomData.company,
            reserveAdultsCount: roomData.reserveAdultsCount,
            reserveChildrenCount: roomData.reserveChildrenCount,
            scheduledArrival: roomData.scheduledArrival,
          },
        });
      }
    }

    res.status(200).json({ message: "Success", roomsData });
  } catch (error) {
    console.error("Error in PUT method:", error);  // エラーの詳細をログに出力
    res.status(500).json({ message: "Error", error });
  } finally {
    await prisma.$disconnect();
  }
};