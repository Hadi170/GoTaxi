import React from 'react'
import { FaTaxi } from 'react-icons/fa';
function Footer() {
  return (
    <div className='fixed bottom-0 bg-black text-yellow-400 text-center px-6 py-4 mt-10 w-full' >
      <p className='text-sm'> &copy; 2025 Go <FaTaxi className='inline-block ' /> Taxi . All Right Reserved </p>

    </div>
  )
}

export default Footer;