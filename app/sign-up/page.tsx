import { SignUp } from "@clerk/nextjs";
import React from "react";

const Signup = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <SignUp signInUrl="/sign-in" afterSignUpUrl={"/"} />
    </div>
  );
};

export default Signup;
