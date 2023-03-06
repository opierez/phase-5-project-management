import React from "react";
import FormHeader from "./FormHeader";
import SignupForm from "./SignupForm";

function SignupPage () {
    return(
        <div className="pb-8 h-full overflow-y-auto">
            <FormHeader
                heading="Signup to create an account"
                paragraph="Already have an account? "
                linkName="Login"
                linkURL="/"
            />
            <div className="h-full">
                <SignupForm />
            </div>
        </div>
    )
}

export default SignupPage