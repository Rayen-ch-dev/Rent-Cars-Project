import React from 'react'
import RegisterForm from "@/components/RegisterForm";
import Link from "next/link";
export default function SignUpPage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Create Account</h1>
      <RegisterForm />
      <p className="p-3">already have an account ? <Link href="/LogIn" className="text-blue-500 hover:underline">Sign In</Link></p>
    </section>
  );
}

