import React from 'react'
import "./Header.css";
import logo from  "../../utils/companyLogo.png"
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button'

const StyledLogOut = withStyles(() => ({
    root: {
        color: "#e74c3c",
        // marginLeft: '90%'
    }
}))(PowerSettingsNewIcon)

function Header() {

    const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    localStorage.removeItem('role')
    alert("Logged out Successfully!!")
    window.location = '/'
//   change online status to false
}

    return (
        <nav className='header1'>
            <img className='header1_logo' src={logo} alt=""/>
            
            {(localStorage.getItem('token')) ? (<Button style={{color:'#e74c3c'}} className='header_logout' onClick={logout()}><StyledLogOut  />Logout</Button>) :(<p></p>) }
        </nav>
    )
}

export default Header
