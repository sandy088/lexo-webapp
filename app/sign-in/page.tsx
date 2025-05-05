import { SignIn } from "@clerk/nextjs";
import React from "react";

const Signin = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <SignIn signUpUrl="/sign-up" afterSignInUrl="/" />
    </div>
  );
};

export default Signin;
