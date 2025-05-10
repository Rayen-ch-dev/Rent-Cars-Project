"use client";

import { logout } from "@/app/actions/auth";

export default function Logout() {
  return (
    <div className="border cursor-pointer hover:bg-white hover:text-black transition duration-300 text-white mr-4 px-4 py-2 rounded-md" onClick={() => logout()}>
      <div className="flex justify-center items-center gap-2">Logout</div>
    </div>
  );
}
