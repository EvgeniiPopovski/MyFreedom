import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'

const LoginForm = ({login}) => {

    const history = useHistory()

    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')

    return (
        <div>
            <form onSubmit={e => e.preventDefault()}>
                <h1>Login</h1>
                <div>
                    <label htmlFor='login'>Login by email</label>
                    <input name='login' type='text' placeholder='Enter your email' value={email} onChange={e  => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input name='password' type='password' placeholder='Enter your Password' value={password} onChange={e  => setPassword(e.target.value)} />
                </div>
                <button onClick={async () => {
                    await login(email, password)
                    history.push('/inbox')
                }} disabled={!email || !password}> Login </button>
            </form>
        </div>
    )
}

export {LoginForm}