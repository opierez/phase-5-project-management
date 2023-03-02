import React, {useContext} from "react";
import { UserContext } from "../Contexts/UserContext";

function Profile() {

    // used to pass user state to this component from parent 
    const {user} = useContext(UserContext)

    return(
        <div>
            <h1>Profile</h1>
            <p>{user.first_name}</p>
        </div>
    )
}

export default Profile 