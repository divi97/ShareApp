import React, { Component } from 'react'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'

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
            console.log(log)
            axios.post('http://localhost:1234/login', log)
            .then(response => {
                console.log(response)
                if(response.data.blocked === true){
                    alert("Sorry! You cannot log in!!! Contact the admin")
                    window.location = '/'
                } else {
                    localStorage.setItem('token', 'Bearer '+response.data.token)
                    localStorage.setItem('role', response.data.role)
                    alert("Logged in successfully!")
                    
                    if(response.data.role === 'admin'){
                        window.location = '/admindash'
                    } else {
                        window.location = '/userdash'
                    }
                }
              })
              .catch(error => { 
                console.log(error)
              })

        }

        const handleRedirect = () => {
            window.location = '/signup'
            // this.props.history.push('/signup')
        }

        return (
            <>
            <Container>
            <div>
                <h1>Login</h1>
            </div>
            <hr style={{width: '50%'}}/>
            <form>

                    <div>
                        <label> Email : </label>
                        <TextField placeholder='Email' type='text' value={email} onChange={this.handleEmail}/>
                    </div>
                    <div>
                        <label> Password : </label>
                        <TextField placeholder='Password' type='password' value={password} onChange={this.handlePassword}/>
                    </div>
                    <br />
                    <div>
                    <Button type="button" variant="contained" color="primary" onClick={() => {handleSubmit()}}>Login</Button>
                    <Button type="button" variant="contained" color="secondary" onClick={() => {handleRedirect()}}>Signup</Button>
                    </div>

            </form>
            </Container>
            </>
        )
    }
}

export default Login