import prisma from '../../../../../prisma';
// import { cors } from '@/app/lib/cors';
import { NextApiRequest, NextApiResponse } from 'next';
import { main } from '../../utils/utils';

// 各予約情報の取得
export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  // cors(req, res);

  if (!req.url) {
    throw new Error("URL is not defined");
  }

  try {
    const id: number = parseInt(req.url.split("/viptaxi/")[1]);
    await main();
    const vipTaxi = await prisma.vipTaxi.findMany({ 
      where: { id },
      include: {
        taxi: true,
        room: true,
      },
    });

    res.status(200).json({message: "Success", vipTaxi });
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  } finally {
    await prisma.$disconnect();
  }
};


// タクシーの各予約情報の更新
export const PUT = async (req: NextApiRequest, res: NextApiResponse) => {
  // cors(req, res);

  if (!req.url) {
    throw new Error("URL is not defined");
  }

  try {
    const id: number = parseInt(req.url.split("/viptaxis/")[1]);
    const requestBody = req.body;

    const {
      needOrNot,
      peopleCount,
      carCount,
      reservationTime,
    } = requestBody;

    await main();

    const vipTaxi = await prisma.vipTaxi.update({
      data: {
        needOrNot,
        taxi: {
          update: {
            peopleCount,
            carCount,
            reservationTime,
          }
        }
      },
      where: { id },
    });
    res.status(200).json({ message: "Success", vipTaxi });
  } catch (error) {
    console.error("Error in PUT method:", error);  // エラーの詳細をログに出力
    res.status(500).json({ message: "Error", error });
  } finally {
    await prisma.$disconnect();
  }
};

// タクシーの各予約情報の削除
export const DELETE = async (req: NextApiRequest, res: NextApiResponse) => {
  // cors(req, res);

  if (!req.url) {
    throw new Error("URL is not defined");
  }

  try {
    const id: number = parseInt(req.url.split("/viptaxis/")[1]);

    await main();

    const vipTaxi = await prisma.vipTaxi.findUnique({
      where: { id },
      select: {
        taxiId: true,
      }
    });
    if (!vipTaxi || !vipTaxi.taxiId) {
      res.status(404).json({ message: "Taxi not found for the given vipTaxi ID", error: "No such taxi" });
      return;
    }

    await prisma.taxi.delete({
      where: { id: vipTaxi.taxiId },
    });

    res.status(200).json({ message: "Deleted successfully" });

  } catch (error) {
    console.error("Error in DELETE method:", error);  // エラーの詳細をログに出力
    res.status(500).json({ message: "Error", error });
  } finally {
    await prisma.$disconnect();
  }
};
