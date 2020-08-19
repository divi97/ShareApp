import React, { useEffect } from 'react';
import Analysis from './Analysis'
import UserList from './UserList'


function AdminDash() {

  useEffect(() => {
    document.title = "Admin Dashboard"
  })

  return (
    <div>
      <Analysis />
      <UserList />
    </div>
  );
}

export default AdminDash;

// Note: Make a grid and place components there