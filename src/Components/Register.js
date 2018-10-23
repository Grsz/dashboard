import React from 'react';
import '../App.css';

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
            passwordConfirm: '',
            profimg: null
        }
    }
    onNameChange = event => {
        this.setState({name: event.target.value})
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
        const { email, password, passwordConfirm, name, profimg } = this.state;
        let data = new FormData();
        data.append('profimg', profimg);
        data.append('email', email);
        data.append('password', password);
        data.append('passwordConfirm', passwordConfirm);
        data.append('name', name);
        fetch('http://localhost:3001/register ', {
            method: 'post',
            body: data
        })
        .then(response => response.json())
        .then(user => {
            console.log(user)
            if (user.userid){
                this.props.loadUser(user)
                this.props.RouteChange('home')
            }
        })
        .catch(err => console.log(err))
    }
    render(){
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
            </div>
        );
    }
}

export default Register;