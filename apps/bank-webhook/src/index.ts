import express from "express";
import db from "@repo/db/client";

const app = express();
app.use(express.json());

interface payInfType {
  token: string;
  userId: string;
  amount: string;
}

app.post("/hdfcWebhook", async (req, res) => {
  // TODO: Add Zod validation here
  // TODO: HDFC bank should ideally send us a secrete so we know this is sent by them. VALIDATE THIS HDFC SECRETE KEY
  const paymentInformation: payInfType = {
    token: req.body?.token,
    userId: req.body?.userId,
    amount: req.body?.amount,
  };
  // TODO: update balance in db and txn
  try {
    await db.$transaction([
      db.balance.update({
        where: { userId: Number(paymentInformation.userId) },
        data: { amount: { increment: Number(paymentInformation?.amount) } }, // You can also get this from your DB
      }),
      db.onRampTransaction.update({
        where: { token: paymentInformation.token },
        data: { status: "Success" },
      }),
    ]);
    res.status(200).json({ msg: "Captured" });
  } catch (err) {
    console.error(err);
    res.status(411).json({
      msg: "Error while processing webhook",
    });
  }
});

app.listen(3003);
