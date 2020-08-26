import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import styles from '../../utils/loginStyles.module.css'
// import Header from '../header/Header'

class Login extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            email: '',
            password: ''
        }
    }

    componentDidMount() {
        document.title = "Login"
    }

    handleEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handlePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    render() {
        const { email, password } = this.state

        const handleSubmit = () => {
            const log = this.state
            // console.log(log)
            axios.post('http://localhost:1234/user/login', log)
                .then(response => {
                    console.log(response)
                    if (response.data.verified === false) {
                        alert("Sorry! You cannot log in!!! Your Email is not verified")
                        //this.props.history.push('/');
                        window.location = '/'
                    }
                    else if (response.data.blocked === true) {
                        alert("Sorry! You cannot log in!!! Contact the admin")
                        //this.props.history.push('/');
                        window.location = '/'
                    } else {
                        localStorage.setItem('token', 'Bearer ' + response.data.token)
                        localStorage.setItem('role', response.data.role)
                        alert("Logged in successfully!")

                        if (response.data.role === 'admin') {
                            localStorage.setItem('id', response.data.id)
                            this.props.history.push('/admindash');
                        } else {
                            localStorage.setItem('id', response.data.id)
                            this.props.history.push('/userdash');
                        }
                    }
                })
                .catch(error => {
                    console.log(error)
                })

        }

        const handleRedirect = () => {
            this.props.history.push('/signup')
        }


        return (
            <>  
                <Container>
                    <div>
                        <h1>Login</h1>
                    </div>
                    <hr style={{ width: '50%' }} />
                    <form className={styles.box}>

                        <div>
                            <label> Email : </label>
                            <TextField  variant= "outlined" InputProps={{style:{color:"#90CAF9"}}} autoFocus placeholder='Email' type='text' className={styles.infield} value={email} onChange={this.handleEmail} />
                        </div>
                        <div>
                            <label> Password : </label>
                            <TextField variant= "outlined" InputProps={{style:{color:"#90CAF9"}}} placeholder='Password' type='password' className={styles.infield} value={password} onChange={this.handlePassword} />
                        </div>
                        <br />
                        <div>
                            <Button type="button" className={styles.buttonlogin} variant="contained" onClick={() => { handleSubmit() }}>Login</Button>&nbsp;&nbsp;
                            <Button type="button" className={styles.buttonsignup} variant="contained" onClick={() => { handleRedirect() }}>Signup</Button>
                        </div>

                    </form>
                </Container>
            </>
        )
    }
}

export default withRouter(Login);