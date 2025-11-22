import { useState } from 'react';
import React from 'react'
import Navbar from '../Components/Navbar'
import Menu from '../Pages/Menu'


function Home() {
  const [isHidden, setIsHidden] = useState(false);
  return (
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
  )
}

export default Home