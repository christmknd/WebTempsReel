import React from 'react'

const Login = () => {
    return (
    <div className='login'>
        <label htmlFor="name">username: </label>
        <input type="text" name='name'/>
        <label htmlFor="email">Email :</label>
        <input type="text" name='email'/>
        <label htmlFor="password">Mot de passe :</label>
        <input type="text" name='password'/>
        <input type="submit" value="Login" />
    </div>
    )
}

export default Login;
