import React from 'react'
import Link from "next/link";
const Navbar = () => {
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

            <Link href="/signin">
                  <a className="group">
                    <div className="relative flex items-center bg-blue-700 space-x-2 rounded-lg py-1 px-2 group-hover:bg-[#ADD8E6]  textstyle text-white  sm:space-x-3 sm:px-3">
                      Sign In
                    </div>
                  </a>
                  </Link>
                <div className="relative flex items-center space-x-2 rounded-lg py-1 px-2 dark:bg-gray-700 sm:space-x-3 sm:px-3">
                  <div>
                      <p className="font-extrabold dark:text-white">
                      </p>
                    <p className="text-xs font-bold">
                    </p>
                  </div>

                  <button
                    className="peer"
                    type="button"
                  >
                  </button>
                  <div className="absolute -bottom-4 right-0 rounded px-2 py-0.5 text-sm opacity-0 duration-200 peer-hover:opacity-100 peer-hover:duration-150 dark:bg-primary-500/50">
                    Sign Out
                  </div>
                </div>

          
        </div>
      </nav>
      <div className="h-6" />
    </>
  )
}

export default Navbar