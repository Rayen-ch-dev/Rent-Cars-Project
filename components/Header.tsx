import React from "react";
import Link from "next/link";
import { auth } from "@/auth";
import Logout from "./Logout";


const Header = async () => {
  const session = await auth();

  return (
    <header className="flex justify-between items-center py-4">
      <div className="flex items-center gap-2">
        <img src={null} alt="logo" />
        <h1 className="text-xl font-bold font-mono">Rent-car</h1>
      </div>

      <nav className="flex font-mono font-bold transition duration-300 items-center gap-4">
        <Link href="/" className="hover:text-gray-300 hover:underline decoration-2">
          Home
        </Link>
        <Link href="/services" className="hover:text-gray-300 hover:underline decoration-2">
          Services
        </Link>
        <Link href="/contact" className="hover:text-gray-300 hover:underline decoration-2">
          Contact
        </Link>
        <Link href="/about" className="hover:text-gray-300 hover:underline decoration-2">
          About
        </Link>
      </nav>

      <div className="flex items-center gap-2">
        {session?.user ? (
          <div className="text-white font-mono">
            Welcome, {session.user.name}
            <Logout />
            </div>
         
        ) : (
          <>
            <Link
              href="/LogIn"
              className="border hover:bg-white hover:text-black transition duration-300 text-white px-4 py-2 rounded-md"
            >
              Sing In / Sign Up
              
            </Link>
            
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
