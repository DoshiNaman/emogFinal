import React from 'react'
import Navbar from '../components/Navbar'

const bg={
    backgroundImage: 'url("https://i.imgur.com/wi33LKy.jpg")',
    backgroundSize: "100vw 100vh"
}

const play = () => {
    return (
        <div className='h-screen flex flex-col justify-center items-center' style={bg}>
            <div className="px-12 py-12 loginGradient rounded-lg">
                <Navbar />
            </div>
        </div>
    )
}

export default play
