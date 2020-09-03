import React from 'react'
// import {useEffect, useState} from 'react'
import axios from 'axios'
import "./Header.css";
import logo from "../../utils/companyLogo.png"
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button'

const StyledLogOut = withStyles(() => ({
    root: {
        color: "#e74c3c",
        // marginLeft: '80%'
    }
}))(PowerSettingsNewIcon)



function Header(props) {

    // const [loginState,setLoginState] = useState(false)

    const logout = (e) => {
        console.log("FUNCTION NOT WORKING")
        
        localStorage.clear()

        ////////   change online status to false
        axios.post('http://localhost:1234/user/logout')
            .then(response => {
                // alert("Logged out Successfully!!")
                console.log(response)
                window.location = '/'
                e.stopPropagation()
            })
            .catch(err => {
                console.log(err)
            })
    } 

    // useEffect(() => {
    //     localStorage.getItem('token') ? setLoginState(true) : false
    // },[])

    return (
        <nav className='header1'>
            <img className='header1_logo' src={logo} alt="" />
            <h2 style={{ color: '#fff' }}>ShareApp</h2>

            {(localStorage.getItem('token')) ? (<Button style={{ color: '#e74c3c', marginLeft: '80%' }} className='header_logout' ><StyledLogOut onClick={(e) => logout(e)} />Logout</Button>) : (<p></p>)}
        </nav>
    )
}

export default Header