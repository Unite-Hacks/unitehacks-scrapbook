import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const Sigin = () => {
  const { data: session }: any = useSession();

  return (
    <div className="px-4">
      {!session ? (
        <>
          <h1 className="text-center text-3xl textstyle mb-8 text-white">
            Sign In
          </h1>
          <div className="mx-auto w-80">
            <button
              className="flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-secondary-300 bg-white  py-2 px-2 text-black duration-300 hover:scale-110 hover:duration-150"
              type="button"
              onClick={() => signIn()}
            >
              Sign in
            </button>
          </div>
        </>
      ) : (
        <div>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      )}
    </div>
  );
};

export default Sigin;
