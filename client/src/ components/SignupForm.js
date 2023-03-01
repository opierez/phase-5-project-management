import React, {useState} from "react";
import { useHistory } from "react-router-dom";

function SignupForm({ updateUser }) {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        first_name: "", 
        last_name: ""
      });
    
    // errors from fetch request 
    const [errors, setErrors] = useState([])
    
    // used to redirect user to a different route after signup
    const history = useHistory()
    
    // update form data with user's input 
    const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    });
    };

    function handleSubmit(e) {
        e.preventDefault();

        const user = { ...formData };

        fetch("/users", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
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


    return(
        <div>Signup Form</div>
    )
}

export default SignupForm