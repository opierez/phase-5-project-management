import { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Board from "./ components/Board";
import BoardsContainer from "./ components/BoardsContainer";
import Home from "./ components/Home";
import Login from "./ components/Login";
import NavBar from "./ components/NavBar";
import SignupForm from "./ components/SignupForm";
import UserTasks from "./ components/UserTasks";

function App() {
 
  const [user, setUser] = useState({})
  const [errors, setErrors] = useState([])

  

  return (
  
      <div className="App">
        <NavBar />

        <Switch>

          <Route path="/users/new">
            <SignupForm /> 
          </Route>

          <Route path="/login">
            <Login /> 
          </Route>

          <Route path="/boards">
            <BoardsContainer /> 
          </Route>

          <Route path="/boards/:id">
            <Board /> 
          </Route>

          <Route path="/users/:id/tasks">
            <UserTasks /> 
          </Route>

          <Route exact path="/">
            <Home /> 
          </Route>

        </Switch>
      </div>

  );
}

export default App;
