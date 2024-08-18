"use client";

import { usePathname, useRouter } from "next/navigation";

interface propTypes {
  href: string;
  title: string;
  icon: React.ReactNode;
}

export const SidebarItem = ({ href, title, icon }: propTypes) => {
  const router = useRouter();
  const pathname = usePathname();
  const selected = pathname === href;

  return (
    <div
      onClick={() => {
        router.push(href);
      }}
      className={`flex ${selected ? "text-[#6a51a6]" : "text-slate-500"} cursor-pointer p-2 pl-8`}
    >
      <div className="pr-2">{icon}</div>
      <div
        className={`font-bold ${selected ? "text-[#6a51a6]" : "text-slate-500"}`}
      >
        {title}
      </div>
    </div>
  );
};
