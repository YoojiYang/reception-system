import { NextResponse } from 'next/server';
import prisma from '../../../../../prisma';
// import { cors } from '@/app/lib/cors';
import { NextApiRequest, NextApiResponse } from 'next';
import { main } from '../../utils/utils';

// 各部屋情報の取得
export const GET = async (req: NextApiRequest, res: NextApiResponse) => {

  if (!req.url) {
    throw new Error("URL is not defined");
  }

  try {
    const id: number = parseInt(req.url.split("/room/")[1]);
    await main();

    const room = await prisma.room.findFirst({ where: { id }});

    if (!room) {
      res.status(404).json({ message: "Not Found" });
    }

    res.status(200).json({ message: "Success", room });
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  } finally {
    await prisma.$disconnect();
  }
};


// 各部屋情報の更新
export const PUT = async (req: NextApiRequest, res: NextApiResponse) => {
  // cors(req, res);

  if (!req.url) {
    throw new Error("URL is not defined");
  }

  try {
    const id: number = parseInt(req.url.split("/room/")[1]);
    // const requestBody = await req.json();
    
    const {
      company,
      reserveAdultsCount,
      reserveChildrenCount,
      changedAdultsCount,
      changedChildrenCount,
      scheduledArrival,
    } = req.body;
    
    await main();

    const room = await prisma.room.update({
      data: {
        company,
        reserveAdultsCount,
        reserveChildrenCount,
        changedAdultsCount,
        changedChildrenCount,
        scheduledArrival,
      },
      where: { id },
    });

    res.status(200).json({ message: "Success", room });
  } catch (error) {
    console.error("Error in PUT method:", error);  // エラーの詳細をログに出力
    res.status(500).json({ message: "Error", error });
  } finally {
    await prisma.$disconnect();
  }
};