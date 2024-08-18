"use client";

import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    redirect("/dashboard");
  } else {
    redirect("/api/auth/signin");
  }
}

// "use client";

// import { useBalance } from "@repo/store";

// export default function Home() {
//   const balance = useBalance();
//   return <div>Hi there {balance}</div>;
// }
