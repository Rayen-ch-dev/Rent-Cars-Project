"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const pathname = usePathname();
  const isContactOrAbout = pathname === "/contact" || pathname === "/about";

  return (
    <nav className="flex font-mono font-bold transition duration-300 items-center gap-4">
      <Link
        href="/"
        className={`hover:text-gray-300 hover:underline decoration-2 ${
          pathname === "/" ? "text-white" : ""
        }`}
      >
        Home
      </Link>
      <Link
        href="/cars"
        className={`hover:text-gray-300 hover:underline decoration-2 ${
          pathname === "/cars" ? "text-white" : ""
        }`}
      >
        Cars
      </Link>
      <Link
        href="/contact"
        className={`hover:text-gray-300 hover:underline decoration-2 ${
          pathname === "/contact" ? "text-white" : ""
        }`}
      >
        Contact
      </Link>
      <Link
        href="/about"
        className={`hover:text-gray-300 hover:underline decoration-2 ${
          pathname === "/about" ? "text-white" : ""
        }`}
      >
        About
      </Link>
    </nav>
  );
};

export default Navigation;
