import { NextResponse } from 'next/server';
import prisma from '../../../../prisma';

export async function main() {
  try {
    await prisma.$connect();
  } catch (error) {
    console.error(error);
    throw new Error("DB接続に失敗しました");
  }
};

// 全部屋の情報の取得
export const GET = async (req: Request, res: NextResponse) => {
  try {
    await main();
    const inCharges = await prisma.inCharge.findMany();
    return NextResponse.json({ message: "Success", inCharges }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};