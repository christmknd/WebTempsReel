import React from 'react'

const Register = () => {
  return (
    <div className='register'>
        <p>Vous n'avez pas de compte sur notre plateforme ? Creer en un avec le formulaire ci-dessus</p>
        <form action="" className='registerForm'>
        <label for="name">Name: </label>
        <input type="text" name='name'/>
        <label For="email">Email :</label>
        <input type="submit" value="Login" />
        </form>
        
    </div>
  )
}

export default Register;