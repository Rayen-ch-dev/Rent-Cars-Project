import React from 'react'
import SignUpButton from "@/components/SignUpButtonGoogle";
import LoginForm from "@/components/LoginForm";
import Link from "next/link";
const SignIn = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <section className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold">Sign Up</h1>
            <LoginForm />
            {/* continue with google*/}
            <SignUpButton />
            {/* Sign up with credentials*/}
            <Link href="/SignUp">
                <button>
                    Sign Up
                </button>
            </Link>

        </section>
        
      
    </div>
  )
}

export default SignIn;
