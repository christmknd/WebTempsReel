import React from 'react'

const Login = () => {
    return (
    <div className='login'>
        <form action="">
        <label for="name">username: </label>
        <input type="text" name='name'/>
        <label For="email">Email :</label>
        <input type="text" name='email'/>
        <label For="password">Mot de passe :</label>
        <input type="text" name='password'/>
        <input type="submit" value="Login" />
        </form>
    </div>
    )
}

export default Login;
