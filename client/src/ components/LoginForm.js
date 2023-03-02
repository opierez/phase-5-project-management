import React, {useState, useContext} from 'react'
import { useHistory } from 'react-router-dom';
import { loginFields } from './FormFields';
import FormInput from './FormInput';
import { UserContext } from '../Contexts/UserContext';

function LoginForm({ updateUser }) {

    // used to set user state once a user logs in successfully
    const {setUser, setIsUser} = useContext(UserContext)

    const fields = loginFields // assigns the login fields to a variable fields
    let fieldsState = {} // this object will be used to store the current state of each input field in the login form
    fields.forEach(field => fieldsState[field.id]='') // initializing each input field's state as an empty string

    // used to keep track of user's input in login form
    const [loginFormData, setLoginFormData] = useState(fieldsState);

    // errors from fetch request 
    const [errors, setErrors] = useState([])

    // used to redirect user to a different route after signup
    const history = useHistory()

    // updates login form data with user's input
    const handleChange = (e) => {
        setLoginFormData({...loginFormData, [e.target.id]: e.target.value})
    }

    // handles logging in a user once they've submitted the login form  
    const handleSubmit=(e)=>{
        e.preventDefault();
        
        fetch(`/login`,{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(loginFormData)
          })
          .then(res => {
              if(res.ok){
                  res.json().then(user => {
                      history.push(`/users/${user.id}/boards`) // redirect user to their boards after successful login
                    //   updateUser(user) // update user state in parent component
                        setUser(user) // update user state in parent component
                        setIsUser(true) // updates the value that checks if there's a logged in user
                    }) 
                      // updateErrors() // invokes cb function to update error state in App component to empty array (removing 'not authorized' error)
              } else {
                  res.json().then(data => {
                      // console.log(data.errors)
                      setErrors(data.errors)
                  })
              }
          })
    }


    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px">
                {
                    fields.map(field=>
                            <FormInput
                                key={field.id}
                                handleChange={handleChange}
                                value={loginFormData[field.id]}
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
            <button 
                type="submit" 
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10">
                    Submit 
            </button>
        </form>
    )
}

export default LoginForm