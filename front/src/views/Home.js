import React, { createContext, useContext } from 'react';

//Anon
//import Login from '../components/Anonyme/Login' ;

//admin
//import AdminDashboard from '../components/Connected/Admin/AdminDashboard';

//user
import UserDashboard from '../components/Connected/User/UserDashboard';
import Chatbot from '../components/Connected/Chatbot';
import Salon from '../components/Connected/Salon';


const Home = () => {

  const role = {
    anonyme : 'anonMode',
    user : 'userMode',
    admin : 'adminMode'
  }

  const UserContext = createContext(role)

  return (

    <UserContext.Provider value={role.user}>
       <div className='Home'>
        <h1>ESGI Moto</h1>
        <Usermode/>
    </div>
    </UserContext.Provider>
  )

  /*
  //Quand l'utilisateur n'est pas connecté
  function AnonymeAdmin() {
    const mode = useContext(UserContext);
    <Login/>
  }

  //Quand on se connecte en tant qu'Admin
  function Adminmode() {
    const mode = useContext(UserContext);
    return (
      <AdminDashboard/>
    )
  }
  */

  //Quand l'utilisateur est connecté 
  function Usermode() {
     //const mode = useContext(UserContext)
     return (
      <>
      <UserDashboard/>
      <Salon/>
      <Chatbot/>
      </> 
     )
  }
}

export default Home;