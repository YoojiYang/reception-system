import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

type FetchFunction = () => Promise<any>;
type ResponseKey = string;
type CreateFunction = (data: any) => Promise<any>;
type UpdateFunction = (id: number, data: any) => Promise<any>;
type DeleteFunction = (id: number) => Promise<any>;

const prisma = new PrismaClient({ log: ["info"] });

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
  if (!req.url) {
    throw new Error("URL is not defined");
  }

  try {
    await main();
    const data = await fetchFunction();
    const responseObj = {
      message: "Success",
      [responseKey]: data
    };
    return NextResponse.json(responseObj, { status: 200, headers: { "Access-Control-Allow-Origin": "*" } });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500, headers: { "Access-Control-Allow-Origin": "*" } });
  }
};

export const genericPOST = async (
  req: NextRequest,
  res: NextResponse,
  createFn: CreateFunction,
  endpoint: string
) => {
  try {
    const data =await req.json();

    await main();
    const result = await createFn(data);

    return NextResponse.json({ message: "Success", [endpoint]: result }, { status: 201, headers: { "Access-Control-Allow-Origin": "*" } });
  } catch (error) {
    console.error(`Error in POST method for ${endpoint}:`, error);
    return NextResponse.json({ message: "Error", error }, { status: 500, headers: { "Access-Control-Allow-Origin": "*" } });
  }
}

export const genericPUT = async (
  req: NextRequest,
  res: NextResponse,
  updateFn: UpdateFunction,
  endpoint: string
) => {
  if (!req.url) {
    throw new Error("URL is not defined");
  }

  try {
    const id: number = parseInt(req.url.split(`/${endpoint}/`)[1]);
    console.log(id);
    const data = await req.json();

    await main();
    const result = await updateFn(id, data);

    return NextResponse.json({ message: "Success", result }, { status: 200, headers: { "Access-Control-Allow-Origin": "*" } });
  } catch (error) {
    console.error(`Error in PUT method for ${endpoint}:`, error);
    return NextResponse.json({ message: "Error", error }, { status: 500, headers: { "Access-Control-Allow-Origin": "*" } });
  }
};



export const genericDELETE = async (
  req: NextRequest,
  res: NextResponse,
  deleteFn: DeleteFunction,
  endpoint: string
) => {
  if (!req.url) {
    throw new Error("URL is not defined");
  }

  try {
    const id: number = parseInt(req.url.split(`/${endpoint}/`)[1]);

    await deleteFn(id);

    return NextResponse.json({ message: "Success" }, { status: 200, headers: { "Access-Control-Allow-Origin": "*" } });

    } catch (error) {
      console.error(`Error in DELETE method for ${endpoint}:`, error);
      return NextResponse.json({ message: "Error", error }, { status: 500, headers: { "Access-Control-Allow-Origin": "*" } });
    }
  };