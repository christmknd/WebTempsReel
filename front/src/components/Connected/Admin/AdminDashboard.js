import React from 'react'

const AdminDashboard = () => {
  return (
    <div className='adminDashboard'>
      <h1>{{}}</h1>
      <div className='gestionCommunication'>
        <h3>Communication en cours</h3>
      </div>

      <div className='gestionSalon'>
        <div className='listSalon'>
          <h3>Listes des Salons</h3>
        </div>

        <div className='gestionUsers'>
          <h3>Listes des users</h3>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard