import { NextResponse } from 'next/server';
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
    const id: number = parseInt(req.url.split("/generaltaxi/")[1]);
    await main();
    const generalTaxi = await prisma.generalTaxi.findMany({ 
      where: { id },
      include: {
        taxi: true,
      },
    });

    res.status(200).json({message: "Success", generalTaxi });
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
    const id: number = parseInt(req.url.split("/generaltaxi/")[1]);
    
    const requestBody = req.body;

    const {
      section,
      column,
      index,
      peopleCount,
      carCount,
      reservationTime,
    } = requestBody;

    await main();

    const generalTaxi = await prisma.generalTaxi.update({
      data: {
        section,
        column,
        index,
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
    res.status(200).json({ message: "Success", generalTaxi });
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
    const id: number = parseInt(req.url.split("/generaltaxi/")[1]);

    await main();

    const generalTaxi = await prisma.generalTaxi.findUnique({
      where: { id },
      select: {
        taxiId: true,
      }
    });
    if (!generalTaxi || !generalTaxi.taxiId) {
      res.status(404).json({ message: "Taxi not found for the given generalTaxi ID", error: "No such taxi" });
      return;
    }

    await prisma.taxi.delete({
      where: { id: generalTaxi.taxiId },
    });

    res.status(200).json({ message: "Deleted successfully" });

  } catch (error) {
    console.error("Error in DELETE method:", error);  // エラーの詳細をログに出力
    res.status(500).json({ message: "Error", error });
  } finally {
    await prisma.$disconnect();
  }
};
