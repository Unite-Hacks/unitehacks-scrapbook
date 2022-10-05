import { ReactNode } from "react";




export const PostGrid = ({children}: {children: ReactNode}) => {
  return (
    <>
    <div className="mt-5 bg-white text-center rounded-md md:mr-[300px] md:ml-[300px]">

    {children}
    </div>
    </>
  );
}