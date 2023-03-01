import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import { signupFields } from './FormFields';
import FormInput from './FormInput';

function SignupForm({ updateUser }) {
    // const [formData, setFormData] = useState({
    //     username: "",
    //     password: "",
    //     first_name: "", 
    //     last_name: ""
    //   });
    
    const fields = signupFields
    let fieldsState = {}

    fields.forEach(field => fieldsState[field.id]='')

    const [signupState, setSignupState] = useState(fieldsState)

    // errors from fetch request 
    const [errors, setErrors] = useState([])
    
    // used to redirect user to a different route after signup
    const history = useHistory()


    const handleChange = (e) => {
        console.log(e.target.id)
        console.log(e.target.value)
        setSignupState({...signupState,[e.target.id]:e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(signupState)
        // createAccount()

        fetch("/signup", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(signupState),
        }).then((res) => {
            if (res.ok) {
            res.json().then((user) => {
            //   console.log(user)
                history.push(`/users/${user.id}/boards`) // redirect user to boards page after successful login
                updateUser(user); // updates user state in parent component
            });
            } else {
            res.json().then(json => {
                // console.log(json.errors)
                setErrors(json.errors)
            })
            }
        });

    }


    
    // update form data with user's input 
    // const handleChange = (e) => {
    // setFormData({
    //     ...formData,
    //     [e.target.name]: e.target.value,
    // });
    // };

    // function handleSubmit(e) {
    //     e.preventDefault();

    //     const user = { ...formData };

    //     fetch("/signup", {
    //         method: "POST",
    //         headers: {
    //         "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(user),
    //     }).then((res) => {
    //         if (res.ok) {
    //         res.json().then((user) => {
    //         //   console.log(user)
    //             history.push(`/users/${user.id}/boards`) // redirect user to boards page after successful login
    //             updateUser(user); // updates user state in parent component
    //         });
    //         } else {
    //         res.json().then(json => {
    //             // console.log(json.errors)
    //             setErrors(json.errors)
    //         })
    //         }
    //     });
    // }


    return(
        // <div className="container">
        //     <form onSubmit={handleSubmit}>
        //         <div className="form-group row">
        //             <label htmlFor="username" className="col-sm-2 col-form-label">Username:</label>
        //             <div className="col-sm-10">
        //                 <input
        //                     type="text"
        //                     name="username"
        //                     value={formData.username}
        //                     onChange={handleChange}
        //                 />
        //             </div>
        //         </div>
        //         <div className="form-group row">
        //             <label htmlFor="password" className="col-sm-2 col-form-label">Password:</label>
        //             <div className="col-sm-10">
        //                 <input
        //                     type="password"
        //                     name="password"
        //                     value={formData.password}
        //                     onChange={handleChange}
        //                 />
        //             </div>
        //         </div>
        //         <div className="form-group row">
        //             <label htmlFor="first_name" className="col-sm-2 col-form-label">First Name:</label>
        //             <div className="col-sm-10">
        //                 <input
        //                     type="text"
        //                     name="first_name"
        //                     value={formData.first_name}
        //                     onChange={handleChange}
        //                 />
        //             </div>
        //         </div>
        //         <div className="form-group row">
        //             <label htmlFor="last_name" className="col-sm-2 col-form-label">Last Name:</label>
        //             <div className="col-sm-10">
        //                 <input
        //                     type="text"
        //                     name="last_name"
        //                     value={formData.last_name}
        //                     onChange={handleChange}
        //                 />
        //             </div>
        //         </div>
        //         <button type="submit">Submit</button>
        //     </form>
        //     {/* renders login errors to the user */}
        //     {errors ? errors.map(error => <div key={error}>{error}</div>) : null}
        // </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="">
                {
                        fields.map(field=>
                                <FormInput
                                    key={field.id}
                                    handleChange={handleChange}
                                    value={signupState[field.id]}
                                    labelText={field.labelText}
                                    labelFor={field.labelFor}
                                    id={field.id}
                                    name={field.name}
                                    type={field.type}
                                    placeholder={field.placeholder}
                            />
                        
                        )
                    }
            </div>
            <button 
                type="submit" 
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10">
                    Signup 
            </button>
      </form>
    )
}

export default SignupForm