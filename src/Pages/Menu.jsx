import React from 'react'
import { Link } from 'react-router-dom'

function Menu({open, onClose}) {
  return (
    <div className= "fixed left-0 top-14 h-full w-56 text-white bg-black/90 backdrop-blur-md flex flex-col items-start pl-10 pt-10 gap-6 z-10 transform transition-transform duration-300" >
      <Link to="/Booking" className='text-lg hover:text-yellow-400 '  >Booking</Link>
      <Link to="/" className='text-lg hover:text-yellow-400 '>Prices</Link>
      <Link to="/" className='text-lg hover:text-yellow-400 '>Drivers</Link>
      <Link to="/" className='text-lg hover:text-yellow-400 '>Offers</Link>
      <Link to="/" className='text-lg hover:text-yellow-400 '>Services</Link>

    </div>
  )
}

export default Menu