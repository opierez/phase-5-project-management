import React from "react";
import { Link } from "react-router-dom";
import { GiWaterSplash } from 'react-icons/gi';

function FormHeader({ heading, paragraph, linkName, linkURL }) {

    return (
        <div className="mb-10">
            <div className="flex justify-center">
                <GiWaterSplash color="#9CBEE4" size={60} /> 
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                {heading}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 mt-5">
            {paragraph} {' '}
            <Link to={linkURL} className="font-medium text-blue-600 hover:text-blue-500">
                {linkName}
            </Link>
            </p>
        </div>
    )
}

export default FormHeader