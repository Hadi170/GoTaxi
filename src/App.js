import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/Home";
import AboutPage from "./Pages/About";
import ContactPage from "./Pages/Contact";
import Menu from "./Pages/Menu";
import Booking from "./Pages/Booking";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { useState } from 'react';
import Offers from "./Pages/Offers";
import Prices from "./Pages/Prices";
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
    <div className={`col-span-1 ${isHidden ? "hidden" : "block"}`}>
      <Menu/>
</div>
<div>
<Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/Booking" element={<Booking/>} />
        <Route path="/Offers" element={<Prices/>} />
        <Route path="/Offers" element={<Drivers/>} />
        <Route path="/Offers" element={<Offers/>} />
        <Route path="/Offers" element={<Services/>} />
        
        
      </Routes>
</div>
      
      <Footer/>
    </BrowserRouter>
  );
}
