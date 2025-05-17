import React from "react";
import Link from "next/link";
import { auth } from "@/auth";
import Logout from "./Logout";
import Image from "next/image";

const Header = async () => {
  const session = await auth();

  return (
    <header className="flex bg-black z-50 fixed top-0 w-full left-0 mx-3 justify-between items-center py-4">
      <div className="flex items-center gap-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
        <Image
          src="/images/logo.png"
          alt="logo"
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>

      <nav className="flex font-mono font-bold transition duration-300 items-center gap-4">
        <Link
          href="/"
          className="hover:text-gray-300 hover:underline decoration-2"
        >
          Home
        </Link>
        <Link
          href="/cars"
          className="hover:text-gray-300 hover:underline decoration-2"
        >
          Cars
        </Link>
        <Link
          href="/contact"
          className="hover:text-gray-300 hover:underline decoration-2"
        >
          Contact
        </Link>
        <Link
          href="/about"
          className="hover:text-gray-300 hover:underline decoration-2"
        >
          About
        </Link>
      </nav>

      <div className="flex items-center gap-2">
        {session?.user ? (
          <div className="text-white font-mono">
            <div className="flex ml-4 justify-center items-center gap-2">
              {session.user.name}
              <Image
                src={session.user.image || "/images/userIcon.png"}
                alt="profile"
                width={40}
                height={40}
                className="rounded-full"
              />
              <Logout />
            </div>
          </div>
        ) : (
          <>
            <Link
              href="/LogIn"
              className="border hover:bg-white hover:text-black transition duration-300 text-bl px-4 py-2 rounded-md"
            >
              Sing In
            </Link>
            <Link
              href="/SignUp"
              className="border hover:bg-black hover:text-white transition duration-300 text-black mr-4 px-4 py-2 bg-amber-50 rounded-md"
            >
              Sing Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
