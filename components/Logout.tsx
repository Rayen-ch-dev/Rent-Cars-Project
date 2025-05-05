"use client";

import { logout } from "@/app/actions/auth";

export default function Logout() {
  return (
    <div onClick={() => logout()}>
      <div>logout</div>
    </div>
  );
}
