import React, {useState, useEffect} from "react";
import { useHistory, Link } from "react-router-dom";


function FavoritesBar({ user }) {

    const [favoriteBoards, setFavoriteBoards] = useState([])
    const [errors, setErrors] = useState([])

    const history = useHistory()

    // fetch all of the favorite boards for the user, if user exists
    useEffect(() => {
        if (user !== null) {
            fetch(`/users/${user.id}/favorite_boards`)
            .then(res => {
                if (res.ok) {
                    res.json().then(favBoards => {
                        // console.log(favBoards)
                        setFavoriteBoards(favBoards)
                    })
                } else {
                    res.json().then(data => {
                        console.log(data.errors)
                        setErrors(data.errors)
                    })
                }
            })
        }
    }, [user])

    // redirect the user to the particular board they selected 
    const handleBoardTitleClick = (boardId) => {
        history.push(`/users/${user.id}/boards/${boardId}`) 
    }

    return (
        <>
            {/* if a user is logged in, render favorites board */}
            {user !== null && 
                <nav className="w-64 h-full" style={{ backgroundColor: "white" }}>
                    <div className="px-4 py-2 border-b">
                        <h3 className="text-black font-medium text-xl">Favorites</h3>
                    </div>
                    {favoriteBoards.length > 0 && (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left', margin: '15px'}}>
                            {favoriteBoards.map( board => (
                                <Link key={board.id} to={`/users/${user.id}/boards/${board.id}`} className="hover:cursor-pointer hover:text-blue-500">{board.title}</Link>
                            ))}
                        </div>
                    )}
                </nav>
            }
        </>
    )
}

export default FavoritesBar