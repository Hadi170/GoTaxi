import React from "react";
import Navbar from '../Components/Navbar'
function About() {
  return (
    <>
      <Navbar />
    <div className="min-h-screen bg-yellow-400 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-black text-yellow-200 rounded-2xl shadow-xl p-8 border-4 border-yellow-300">
        <h1 className="text-3xl font-extrabold mb-4 text-yellow-300">
          About GoTaxi
        </h1>

        <p className="mb-3 text-sm">
          GoTaxi is a taxi booking web application that allows users to quickly
          request rides and connect with nearby drivers. It was created as a
          university project to simulate a real-world taxi platform.
        </p>

        <p className="mb-3 text-sm">
          Our goals are to:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Provide a simple and clear interface for booking taxis.</li>
          <li>Display essential trip information in an organized way.</li>
          <li>
            Apply real web development concepts (React, routing, TailwindCSS) in a
            practical project.
          </li>
        </ul>

        <p className="mt-4 text-sm">
          GoTaxi is built with React and TailwindCSS.It's still under construction,
          we will soon integrate with a backend API.
        </p>

        <div className="mt-6 text-xs text-yellow-300">
          <p>
            This project is part of a web development course and showcases modern
            front-end.
          </p>
        </div>
      </div>
    </div>
    </>
  );
}

export default About;
