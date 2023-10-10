import { NextRequest, NextResponse } from "next/server";

type FetchFunction = () => Promise<any>;
type ResponseKey = string;


export async function main() {
  try {
    await prisma.$connect();
  } catch (error) {
    console.error(error);
    throw new Error("DB接続に失敗しました");
  }
};

export const genericGET = async (
  req: NextRequest,
  res: NextResponse,
  fetchFunction: FetchFunction,
  responseKey: ResponseKey
) => {
  try {
    await main();
    const data = await fetchFunction();
    const responseObj = { message: "Success", [responseKey]: data };
    return NextResponse.json(responseObj, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
