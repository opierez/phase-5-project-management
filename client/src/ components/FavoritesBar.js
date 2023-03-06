import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";



function FavoritesBar({ favoriteBoards }) {

    // used to pass down user state from parent component
    const {user} = useContext(UserContext)



    return (
        <div>
            {/* if a user is logged in, render favorites board */}
            {user !== null && 
                <nav className="w-64 h-full" style={{ backgroundColor: "white" }}>
                    <div className="px-4 py-2 border-b">
                        <h3 className="text-black font-medium text-xl">Favorites</h3>
                    </div>
                    {favoriteBoards.length > 0 && (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left', margin: '15px'}}>
                            {favoriteBoards.map( board => (
                                <Link key={board.id} to={`/boards/${board.id}`} className="hover:cursor-pointer hover:text-blue-500">{board.title}</Link>
                            ))}
                        </div>
                    )}
                </nav>
            }
        </div>
    )
}

export default FavoritesBar