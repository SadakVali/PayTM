import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { NextResponse } from "next/server";

export const GET = async () => {
  const session = await getServerSession(authOptions);
  if (session.user) {
    return NextResponse.json({
      user: session.user,
    });
  }
  return NextResponse.json({ msg: "You are not logged in" }, { status: 403 });
};

// import { PrismaClient } from "@prisma/client";
// import { NextResponse } from "next/server";
// import brcypt from "bcrypt";

// const client = new PrismaClient();

// export const GET = async () => {
//   await client.user.create({
//     data: {
//       email: "rebirth4vali@gmail.com",
//       name: "Sadiq Vali",
//       number: "8309157924",
//       password: await brcypt.hash("hi", 10),
//     },
//   });
//   return NextResponse.json({
//     msg: "Hi there",
//   });
// };
