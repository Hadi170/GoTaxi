import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/Home";
import AboutPage from "./Pages/About";
import ContactPage from "./Pages/Contact";
import Menu from "./Components/Menu";
import Booking from "./Pages/Booking";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { useState } from 'react';
import Offers from "./Pages/Offers";
import Drivers from "./Pages/Drivers";
import Services from "./Pages/Services";

export default function App() {
  const [isHidden, setIsHidden] = useState(false);
  return (
    
 <BrowserRouter>
      <Navbar
        onSideBarHide={() => {
          setIsHidden(!isHidden);
        }}
      />

      {/* Sidebar + main content */}
      <div className="flex">
        {!isHidden && (
          <div className="w-56">
            <Menu />
          </div>
        )}

        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/drivers" element={<Drivers />} />
            <Route path="/services" element={<Services />} />
          </Routes>
        </div>
      </div>

      <Footer />
    </BrowserRouter>
  );
}
