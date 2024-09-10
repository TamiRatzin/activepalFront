import React, { useRef,useState, useEffect } from 'react';
import './NavigationBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell, faCalendarDays, faHouse, faPersonRunning} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons/faPeopleGroup';
import {Link } from 'react-router-dom';
import Logobar from './logobar';





const IconButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding:10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
   
    
`; 



export default function NavigationBar() {
 
  const [showNavbar, setShowNavbar] = useState(true);
    const scrollTimeoutRef = useRef(null);
  
    const handleScroll = () => {
        // Hide the navbar immediately when scrolling starts
        setShowNavbar(false);
        // Clear the previous timeout and set a new one to show the navbar when scrolling stops
        clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => {
            setShowNavbar(true);
        }, 500); // Adjust this delay as needed to determine when "scrolling stops"
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(scrollTimeoutRef.current);
        };
    }, []);
  

  return (
    <>
      <div className={`navigation-bar ${showNavbar ? 'navbar-show' : 'navbar-hide'}`} >
      <Logobar></Logobar>
      <IconButton> <Link to="/homepage"> <FontAwesomeIcon className='font-upload' icon={faHouse}/> </Link> </IconButton>  
      <IconButton> <FontAwesomeIcon className='font-upload' icon={faPersonRunning} />  <FontAwesomeIcon icon={faCalendarDays} className='font-upload' />  </IconButton>  
       <IconButton> <Link  to="/notifications"> <FontAwesomeIcon  className='font-upload' icon={faBell}/> </Link> </IconButton> 
      <IconButton> <Link to='/Connections'> <FontAwesomeIcon className='font-upload' icon={faPeopleGroup}/></Link> </IconButton> 
      <IconButton> <FontAwesomeIcon className='font-upload' icon={faBars}/></IconButton> 
    </div>

    </>
  )
}
