import React from 'react';
import './App.css'
import { Switch, Route } from 'react-router-dom'
import Login from './components/login/Login'
import Signup from './components/signup/Signup' 
import AdminDash from './components/dashboard/admin/AdminDash'

function App() {
  return (
    <div className="App">
        <Switch>
        {/* <Route exact path='/' render={() => <Login />} />
        <Route exact path='/signup' render={() => <Signup />} /> */}
        <Route exact path='/' render={() => <AdminDash />} />
      </Switch>
    </div>
  );
}

export default App;
