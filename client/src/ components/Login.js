import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';
import FormHeader from './FormHeader';
import { loginFields } from './FormFields';
import FormInput from './FormInput';

function Login({ updateUser }) {
    const [formData, setFormData] = useState({
        username:'',
        password:''
    })

    const fields = loginFields
    let fieldsState = {}
    fields.forEach(field => fieldsState[field.id]='')

    const [loginState, setLoginState] = useState(fieldsState);

    const handleChange = (e) => {
        console.log(e.target.id)
        console.log(e.target.value)
        setLoginState({...loginState,[e.target.id]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(loginState)
        authenticateUser();
    }

    const authenticateUser = () =>{
        // if user exists and is authenticated, create user session. if user doesn't exist or isn't authenticated, render errors. 
        fetch(`/login`,{
          method:'POST',
          headers:{'Content-Type': 'application/json'},
          body:JSON.stringify(loginState)
        })
        .then(res => {
            if(res.ok){
                res.json().then(user => {
                    history.push(`/users/${user.id}/boards`) // redirect user to their boards after successful login
                    updateUser(user)}) // update user state in parent component
                    // updateErrors() // invokes cb function to update error state in App component to empty array (removing 'not authorized' error)
            } else {
                res.json().then(data => {
                    // console.log(data.errors)
                    setErrors(data.errors)
                })
            }
        })
    }

    // errors from fetch request 
    const [errors, setErrors] = useState([])

    // used to redirect user to a different route after signup
    const history = useHistory()

    // deconstructs username and password to be used in form values
    const {username, password} = formData

    // updates form data with user's input 
    // const handleChange = (e) => {
    //     const { name, value } = e.target
    //     setFormData({ ...formData, [name]: value })
    // }

    // function onSubmit(e){
    //     e.preventDefault()
    //     const user = {
    //         username,
    //         password
    //     }
       
    //     // if user exists and is authenticated, create user session. if user doesn't exist or isn't authenticated, render errors. 
    //     fetch(`/login`,{
    //       method:'POST',
    //       headers:{'Content-Type': 'application/json'},
    //       body:JSON.stringify(user)
    //     })
    //     .then(res => {
    //         if(res.ok){
    //             res.json().then(user => {
    //                 history.push(`/users/${user.id}/boards`) // redirect user to their boards after successful login
    //                 updateUser(user)}) // update user state in parent component
    //                 // updateErrors() // invokes cb function to update error state in App component to empty array (removing 'not authorized' error)
    //         } else {
    //             res.json().then(data => {
    //                 // console.log(data.errors)
    //                 setErrors(data.errors)
    //             })
    //         }
    //     })
       
    // }


    return (
        // <div> 
        // <form onSubmit={onSubmit}>
        //     <label>Username</label>
        //     <input type='text' name='username' value={username} onChange={handleChange} />
        
        //     <label>Password</label>
        //     <input type='password' name='password' value={password} onChange={handleChange} />
        
        //     <button type='submit' value='Log in'>Log In</button>
        // </form>
        // {/* renders login errors to the user */}
        // {errors ? errors.map(error => <div key={error}>{error}</div>) : null}
        // </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px">
                {
                    fields.map(field=>
                            <FormInput
                                key={field.id}
                                handleChange={handleChange}
                                value={loginState[field.id]}
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
                    Submit 
            </button>
        </form>
    )
}

export default Login