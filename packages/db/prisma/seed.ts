import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const main = async () => {
  // ALICE
  await prisma.user.upsert({
    where: { number: "1234567890" },
    update: {},
    create: {
      number: "1234567890",
      password: await bcrypt.hash("alice", 10),
      name: "alice",
      Balance: {
        create: {
          amount: 20000,
          locked: 0,
        },
      },
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 20000,
          token: "token__1",
          provider: "HDFC Bank",
        },
      },
    },
  });

  // BOB
  await prisma.user.upsert({
    where: { number: "1987654320" },
    update: {},
    create: {
      number: "1987654320",
      password: await bcrypt.hash("bob", 10),
      name: "bob",
      Balance: {
        create: {
          amount: 2000,
          locked: 0,
        },
      },
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Failure",
          amount: 2000,
          token: "token__2",
          provider: "HDFC Bank",
        },
      },
    },
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
