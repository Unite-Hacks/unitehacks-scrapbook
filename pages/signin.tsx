import React from "react";
 import { SiGoogle, SiGithub } from "react-icons/si";
 import { unstable_getServerSession } from "next-auth";
 import { authOptions } from "./api/auth/[...nextauth]";
 import { signIn } from "next-auth/react";


 


const SignIn = () => {
   return (
     <div className="px-4">
       <h1 className="text-center text-3xl textstyle mb-8 text-white">
         Sign In
       </h1>
       <div className="mx-auto w-80">
         <button
           className="flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-secondary-300 bg-blue-700  py-2 px-2 text-white duration-300 hover:scale-110 hover:duration-150"
           type="button"
           onClick={(e) => {
            e.preventDefault();
            signIn("google");
          }}
         >
           <SiGoogle />
           Sign in with Google
         </button>
         <div className="my-8 w-full text-center text-white">OR</div>
         <button
           className="flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-secondary-300 bg-white  py-2 px-2 text-black duration-300 hover:scale-110 hover:duration-150"
           type="button"
           onClick={(e) => {
            e.preventDefault();
            signIn("github");
          }}
         >
           <SiGithub />
           Sign in with Github
         </button>
       </div>
     </div>
   );
 };

 export default SignIn;
