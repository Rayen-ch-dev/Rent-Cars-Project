import React from "react";
import Link from "next/link";
import { auth } from "@/auth";
import Logout from "./Logout";
import Image from "next/image";

const Header = async () => {
  const session = await auth();

  return (
    <header className="flex justify-between items-center py-4">
      <div className="flex items-center gap-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
        <Image
          src="/images/ars.png"
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
          href="/services"
          className="hover:text-gray-300 hover:underline decoration-2"
        >
          Services
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
                src={session.user.image || "/images/user.png"}
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
              className="border hover:bg-white hover:text-black transition duration-300 text-white mr-4 px-4 py-2 rounded-md"
            >
              Sing In
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
