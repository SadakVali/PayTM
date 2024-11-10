"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function createOnRampTransaction(
  amount: number,
  provider: string
) {
  const session = await getServerSession(authOptions);
  const token = Math.random().toString(); // await axios.get("https://api.hdfcbank.com/getToken", {amount: 200, ...})
  const userId = session.user.id;
  if (!userId) {
    return {
      message: "User not logged in",
    };
  }
  await prisma.onRampTransaction.create({
    data: {
      userId: Number(userId), // 1
      amount: amount,
      status: "Processing",
      startTime: new Date(),
      provider,
      token: token,
    },
  });

  return {
    message: "On ramp transaction added",
  };
}
