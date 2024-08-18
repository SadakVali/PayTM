"use client";

import { RecoilRoot } from "recoil";
import { SessionProvider } from "next-auth/react";

interface InputProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: InputProps) => {
  return (
    <RecoilRoot>
      <SessionProvider>{children}</SessionProvider>
    </RecoilRoot>
  );
};
