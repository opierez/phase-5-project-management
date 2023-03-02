import React from "react";

function FormInput ({
    handleChange,
    value,
    labelText,
    labelFor,
    id,
    name,
    type,
    placeholder,
    customClass, 
    error
}) {

    // input field styles
    const fixedInputClass="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"

    return (
        <div className="my-5">
            <label htmlFor={labelFor} className="sr-only">
              {labelText}
            </label>
            <input
              onChange={handleChange}
              value={value}
              id={id}
              name={name}
              type={type}
              className={fixedInputClass+customClass}
              placeholder={placeholder}
            />
            {error ? <p className="mt-1 text-sm text-red-500">{error}</p> : null}
        </div>
    )
}

export default FormInput 