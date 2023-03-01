import React, {useState} from "react";
import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";


function TopNav({ user, updateUser }) {

    // checks if the navigation menu bar is open or closed
    const [isOpen, setIsOpen] = useState(false);

    // logs user out (deletes session) and updates user state to null if successful
    function handleLogoutClick() {
        fetch("/logout", { 
            method: "DELETE" 
        }).then((r) => {
          if (r.ok) {
            updateUser(null);
          }
        });
    }

    // if user clicks on one of the navigation menu options, close the navigation menu 
    function handleLinkClick() {
        setIsOpen(false);
    }

    return(
        <div>
            <header className="flex justify-between items-center text-black" style={{ backgroundColor: "#eac4d5", height: "4rem" }}>
                <h2 className="text-2xl font-medium">StreamOpti</h2>
                {/* <Link to={`/users/${user.id}/profile`} className="text-2xl">
                    <AiOutlineUser className="ml-4" />
                </Link> */}
                <nav>
                    <div className="container mx-auto px-6 py-3 md:flex md:justify-between md:items-center">
                    <div className="flex items-center justify-between">
                        <button className="border border-gray-600 px-3 py-2 rounded text-gray-600 inline-flex md:hidden" onClick={() => setIsOpen(!isOpen)} aria-controls="navbarNav" aria-expanded={isOpen} aria-label="Toggle navigation">
                        <span className="mdi mdi-menu"></span>
                        </button>
                    </div>
                    <div className={`md:flex ${isOpen ? 'flex' : 'hidden'}`} id="navbarNav">
                        <ul className="flex flex-col md:flex-row list-none md:ml-auto">
                        {/* if there's a logged in user, render Boards and Sign out options in navigation */}
                        {user && Object.keys(user).length !== 0 ? (
                            <>
                            <li className="nav-item">
                                <Link className="px-3 py-2 flex items-center text-gray-600 hover:bg-gray-200 hover:text-gray-800" to={`/users/${user.id}/boards`} onClick={handleLinkClick}>My Boards</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="px-3 py-2 flex items-center text-gray-600 hover:bg-gray-200 hover:text-gray-800" to={`/users/${user.id}/motivation`} onClick={handleLinkClick}>Motivation</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="px-3 py-2 flex items-center text-gray-600 hover:bg-gray-200 hover:text-gray-800" to="/" onClick={() => { handleLinkClick(); handleLogoutClick(); }}>Sign out</Link>
                            </li>
                            </>
                        // if there's no user logged in, render Login and Sign Up options in navigation 
                        ) : (
                            <>
                            <li className="nav-item">
                                <Link className="px-3 py-2 flex items-center text-gray-600 hover:bg-gray-200 hover:text-gray-800" to="/login" onClick={handleLinkClick}>Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="px-3 py-2 flex items-center text-gray-600 hover:bg-gray-200 hover:text-gray-800" to="/signup" onClick={handleLinkClick}>Sign Up</Link>
                            </li>
                            </>
                        )}
                        </ul>
                    </div>
                    </div>
                </nav>
            </header>
        </div>
        
    )
}

export default TopNav