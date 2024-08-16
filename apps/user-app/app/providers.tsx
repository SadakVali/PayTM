"use client";
import { RecoilRoot } from "recoil";

interface input {
  children: React.ReactNode;
}

export const Providers = ({ children }: input) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};
