import React, {useContext, useEffect, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import '../styles/Motivation.css'


function Inspiration() {

    // used to keep track of the quote of the day 
    const [quoteOfTheDay, setQuoteOfTheDay] = useState({})

    const [errors, setErrors] = useState([])

    // used to pass user state to this component from parent 
    const {user} = useContext(UserContext)

    useEffect(() => {
        fetch(`/quotes`)
        .then(res => {
            if (res.ok) {
                res.json().then(quote => {
                    // console.log(quote)
                    setQuoteOfTheDay(quote)
                })
            } else {
                res.json().then(data => {
                    setErrors(data.errors)
                })
            }
        })
    },[])

    
    return(
        <div className="quote-container bg-white-200 flex items-center justify-center px-5 py-5 mb-40 pb-20">
            <div className="w-full mx-auto rounded-lg bg-white shadow-lg px-5 pt-5 pb-10 text-gray-800" style={{maxWidth: "500px"}}>
                <div className="w-full mb-10">
                    <div className="text-3xl text-indigo-500 text-left leading-tight h-3">“</div>
                    <p className="text-lg text-gray-600 text-center px-5">{quoteOfTheDay.text}</p>
                    <div className="text-3xl text-indigo-500 text-right leading-tight h-3 -mt-3">”</div>
                </div>
                <div className="w-full">
                    {/* only renders author name, if author name exists */}
                    <p className="text-md text-indigo-500 font-bold text-center">{quoteOfTheDay.author ? quoteOfTheDay.author : ''}</p> 
                </div>
            </div>
        </div>
    )
}

export default Inspiration