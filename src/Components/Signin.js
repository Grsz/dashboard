import React, { Component } from 'react';
import '../App.css';

class Signin extends Component {
  constructor(props){
    super(props);
    this.state = {
        username: '',
        password: '',
        alert: ''
    }
}
onEmailChange = (event) => {
    this.setState({username: event.target.value})
}
onPasswordChange = (event) => {
    this.setState({password: event.target.value})
}
onSubmitSignIn = () => {
    const { username, password } = this.state;
    if(!Boolean(username) || !Boolean(password)){
        const alert = "Please enter your username and password";
        this.setState({alert})
        return
    }
    fetch('http://localhost:3001/signin', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            username, password
        })
    })
    .then(res => {
        if(!res.ok){
            throw new Error("The data you entered is invalid.")
        } else {
            return res.json()
        }
    })
    .then(user => {
        if(Boolean(user.username)){
            this.props.loadUser(user)
            this.props.RouteChange('home')
        }
    })
    .catch(err => this.setState({alert: err.message}))
}

    render (){
        const { alert } = this.state;
        return (
            <div className="form">
                <h1 className="dev">Dev Challenge</h1>
                <div className="inputs">
                    <input onChange={this.onEmailChange} type="username" name="username-address" placeholder="Username"/>
                    <input onChange={this.onPasswordChange} type="password" name="password" placeholder="Password"/>
                </div>
                <button onClick={this.onSubmitSignIn}>
                    Sign In
                </button>
                <p className="signup">New to the challenge?
                    <span className="link" onClick={() => this.props.RouteChange('register')}>
                        Sign Up
                    </span>
                </p>
                {Boolean(alert) && <p className="alert">{alert}</p>}
            </div>
        );
    }
}

export default Signin;
