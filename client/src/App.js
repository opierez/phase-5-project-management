import { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import BoardDashboard from "./ components/BoardDashboard";
import BoardsContainer from "./ components/BoardsContainer";
import TopNav from "./ components/TopNav";
import FavoritesBar from "./ components/FavoritesBar";
import Profile from "./ components/Profile";
import Inspiration from "./ components/Inspiration";
import LoginPage from "./ components/LoginPage";
import SignupPage from "./ components/SignupPage";
import { UserContext } from './Contexts/UserContext'
import {DndProvider} from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';


function App() {
 
  const [user, setUser] = useState({})
  const [isUser, setIsUser] = useState(false)
  const [favoriteBoards, setFavoriteBoards] = useState([])
  const [errors, setErrors] = useState([])
 

  // authentication
  useEffect(() => {
    fetch('/me')
    .then(res => {
      if (res.ok) {
        res.json().then(user => {
          // console.log(user)
          setUser(user)
          setIsUser(true)
        })
      } else {
          res.json().then(data => {
            console.log(data)
            setErrors(data.errors)})
      }
    })
  }, [])

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

  // updates the Favorites Bar with boards that are marked as favorited
  const updateFavoritesBar = (updatedFavBoards) => {
    // console.log(updatedFavBoards)
    const filterFavBoards = updatedFavBoards.filter(b => b.is_favorite === true)
    setFavoriteBoards(filterFavBoards)
  }

  return (
  
    <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-col">
      <UserContext.Provider value={{ user, setUser}}>
        <TopNav />
      </UserContext.Provider>
      <div className="flex flex-1 flex-row">
        {/* if there's a logged in user, render favorites bar */}
        <UserContext.Provider value={{ user }}>
          {isUser && <FavoritesBar favoriteBoards={favoriteBoards}/>} 
        </UserContext.Provider>
        <div className="flex-1 p-4 overflow-auto" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
          <Switch>
            <UserContext.Provider value={{ user, setUser, setIsUser}}>
              <Route path="/signup">
                <SignupPage />
              </Route>
              <Route path="/users/:id/inspiration">
                <Inspiration />
              </Route>
              <Route path="/users/:id/profile">
                <Profile />
              </Route>
              <DndProvider backend={HTML5Backend}>
                <Route path="/boards/:board_id">
                  <BoardDashboard />
                </Route>
              </DndProvider>
              <Route path="/users/:id/boards">
                <BoardsContainer updateFavoritesBar={updateFavoritesBar}/>
              </Route>
              <Route exact path="/">
                <LoginPage/>
              </Route>
            </UserContext.Provider>
          </Switch>
        </div>
      </div>
    </div>

  );
}

export default App;
