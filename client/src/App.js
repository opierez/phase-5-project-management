import { useState, useEffect } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import Board from "./ components/Board";
import BoardsDashboard from "./ components/BoardsDashboard";
import Home from "./ components/Home";
import Login from "./ components/Login";
import TopNav from "./ components/TopNav";
import SignupForm from "./ components/SignupForm";
import SideNav from "./ components/SideNav";
import Profile from "./ components/Profile";




function App() {
 
  const [user, setUser] = useState({})
  const [boards, setBoards] = useState([])
  const [errors, setErrors] = useState([])
  const location = useLocation()

  useEffect(() => {
    fetch('/users/1')
      .then (res => {
        if (res.ok) {
          res.json().then(user => {
            console.log(user)
            setUser(user)
            setBoards(user.boards)
          })
        } else {
          res.json().then(data => {
            console.log(data)
            setErrors(data)
          })
        }
      })
}, [])

// console.log(boards)
console.log(user)
  

  return (
  
    <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-col">
    <TopNav />
    <div className="flex flex-1 flex-row">
      <SideNav />
      <div className="flex-1 p-4 overflow-auto" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
        <Switch>
          <Route path="/users/new">
            <SignupForm />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/users/:id/profile">
            <Profile user={user}/>
          </Route>
          <Route path="/users/:id/boards/:board_id">
            <Board />
          </Route>
          <Route path="/users/:id/boards">
            <BoardsDashboard boards={boards} />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </div>
  </div>

  );
}

export default App;
