import React, {useState, useContext} from "react";
import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { UserContext } from "../Contexts/UserContext";
import '../styles/TopNav.css'
import {GiHamburgerMenu} from 'react-icons/gi';
import {RiCloseLine} from 'react-icons/ri';
import { GiSplashyStream } from 'react-icons/gi'

function TopNav() {

    // used to pass down user state from parent component and to update user state to null after successfully logging out 
    const {user, setUser} = useContext(UserContext)

    // checks if nav menu is shown or hidden 
    const [showMenu, setShowMenu] = useState(false)

    function toggleMenu(){
        setShowMenu(!showMenu)
    }

    function closeMenu(){
        setShowMenu(false)
    }

    // logs user out (deletes session) and updates user state to null if successful
    function handleLogoutClick() {
        fetch("/logout", { 
            method: "DELETE" 
        }).then((r) => {
          if (r.ok) {
            setUser(null);
          }
        });
    }

    return(
        <nav className='navbar-container'>
            <div className="logo-container">
                <h2 className="logo-text">StreamEaze</h2>
                <div className="icon-container">
                    <GiSplashyStream size={25}/>
                </div>
            </div>
            <menu>
                <ul className='nav-links grow' id={showMenu ? "mobile-show" : "mobile-hide"}>
                    {user && Object.keys(user).length !== 0 ? (
                        <>
                            <li><Link to={`/users/${user.id}/boards`} onClick={closeMenu}>My Boards</Link></li>
                            <li><Link to={`/users/${user.id}/inspiration`} onClick={closeMenu}>Daily Inspiration</Link></li>
                            <li><Link to="/" onClick={() => { closeMenu(); handleLogoutClick(); }}>Sign out</Link></li>
                        </>
                        // if there's no user logged in, render Login and Sign Up options in navigation 
                        ) : (
                        <>
                            <li><Link to="/" onClick={closeMenu}>Login</Link></li>
                            <li><Link to="/signup" onClick={closeMenu}>Sign Up</Link></li>
                        </>
                        )}
                </ul>
            </menu>
            <div className='menu-icon' onClick={toggleMenu} >{showMenu ? <RiCloseLine size={30}/> : <GiHamburgerMenu size={27} color="#333" /> }</div>
        </nav>
        
    )
}

export default TopNav