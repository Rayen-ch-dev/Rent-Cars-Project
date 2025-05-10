import React from 'react'
import LoginForm from "@/components/LoginForm";
import Link from "next/link";
const SignIn = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <section className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold">Sign In</h1>
            <LoginForm />
            
            
            {/* Sign up with credentials*/}
            <Link href="/SignUp">
                <button>
                    don't have an account? <span className=' text-blue-600 underline font-bold hover:text-blue-800 cursor-pointer'>Sign up</span> 
                </button>
            </Link>

        </section>
        
      
    </div>
  )
}

export default SignIn;
