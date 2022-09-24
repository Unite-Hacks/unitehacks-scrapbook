import React from 'react'
import Link from "next/link";
import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <>
      <nav className="flex justify-between px-4 py-2">
        <Link href="/">
          <a className="flex items-center space-x-4 hover:text-primary-100">
            <img src="/logo.svg" className="h-auto w-20" />
            <h3 className="hidden text-xl font-extrabold sm:block text-white textstyle">
              Scrapbook
            </h3>
          </a>
        </Link>
        <div className="flex items-center space-x-2 sm:space-x-6">
          <Link href="/post/create">
            <a className="hover:text-primary-100">
              <span className="hidden sm:inline text-white textstyle">Create Post</span>
            </a>
          </Link>
          {!session ? (
            <Link href="/signin">
              <a className="group">
                <div className="relative flex items-center bg-blue-700 space-x-2 rounded-lg py-1 px-2 group-hover:bg-[#ADD8E6]  textstyle text-white  sm:space-x-3 sm:px-3">
                  Sign In
                </div>
              </a>
            </Link>
          ) : (
            
              <a className="group">
                <div className="relative flex items-center bg-blue-700 space-x-2 rounded-lg py-1 px-2 group-hover:bg-[#ADD8E6]  textstyle text-white  sm:space-x-3 sm:px-3 cursor-pointer"
                 onClick={(e) => {
                  e.preventDefault();
                  signOut();
                }}
                >
                  Sign Out
                </div>
              </a>
           
          )}
        </div>
      </nav>
      <div className="h-6" />
    </>
  )
}

export default Navbar