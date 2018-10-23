import React, { Component } from 'react';
import '../App.css';

class Signin extends Component {
  constructor(props){
    super(props);
    this.state = {
        username: '',
        password: ''
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
    fetch('http://localhost:3001/signin', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            username, password
        })
    })
        .then(response => response.json())
        .then(user => {
            if (user.userid){
                this.props.loadUser(user)
                this.props.RouteChange('home')
            }
        })
}

    render (){
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
                    <a className="link" onClick={() => this.props.RouteChange('register')}>
                        Sign Up
                    </a>
                </p>
            </div>
        );
    }
}

export default Signin;
