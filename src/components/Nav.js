import React, { useEffect, useState } from 'react'
import './Nav.css'
const Nav = () => {

    const [show,handleShow] = useState(false);
    const transitionNavBar = () => {
        if (window.scrollY > 100){
            handleShow(true);
        } else {
            handleShow(false)
        }
    }

    useEffect( () => {
        window.addEventListener("scroll",transitionNavBar);
        return () => window.removeEventListener("scroll", transitionNavBar)
    },[])



    return (
      <div className={`nav ${show && "nav_black"}`}>
        <div className="nav_contents">
          <img
            className="nav_logo"
            alt=""
            src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
          />
          <img
            className="nav_avatar"
            alt=""
            src="https://aux.iconspalace.com/uploads/19682701751567859374.png"
          />
        </div>
      </div>
    );
}

export default Nav
