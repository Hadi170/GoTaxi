import { useState } from 'react';
import React from 'react'
import Navbar from '../Components/Navbar'
import Menu from '../Pages/Menu'
import Footer from '../Components/Footer';


function Home() {
  const [isHidden, setIsHidden] = useState(false);
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
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
      <div>
        <Footer/>
      </div>
    </div>
  )
}

export default Home;