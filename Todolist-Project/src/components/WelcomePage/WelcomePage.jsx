import React from 'react'
import { Link } from 'react-router-dom'


const WelcomePage = () => {
    return (
        <section className='welcome section'>
            <h1>Welcome to MyAswomeTodolist</h1>
            <Link to="/login">Start</Link>
        </section>
    )
}

export {WelcomePage}