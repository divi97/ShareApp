import React from 'react';
import './App.css'
import { Switch, Route } from 'react-router-dom'
import Login from './components/login/Login'
import Signup from './components/signup/Signup'
import AdminDash from './components/dashboard/admin/AdminDash'
import UserDash from './components/dashboard/user/UserDash'
import Footer from './components/footer/Footer'
import AboutUs from './components/aboutus/AboutUs';
import TermsNConditions from './components/termsncond/TermsNConditions';
import ShareFiles from './components/sharefiles/ShareFiles'
import Header from './components/header/Header'

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path='/' render={() => <Login />} />
        <Route exact path='/signup' render={() => <Signup />} />
        <Route path='/admindash' render={() => <AdminDash />} />
        <Route path='/userdash' render={() => <UserDash />} />
        <Route path='/aboutus' render={() => <AboutUs />} />
        <Route path='/tnc' render={() => <TermsNConditions />} />
        <Route path='/sharefiles' render={() => <ShareFiles />} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
