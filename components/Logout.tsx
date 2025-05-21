"use client";

import { logout } from "@/app/actions/auth";
import { ReactNode } from "react";

interface LogoutProps {
  children: ReactNode;
}

export default function Logout({ children }: LogoutProps) {
  return (
    <button
      onClick={() => logout()}
      className="flex items-center justify-center gap-1 text-sm text-white border border-white px-2 p-2 rounded-full hover:bg-white hover:text-black transition duration-300"
      title="Logout"
    >
      {children}
    </button>
  );
}
