import React, {useState} from "react";
import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";


function TopNav({ user }) {

    // const { id } = user

    return(
        <header className="flex justify-between items-center text-black" style={{ backgroundColor: "#eac4d5", height: "4rem" }}>
            <h2 className="text-2xl font-medium">StreamOpti</h2>
            {/* <Link to={`/users/${user.id}/profile`} className="text-2xl">
                <AiOutlineUser className="ml-4" />
            </Link> */}
        </header>
        
    )
}

export default TopNav