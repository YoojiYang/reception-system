import { NextRequest, NextResponse } from "next/server";
import { genericPOST, genericPUT } from "../../utils/utils";

export const PUT = async (req: NextRequest, res: NextResponse) => {
  return genericPUT(req, res, async (id, data) => {
    return await prisma.taxi.update({
      data: {
        isCompleted: data.isCompleted,
        isCancel: data.isCancel,
      },
      where: { id },
    });
  }, "taxi");
};