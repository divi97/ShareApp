import React, { Component } from 'react'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import styles from '../../utils/signupStyles.module.css'

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            profile: null
        }
    }

    componentDidMount() {
        document.title = "Signup"
    }

    handleName = (event) => {
        this.setState({
            name: event.target.value
        })
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

    handleProfile = (event) => {
        this.setState({
            profile: event.target.files[0]
        })
    }

    handleSignup = () => {
        const fd = new FormData();
        fd.append('name',this.state.name);
        fd.append('email',this.state.email);
        fd.append('password', this.state.password)
        fd.append('profile', this.state.profile)
        console.log(fd)
        axios.post('http://localhost:1234/user/create', fd)
        .then(response => {
            console.log(response.data)
          })
          .catch(error => {
            console.log(error)
          })   
          alert("Registered Successfully!!")
          window.location = '/'
       
    }

    handleBack = () => {
        window.location = '/'
    }

    render() {
        const { name, email, password } = this.state

    

        return (
            <>
            <Container>
            <div>
                <h1>Signup</h1>
            </div>
            <hr style={{width: '50%'}}/>
            <form className = {styles.box}>
                <div>
                    <label> Name : </label>
                    <TextField autoFocus placeholder='Name' type='text' className={styles.infield} value={name} onChange={this.handleName} />
                </div>
                <div>
                    <label> Email : </label>
                    <TextField placeholder='Email' type='text' className={styles.infield} value={email} onChange={this.handleEmail} />
                </div>
                <div>
                    <label> Password : </label>
                    <TextField placeholder='Password' type='text' className={styles.infield} value={password} onChange={this.handlePassword} />
                </div>
                <div>
                    <label> Profile Picture : </label>
                    <input placeholder='profile' type='file' onChange={this.handleProfile} />
                </div><br/>
                <div>
                <Button type="button" variant="contained" className={styles.buttonsignup} onClick={this.handleSignup}>Signup</Button><br/><br />
                <Button type="button" variant="contained" className={styles.buttonback} onClick={this.handleBack}>Back to Login</Button>
                </div>

            </form>
            </Container>
            </>
        )
    }
}

export default Signup