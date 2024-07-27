import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";

export async function GET() {
  const users = await prisma.user.findMany();

  const { password, ...data } = users[0];

  console.log(users);

  return NextResponse.json({ ...data });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const user = await prisma.user.create({ data: body });
  return NextResponse.json(user);
}
