import React from "react";
import Link from "next/link";
import { auth } from "@/auth";
import Logout from "./Logout";
import Image from "next/image";
import { LogOut } from "lucide-react"; 
import { db } from "@/db";

const Header = async () => {
  const session = await auth();
  const user = await db.user.findUnique({
    where: {
      id: session?.user?.id,
    },
  });

  console.log("Session user:", session?.user);
  console.log("DB user:", user);
  console.log("User role:", user?.role);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black px-6 py-4 shadow-lg flex justify-between items-center">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={40}
          height={40}
          className="rounded-full border-2 border-white"
        />
        <span className="text-white font-bold text-lg font-mono hidden sm:inline">
          CarRental
        </span>
      </Link>

      {/* Navigation */}
      <nav className="flex gap-6 font-mono font-semibold text-white">
        <Link href="/" className="hover:text-gray-300 transition">
          Home
        </Link>
        <Link href="/cars" className="hover:text-gray-300 transition">
          Cars
        </Link>
        <Link href="/contact" className="hover:text-gray-300 transition">
          Contact
        </Link>
        <Link href="/about" className="hover:text-gray-300 transition">
          About
        </Link>
        {user?.role?.toUpperCase() === "ADMIN" && (
          <Link
            href="/dashboard"
            className="text-white hover:text-gray-300 transition"
          >
            Dashboard
          </Link>
        )}
      </nav>

      {/* User Section */}
      <div className="flex items-center gap-4">
        {session?.user ? (
          <div className="flex items-center gap-3">
            <Link href="/profile" className="text-white hover:underline">
              {session.user.name}
            </Link>
            <Link href="/profile">
              <Image
                src={session.user.image || "/images/userIcon.png"}
                alt="Profile"
                width={36}
                height={36}
                className="rounded-full border"
              />
            </Link>
            {/* Icon logout button */}
            <Logout>
              <LogOut className="w-4 h-4 " />
            </Logout>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link
              href="/login"
              className="text-white border border-white px-4 py-1.5 rounded hover:bg-white hover:text-black transition"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="bg-white text-black px-4 py-1.5 rounded hover:text-white hover:bg-black transition"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
