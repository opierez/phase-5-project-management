import React, {useState, useContext} from "react";
import { useHistory } from "react-router-dom";
import { signupFields } from './FormFields';
import FormInput from './FormInput';
import { UserContext } from "../Contexts/UserContext";

function SignupForm() {

    // used to set user state once a user signs up successfully
    const {setUser} = useContext(UserContext)

    const fields = signupFields // assigns the signup fields to a variable fields
    let fieldsState = {} // this object will be used to store the current state of each input field in the signup form
    fields.forEach(field => fieldsState[field.id]='') // initializing each input field's state as an empty string

    // used to keep track of user's input in signup form
    const [signupFormData, setSignupFormData] = useState(fieldsState) 

    // errors from fetch request 
    const [errors, setErrors] = useState([])
    
    // used to redirect user to a different route after signup
    const history = useHistory()

    // updates signup form data with user's input
    const handleChange = (e) => {
        setSignupFormData({...signupFormData, [e.target.id]: e.target.value})
    }

    // handles creating a new user with user's inputs upon form submission 
    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("/signup", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(signupFormData),
        }).then((res) => {
            if (res.ok) {
            res.json().then((user) => {
            //   console.log(user)
                history.push(`/users/${user.id}/boards`) // redirect user to boards page after successful login
                setUser(user); // updates user state in parent component
            });
            } else {
            res.json().then(data => {
                console.log(data.errors)
                setErrors(data.errors)
            })
            }
        });

    }


    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="">
                {
                        fields.map(field=>
                                <FormInput
                                    key={field.id}
                                    handleChange={handleChange}
                                    value={signupFormData[field.id]}
                                    labelText={field.labelText}
                                    labelFor={field.labelFor}
                                    id={field.id}
                                    name={field.name}
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    error={errors.find(error => error.toLowerCase().includes(field.labelText.toLowerCase()))} // pass the error message that includes the field label text 
                            />
                        
                        )
                    }
            </div>
            <div className="mb-4">
                <button 
                    type="submit" 
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-blue-200 hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-10">
                    Signup 
                </button>
            </div>
      </form>
    )
}

export default SignupForm