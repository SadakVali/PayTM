"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function p2pTransfer(to: string, amount: number) {
  const session = await getServerSession(authOptions);
  const from = session?.user?.id;
  if (!from) {
    return {
      message: "Error while sending",
    };
  }
  const toUser = await prisma.user.findFirst({
    where: {
      number: to,
    },
  });

  if (!toUser) {
    return {
      message: "User not found",
    };
  }
  await prisma.$transaction(async (tx) => {
    // SOL => await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;

    const fromBalance = await tx.balance.findUnique({
      where: { userId: Number(from) },
    });
    // LOOPHOLE EXPLANATION CODE
    // console.log("above sleep");
    // await new Promise(resolve => setTimeout(resolve, 4000));
    // console.log("after sleep");
    /*
    In MongoDB, if you do a transaction very similar to this one(a bunch of queries together wrapped in a transaction), 
    while the transaction hasn't happened, if another request/transaction comes and tries to make the changes, 
    MongoDB will reverse the transactions. It will be like, i was doing something someone tried to chnage the DB 
    related to the same Row so i will revert the transaction.
    But postgress doesn't do this reversal in the similar situation. Thas why we don't to do locking of rows 
    in MOngoDB for transactions but in PostgreSQL we have to lock the rows.
    */
    if (!fromBalance || fromBalance.amount < amount) {
      throw new Error("Insufficient funds");
    }

    await tx.balance.update({
      where: { userId: Number(from) },
      data: { amount: { decrement: amount } },
    });

    await tx.balance.update({
      where: { userId: toUser.id },
      data: { amount: { increment: amount } },
    });

    await tx.p2pTransfer.create({
      data: {
        fromUserId: Number(from),
        toUserId: toUser.id,
        amount,
        timestamp: new Date(),
      },
    });
    // locking
  });
}
