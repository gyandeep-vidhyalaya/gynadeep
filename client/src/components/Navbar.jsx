import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './styles/Navbar.css'
import Dots from '../assets/dots.svg'
const ADMIN = import.meta.env.VITE_ADMIN;

let navdisplay = false;

export const ToggleNav = () => {

  const flag = window.matchMedia('(min-width: 993px)');
  if (flag.matches)
    return;
  const ver_nav = document.getElementsByClassName('Left')[0];
  const rt = document.getElementsByClassName('Right')[0];
  ver_nav.style.transition = '0.5s';
  if (navdisplay) {
    ver_nav.style.width = `0vw`;
    rt.style.visibility = `visible`;
    navdisplay = false;
  } else {
    ver_nav.style.width = `1000px`;
    rt.style.visibility = `hidden`;
    navdisplay = true;
  }
};

const Navbar = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.ctrlKey && event.key === 'i') {
        event.preventDefault();
        if(!localStorage.getItem(ADMIN))
          navigate('/admin');
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" id='navbar'>
      <div className="container-fluid">
        {
          (localStorage.getItem(ADMIN)) ?
            <img src={Dots} className='dots invert' id='dots' alt="" onClick={ToggleNav} /> : ""
        }
        <Link className="navbar-brand navtext fs-2" to="/">GyanDeep</Link>
        <button className="navbar-toggler invert" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon invert"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link navtext" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link navtext" to="/activities">Activities</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link navtext" to="/results">Results</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link navtext" to="/aboutus">About Us</Link>
            </li>
            {
              (localStorage.getItem(ADMIN)) ?
                <>
                  <li className="nav-item">
                    <Link className="nav-link navtext" to="/settings">Settings</Link>
                  </li>
                </> : ""

            }
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar