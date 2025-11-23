import React from "react";
import { Link } from "react-router-dom";

function Menu() {
  return (
    <div
      className="
        min-h-screen
        w-full
        h-full
        text-white 
        bg-black/90 
        backdrop-blur-md 
        flex 
        flex-col 
        items-start 
        pl-10 
        pt-10 
        gap-6
      "
    >
      <Link to="/" className="text-lg hover:text-yellow-400">
        Home
        </Link>
      <Link to="/booking" className="text-lg hover:text-yellow-400">
        Booking
      </Link>
      <Link to="/drivers" className="text-lg hover:text-yellow-400">
        Drivers
      </Link>
      <Link to="/offers" className="text-lg hover:text-yellow-400">
        Offers
      </Link>
      <Link to="/services" className="text-lg hover:text-yellow-400">
        Services
      </Link>
    </div>
  );
}

export default Menu;
