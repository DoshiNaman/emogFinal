import React from 'react'

const Button = ({text, clickHandler}) => {
    return (
        <button className='buttonNew rounded-md px-2 py-1 mt-3 w-auto text-lg font-bold self-center' onClick = {clickHandler}>
            {text}
        </button>
    )
}

export default Button
