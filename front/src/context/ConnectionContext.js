//Contexte juste pour simuler la connection 
//En attendant que la connexion en back soit bien reglé 

//Trois rôle : Anonyme , User , Admin 

import { createContext, useContext } from "react";
import Home from "../views/Home";

import React from 'react'

const ConnectionContext = () => {

    const role : {
        anonyme : 'anonmode',
        user : 'usermode',
        admin : 'admin'
    }
  return (
    <ConnectionContext.Provider value={role.anonyme}>
        <Home/>
    </ConnectionContext.Provider>
  )
}

export default ConnectionContext