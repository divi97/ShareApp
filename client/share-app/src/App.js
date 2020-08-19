import React from 'react';
import './App.css'
import { Switch, Route } from 'react-router-dom'
import Login from './components/login/Login'
import Signup from './components/signup/Signup' 
import AdminDash from './components/dashboard/admin/AdminDash'
import Footer from './components/footer/Footer'
import AboutUs from './components/aboutus/AboutUs';
import TermsNConditions from './components/termsncond/TermsNConditions';

function App() {
  return (
    <div className="App">
        <Switch>
        <Route exact path='/' render={() => <Login />} />
        <Route exact path='/signup' render={() => <Signup />} />
        <Route path='/admindash' render={() => <AdminDash />} />
        <Route path='/aboutus' render={() => <AboutUs />} />
        <Route path='/tnc' render={() => <TermsNConditions />} />
      </Switch>
      <Footer/>
    </div>
  );
}

export default App;
