import React from 'react'
import { Link } from 'react-router-dom'
import {FaBars} from "react-icons/fa";
import { FaTaxi } from 'react-icons/fa';

function Navbar({onSideBarHide}) {
  return (
    <nav className='flex justify-between items-center px-6 py-4 bg-black text-white' >
      <div className='flex items-center gap-3'>
        <button onClick={
          ()=>{
            onSideBarHide();
          }
        } >
        <FaBars className='hover:text-yellow-400'/>
      </button>
      <h1 className='text-2xl font-bold  text-yellow-400 flex items-center gap-1'>
        GO<FaTaxi className='inline-block '/> Taxi
      </h1>
</div>
      
      <div className='space-x-6 hidden md:flex' >
        <Link to="/About" className='hover:text-yellow-400' >About</Link>
        <Link to="/Contact" className='hover:text-yellow-400' >Contact</Link>

      </div>

    </nav>
  )
}

export default Navbar