import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { AppbarClient } from "../components/Appbarclient";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wallet",
  description: "Simple Wallet App",
};

interface propTypes {
  readonly children: React.ReactNode;
}

export default function RootLayout({ children }: propTypes): JSX.Element {
  return (
    <html lang="en">
      <Providers>
        <body className={`${inter.className}`}>
          <div className="min-w-screen min-h-screen bg-[#ebe6e6]">
            <AppbarClient />
            {children}
          </div>
        </body>
      </Providers>
    </html>
  );
}
