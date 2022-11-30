import React from 'react'

const UserDashboard = () => {
  return (
    <div className='userProfile'>
      <div className='notifications'>
        <h3>Notifications</h3>
      </div>
      <div className='rdv'>
        <h3>Mes rendez-vous</h3>
      </div>
      <div className='essais'>
        <h3>Mes essais routiers</h3>
      </div>
    </div>
  )
}

export default UserDashboard