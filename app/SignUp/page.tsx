import React from 'react'
import RegisterForm from "@/components/RegisterForm";
import Link from "next/link";
export default function SignUpPage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen p-4 mt-6">
      <h1 className="text-3xl font-bold ">Create Account</h1>
      <RegisterForm />
      <p className="">already have an account ? <Link href="/LogIn" className="text-blue-500 hover:underline text-blue-600 underline font-bold hover:text-blue-800 cursor-pointer">Sign In</Link></p>
    </section>
  );
}

