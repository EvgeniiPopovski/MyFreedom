import React from 'react'
import { Link } from 'react-router-dom'

const MainPage = ({projects}) => {
    return (
        <main className='main'>
            <h1> 
                This is Main page
            </h1>
            
            <h2>Inbox</h2>
            <Link to='/task/add'> Add Task  </Link>

        </main>
    )
}

export {MainPage}