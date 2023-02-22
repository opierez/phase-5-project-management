import React, {useEffect} from "react";

function BoardsContainer() {

    useEffect(() => {
        fetch('/boards')
    }, [])

    return(
        <div>BoardsContainer</div>
    )
}

export default BoardsContainer