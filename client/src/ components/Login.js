import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';

function Login() {
    const [formData, setFormData] = useState({
        username:'',
        password:''
    })

    // errors from fetch request 
    const [errors, setErrors] = useState([])

    // used to redirect user to a different route after signup
    const history = useHistory()

    // deconstructs username and password to be used in form values
    const {username, password} = formData

    // updates form data with user's input 
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    function onSubmit(e){
        e.preventDefault()
        const user = {
            username,
            password
        }
       
        // if user exists and is authenticated, create user session. if user doesn't exist or isn't authenticated, render errors. 
        // fetch(`/login`,{
        //   method:'POST',
        //   headers:{'Content-Type': 'application/json'},
        //   body:JSON.stringify(user)
        // })
        // .then(res => {
        //     if(res.ok){
        //         res.json().then(user => {
        //             history.push('/boards') // redirect user to home after successful login
        //             updateUser(user)}) // update user state in parent component
        //             updateErrors() // invokes cb function to update error state in App component to empty array (removing 'not authorized' error)
        //     }else {
        //         res.json().then(json => {
        //             // console.log(json.errors)
        //             setErrors(json.errors)
        //         })
        //     }
        // })
       
    }


    return (
        <div> 
        <form onSubmit={onSubmit}>
            <label>Username</label>
            <input type='text' name='username' value={username} onChange={handleChange} />
        
            <label>Password</label>
            <input type='password' name='password' value={password} onChange={handleChange} />
        
            <input type='submit' value='Log in' />
        </form>
        {/* renders login errors to the user */}
        {errors ? errors.map(error => <div key={error}>{error}</div>) : null}
        </div>
    )
}

export default Login