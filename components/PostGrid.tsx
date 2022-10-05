import { ReactNode } from "react";




export const PostGrid = ({children}: {children: ReactNode}) => {
  return (
    <>
    <div className="mt-5 text-center">

    {children}
    </div>
    <div className="text-center text-2xl pb-20">
      Credits:
      <div className="flex text-center justify-center gap-5">
      <a href="https://github.com/sikethedev">
      <p className="text-blue-700 hover:underline ">@ivoine</p>
      </a>
      <a href="https://github.com/maggie-j-liu ">
      <p className="text-blue-700 hover:underline ">@maggie</p>
      </a>
      </div>
    </div>
    </>
  );
}