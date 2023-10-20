import prisma from '../../../../prisma';
import { genericGET, genericPOST } from '../utils/utils';
import { NextRequest, NextResponse } from 'next/server';

// 全個室担当者の情報を取得
export const GET = async (req: NextRequest, res: NextResponse) => {
  return genericGET(req, res, () => prisma.inCharge.findMany(), "inCharge");
}

export const POST = async (req: NextRequest, res: NextResponse) => {
  return genericPOST(req, res, (data) => {
    return prisma.inCharge.create({
      data: {
        name: data.name,
      }
    });
  }, "inCharge");
};