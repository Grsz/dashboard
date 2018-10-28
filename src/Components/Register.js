import React from 'react';
import '../App.css';
<<<<<<< HEAD
import server from '../server';
=======
import server from './server';
>>>>>>> cf04fdc7177a3630e29ab4b70cbcda08799fdab4

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            username: '',
            passwordConfirm: '',
            profimg: null,
            alert: ""
        }
    }
    onNameChange = event => {
        this.setState({username: event.target.value})
    }
    onEmailChange = event => {
        this.setState({email: event.target.value})
    }
    onPasswordChange = event => {
        this.setState({password: event.target.value})
    }
    onPasswordConfirmationChange = event => {
        this.setState({passwordConfirm: event.target.value})
    }
    fileUpload = event => {
        this.setState({profimg: event.target.files[0]})
    }
    onSubmitSignIn = () => {
        const fields = {
            username: "Username",
            email: "E-mail",
            password: "Password",
            passwordConfirm: "Confirm Password",
            profimg: "profimg"
        };
        const missing = Object.keys(fields).filter(field => !Boolean(this.state[field]) && field !== "profimg").map(key => fields[key]);
        if(missing.length){
            const multiple = missing.length > 1 ? "s" : "";
            const alert = `Please fill the field${multiple}: ${missing.join(", ")}.`
            this.setState({alert})
            return
        } else {
            let data = new FormData();
            Object.keys(fields).forEach(field => data.append(field, this.state[field]));
            fetch(server + 'register', {
                method: 'post',
                body: data
            })
            .then(res => {
                if(!res.ok){
                    throw new Error("Passwords aren't matching")
                } else {
                    return res.json()
                }
            })
            .then(user => {
                if (user.userid){
                    this.props.loadUser(user)
                    this.props.RouteChange('home')
                }
            })
            .catch(err => this.setState({alert: err.message}))
        }
    }
    render(){
        const { alert } = this.state;
        return (
            <div className="form">
                <h1 className="dev">Dev Challenge</h1>
                <div className="inputs">
                    <input 
                    onChange={this.onNameChange}
                    type="text" 
                    name="username"  
                    placeholder="Username"/>
                    <input 
                    onChange={this.onEmailChange}
                    type="email" 
                    name="email"  
                    placeholder="E-mail"/>
                    <input 
                    onChange = {this.onPasswordChange}
                    type="password" 
                    name="password"  
                    placeholder="Password"/>
                    <input 
                    onChange = {this.onPasswordConfirmationChange}
                    type="password"
                    name="passwordConfirm"  
                    placeholder="Confirm Password"/>
                </div>
                
                    <label htmlFor="files" className="upload">Add Picture</label>
                    <input id="files" onChange={this.fileUpload} type="file" />
                <button onClick={this.onSubmitSignIn}>
                    Register
                </button>
                {Boolean(alert) && <p className="alert">{alert}</p>}
            </div>
        );
    }
}

export default Register;