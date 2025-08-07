import React, { useState } from 'react'
import SideMenu from './SideMenu';
import {HiOutlineX, HiOutlineMenu} from 'react-icons/hi';

const Navbar = ({activeMenu}) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  return (
    <div className="nav">
      <button
      className='block lg:hidden text-black'
      onClick={() => {
        setOpenSideMenu(!openSideMenu);
      }}>
    
      {openSideMenu ? (
        <HiOutlineX className="text-2xl"/>
      ): (
        <HiOutlineMenu className="text-2xl"/>
      )}
      </button>

      <h2 className="text-lg font-bold text-purple-500">Expense <span className='text-purple-400'>Tracker</span></h2>

      {openSideMenu && (
        <div className='fixed top-[61px] -ml-4 bg-white'>
          <SideMenu activeMenu={activeMenu}/>
        </div>
      )}
    </div>
  )
}

export default Navbar