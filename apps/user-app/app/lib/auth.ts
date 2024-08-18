import bcrypt from "bcrypt";
import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: {
          label: "Phone Number",
          type: "text",
          placeholder: "1234567890",
          required: true,
        },
        password: { label: "Password", type: "password", required: true },
      },
      // TODO: User credentials type from next-auth
      async authorize(credentials: any) {
        // TODO: Do Zod and OTP validation here
        const hashedPassword = await bcrypt.hash(credentials?.password, 10);
        const existingUser = await db.user.findFirst({
          where: { number: credentials.phone },
        });
        if (existingUser) {
          const passwordValidation = await bcrypt.compare(
            credentials?.password,
            existingUser?.password
          );
          if (passwordValidation) {
            return {
              id: existingUser?.id.toString(),
              name: existingUser?.name,
              email: existingUser?.number,
            };
          }
          return null;
        }
        try {
          // TODO: ideally we should do email and phone verification here
          const user = await db.user.create({
            data: {
              number: credentials.phone,
              password: hashedPassword,
            },
          });
          return {
            id: user.id.toString(),
            name: user?.name,
            email: user?.number,
          };
        } catch (err) {
          console.error(err);
        }
        return null;
      },
    }),
  ],
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    // TODO: can you fix the type here? using any is bad
    async session({ token, session }: any) {
      session.user.id = token.sub;
      return session;
    },
  },
};
