import React from "react";
import FormHeader from "./FormHeader";
import SignupForm from "./SignupForm";

function SignupPage ({ updateUser }) {
    return(
        <>
            <FormHeader
                heading="Signup to create an account"
                paragraph="Already have an account? "
                linkName="Login"
                linkUrl="/"
            />
            <SignupForm updateUser={updateUser}/>
        </>
    )
}

export default SignupPage