// src/Pages/Home.jsx
import Navbar from "../Components/Navbar";
import { useState } from 'react';
import React from 'react'
import Menu from '../Pages/Menu'
export default function HomePage() {
  const [isHidden, setIsHidden] = useState(false);
  return (
    <div className="min-h-screen bg-yellow-400 text-black flex flex-col">
      {/* Top navigation */}


    <div>
      <div>
        <Navbar
      onSideBarHide={() => {
            setIsHidden(!isHidden);
          }} 
      />
</div>
    <div className={`col-span-1 ${isHidden ? "hidden" : "block"}`}>
      <Menu/>

</div>
      
    </div>

      {/* Hero section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <section className="max-w-4xl text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Need a ride? <span className="bg-black text-yellow-400 px-2">GoTaxi</span> is here.
          </h1>

          <p className="text-lg md:text-xl">
            Book safe and affordable rides in just a few clicks. 
            Airport, city, or late-night trips – we’ve got you covered 24/7.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
            <a
              href="/menu" // later you can change this to /book
              className="px-6 py-3 bg-black text-yellow-400 font-semibold rounded-md shadow hover:bg-yellow-300 hover:text-black border-2 border-black transition"
            >
              Book a ride
            </a>

            <a
              href="/about"
              className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-md border-2 border-black hover:bg-black hover:text-yellow-400 transition"
            >
              Learn more
            </a>
          </div>

          {/* Small feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
            <div className="border-2 border-black bg-yellow-300 rounded-lg p-4">
              <h2 className="font-bold text-lg mb-2">Fast pickup</h2>
              <p className="text-sm">
                We match you with the closest available driver in your area.
              </p>
            </div>
            <div className="border-2 border-black bg-yellow-300 rounded-lg p-4">
              <h2 className="font-bold text-lg mb-2">Trusted drivers</h2>
              <p className="text-sm">
                All drivers are verified and rated by real passengers.
              </p>
            </div>
            <div className="border-2 border-black bg-yellow-300 rounded-lg p-4">
              <h2 className="font-bold text-lg mb-2">Fair pricing</h2>
              <p className="text-sm">
                Transparent fares with no hidden fees or surprises.
              </p>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}
