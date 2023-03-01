import { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import BoardDashboard from "./ components/BoardDashboard";
import BoardsContainer from "./ components/BoardsContainer";
import Login from "./ components/Login";
import TopNav from "./ components/TopNav";
import SignupForm from "./ components/SignupForm";
import FavoritesBar from "./ components/FavoritesBar";
import Profile from "./ components/Profile";
import Motivation from "./ components/Motivation";
import LoginPage from "./ components/LoginPage";
import SignupPage from "./ components/SignupPage";


function App() {
 
  const [user, setUser] = useState({})
  const [errors, setErrors] = useState([])
 

  // auto-login. sets the user and budget if the user is authorized
  useEffect(() => {
    fetch('/authorized_user')
    .then(res => {
      if (res.ok) {
        res.json().then(user => {
          // console.log(user)
          setUser(user)
        })
      } else {
          res.json().then(data => {
            console.log(data)
            setErrors(data.errors)})
      }
    })
  }, [])

  // updates user state after login, signup, or logout  
  const updateUser = (user) => {
    // console.log(user)
    setUser(user)
  }

  return (
  
    <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-col">
    <TopNav user={user} updateUser={updateUser}/>
    <div className="flex flex-1 flex-row">
      <FavoritesBar user={user}/>
      <div className="flex-1 p-4 overflow-auto" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
        <Switch>
          <Route path="/signup">
            <SignupPage updateUser={updateUser}/>
          </Route>
          <Route path="/users/:id/motivation">
            <Motivation user={user}/>
          </Route>
          <Route path="/users/:id/profile">
            <Profile user={user}/>
          </Route>
          <Route path="/users/:id/boards/:board_id">
            <BoardDashboard />
          </Route>
          <Route path="/users/:id/boards">
            <BoardsContainer user={user} />
          </Route>
          <Route exact path="/">
            <LoginPage updateUser={updateUser}/>
          </Route>
        </Switch>
      </div>
    </div>
  </div>

  );
}

export default App;
