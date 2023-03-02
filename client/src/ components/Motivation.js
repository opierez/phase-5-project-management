import React, {useContext} from "react";
import { UserContext } from "../Contexts/UserContext";

function Motivation() {

    // used to pass user state to this component from parent 
    const {user} = useContext(UserContext)
    
    return(
        <div>
            <h1>Motivation page</h1>
            <p>{user.first_name}</p>
        </div>
    )
}

export default Motivation