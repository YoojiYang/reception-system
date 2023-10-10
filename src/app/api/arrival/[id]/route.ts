import prisma from '../../../../../prisma';
// import { cors } from '@/app/lib/cors';
import { NextApiRequest, NextApiResponse } from 'next';
import { main } from '../../utils/utils';

// 各部屋情報の取得
export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  // cors(req, res);

  try {
    if (!req.url) {
      throw new Error("URL is not defined");
    }

    const roomId: number = parseInt(req.url.split("/arrival/")[1]);
    await main();
    const arrival = await prisma.arrival.findMany({ where: { roomId }});

    const totalAdultsCount = arrival.reduce((acc, cur) => acc + cur.adultsCount, 0);
    const totalChildrenCount = arrival.reduce((acc, cur) => acc + cur.childrenCount, 0);
    const totalCount = totalAdultsCount + totalChildrenCount;

    res.status(200).json({
      message: "Success",
      arrival,
      totalAdultsCount,
      totalChildrenCount,
      totalCount,
    });

  } catch (error) {
    res.status(500).json({ message: "Error", error });
  } finally {
    await prisma.$disconnect();
  }
};


// 到着情報の更新
export const PUT = async (req: NextApiRequest, res: NextApiResponse) => {
  // cors(req, res);

  if (!req.url) {
    throw new Error("URL is not defined");
  }

  try {
    const id: number = parseInt(req.url.split("/arrival/")[1]);
    const requestBody = req.body;
    
    const {
      adultsCount, 
      childrenCount,
      arrivalTime,
    } = requestBody;
    
    await main();
    const arrival = await prisma.arrival.update({
      data: {
        adultsCount,
        childrenCount,
        arrivalTime,
      },
      where: { id },
    });
    res.status(200).json({ message: "Success", arrival });
  } catch (error) {
    console.error("Error in PUT method:", error);  // エラーの詳細をログに出力
    res.status(500).json({ message: "Error", error });
  } finally {
    await prisma.$disconnect();
  }
};