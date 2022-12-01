import React, { createContext, useContext } from 'react';

//Anon
import Login from '../components/Anonyme/Login' ;

//admin
import AdminDashboard from '../components/Connected/Admin/AdminDashboard';

//user
import UserDashboard from '../components/Connected/User/UserDashboard';
import Chatbot from '../components/Connected/Chatbot';
import Salon from '../components/Connected/Salon';


const Home = () => {

  const role = {
    anonyme : 'anonyme',
    user : 'user',
    admin : 'admin',
  }

  const UserContext = createContext(role)

  return (

    //changer le role ici pour voir les differentes versions de l'appli
    <UserContext.Provider value={role}>
    <div className='Home'>
        <h1>ESGI Moto</h1>
        <Usermode/>
    </div>
    </UserContext.Provider>
  )


  //Quand l'utilisateur est connecté 
  function Usermode() {
  const mode = useContext(UserContext)

  switch (mode) {
    case 'user' :
      return (
        <>
        <UserDashboard/>
        <Salon/>
        <Chatbot/>
        </> 
      )
      break;

    case 'admin':
      return (
      <AdminDashboard/>
      )
      break;

    default:
      return (
        <Login/>        
      )
      break;
  }

  }
}

export default Home;