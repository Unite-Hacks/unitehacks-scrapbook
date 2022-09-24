import React from 'react'
import { GrHomeRounded } from "react-icons/gr";
import { BsPlusCircle } from "react-icons/bs";
import Avatar from "boring-avatars";


const BottomTabBar = () => {
  return (
    <>
    <div className='fixed w-full  p-4 bottom-0  bg-white rounded-t-lg border flex items-center justify-between md:p-6 z-3 md:hidden '>

      <div>
        <a href='/'>
      <GrHomeRounded
      size={35}
      />
      </a>
    </div>
      <div>
        <a href="/post/create">
        <BsPlusCircle 
        size={35}
        />
        </a>
      </div>
        <div>
        <Avatar
    size="40px"
    colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
  />
        </div>
    </div>
    </>
  )
}

export default BottomTabBar