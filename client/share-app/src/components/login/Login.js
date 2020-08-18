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
            console.log(this.state)
        }

        return (
            <>
            <Container>
            <div>
                <h1>Login</h1>
            </div>
            <form>

                    <div>
                        <label> Email : </label>
                        <TextField placeholder='Email' type='text' value={email} onChange={this.handleEmail}/>
                    </div>
                    <div>
                        <label> Password : </label>
                        <TextField placeholder='Password' type='text' value={password} onChange={this.handlePassword}/>
                    </div>
                    <div>
                    <Button type="button" variant="contained" onClick={() => {handleSubmit()}}>Login</Button>
                    <Button type="button" variant="contained" >Signup</Button>
                    </div>

            </form>
            </Container>
            </>
        )
    }
}

export default Login