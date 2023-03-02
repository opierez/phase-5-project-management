import React from "react";
import FormHeader from "./FormHeader";
import LoginForm from "./LoginForm";



function LoginPage () {


    return(
        <>
            <FormHeader
                heading="Login to your account"
                paragraph="Don't have an account yet? "
                linkName="Signup"
                linkURL="/signup"
            />
            <LoginForm />
        </>
    )
}

export default LoginPage