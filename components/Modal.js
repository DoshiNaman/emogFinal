import React from 'react'

const Modal = props => {
    return (
        <div className="bg-black bg-opacity-50 flex justify-center items-center h-screen w-screen" style={{position:"absolute", top:"0", left:"0", zIndex:"3"}}>
            {props.children}
        </div>
    )
}

export default Modal
