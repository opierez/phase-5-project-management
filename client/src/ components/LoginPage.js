import React from "react";
import FormHeader from "./FormHeader";
import Login from "./Login";

function LoginPage ({ updateUser }) {
    return(
        <>
            <FormHeader
                heading="Login to your account"
                paragraph="Don't have an account yet? "
                linkName="Signup"
                linkURL="/signup"
            />
            <Login updateUser={updateUser}/>
        </>
    )
}

export default LoginPage