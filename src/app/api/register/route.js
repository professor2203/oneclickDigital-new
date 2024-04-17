import { connectMongo } from "@/app/lib/mongodb";
import { User } from "@/app/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.json();
  await connectMongo();
  const createdUser = await User.create(data);
 
  return NextResponse.json(createdUser);
}

