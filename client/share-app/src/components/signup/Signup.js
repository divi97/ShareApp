import React, { Component } from 'react'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'

class Login extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        document.title = "Signup"
    }

    render() {
        return (
            <>
            <Container>
            <div>
                <h1>Signup</h1>
            </div>
            <form>
                <div>
                    <label> Name : </label>
                    <TextField placeholder='Name' type='text' />
                </div>
                <div>
                    <label> Email : </label>
                    <TextField placeholder='Email' type='text' />
                </div>
                <div>
                    <label> Password : </label>
                    <TextField placeholder='Password' type='text' />
                </div>
                <div>
                <Button type="button" variant="contained" >Signup</Button>
                </div>

            </form>
            </Container>
            </>
        )
    }
}

export default Login