import { ReactNode } from "react";




export const PostGrid = ({children}: {children: ReactNode}) => {
  return (
    <>
    <div className="mt-5 bg-white text-center rounded-md md:mr-[300px] md:ml-[300px]">

    {children}
    </div>
    <div className="text-center text-2xl">
      Credits:
      <a href="https://github.com/sikethedev">
      <p className="text-blue-700 hover:underline ">@ivoine</p>
      </a>
      <a href="https://github.com/maggie-j-liu ">
      <p className="text-blue-700 hover:underline ">@maggie</p>
      </a>
    </div>
    </>
  );
}