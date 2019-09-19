import React from 'react';
import '../../css/auth.css';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class RegisterScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      emailField: "",
      usernameField: "",
      passwordField: "",
      confirmPasswordField: "",
      emailFieldColor: "#e8e8e8",
      usernameFieldColor: "#e8e8e8",
      passwordFieldColor: "#e8e8e8",
      confirmPasswordFieldColor: "#e8e8e8",
    }
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/users/', {
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(res => {
      console.log(res.data);
    }).catch(err => {
      console.log(err);
    })
  }

  _handleEmailInput = (event) => {
    this.setState({
      emailField: event.target.value,
    })
  }

  _handleUsernameInput = (event) => {
      this.setState({
          usernameField: event.target.value,
      })
  }

  _handlePasswordInput = (event) => {
    this.setState({
      passwordField: event.target.value,
    })
  }

  _handleConfirmPasswordInput = (event) => {
    this.setState({
      confirmPasswordField: event.target.value,
    })
  }

  _handleRegisterButtonPress = () => {
    let can_send_req = true;

    if(this.state.emailField.length === 0) {      
      this.setState({
        emailFieldColor: "red",
      })
      can_send_req = false;
    } else {
      this.setState({
        emailFieldColor: "#e8e8e8",
      })
    }

    if(this.state.usernameField.length === 0) {
      this.setState({
        usernameFieldColor: "red",
      })
      can_send_req = false;
    } else {
      this.setState({
        emailFieldColor: "#e8e8e8",
      })
    }

    if(this.state.passwordField.length === 0) {
      this.setState({
        passwordFieldColor: "red",
      })
      can_send_req = false;
    } else {
      this.setState({
        emailFieldColor: "#e8e8e8",
      })
    }

    if(this.state.confirmPasswordField.length === 0) {
      this.setState({
        confirmPasswordFieldColor: "red",
      })
      can_send_req = false;
    } else {
      this.setState({
        emailFieldColor: "#e8e8e8",
      })
    }

    if(can_send_req && this.state.passwordField === this.state.confirmPasswordField) {
      let formData = new FormData();
      formData.set('email', this.state.emailField);
      formData.set('username', this.state.usernameField);
      formData.set('password', this.state.passwordField);
      axios({
        method: 'POST',
        data: formData,
        url: 'http://127.0.0.1:8000/api/users/',
        config: {headers: {'Content-Type': 'multipart/form-data'}}
      }).then(request => {
        console.log(request.data);
      }).catch(err => {
        console.log(err);
      })
    }
  }

  render() {
    return (
      <div className="top-wrapper">
        <div className="container">
          <div className="form-wrapper">
            <div className="form-top">
              <img src="/mainlogo.png" alt="logo" width="55%"/>
            </div>
            <div className="form-bottom">
              <h2>REGISTER</h2>
              <input style={{borderColor: this.state.emailFieldColor}} onChange={this._handleEmailInput} value={this.state.emailField} className="login-input" type="text" placeholder="Email..."/>
              <input style={{borderColor: this.state.usernameFieldColor}} onChange={this._handleUsernameInput} value={this.state.usernameField} className="login-input" type="text" placeholder="Username..."/>
              <input style={{borderColor: this.state.passwordFieldColor}} onChange={this._handlePasswordInput} value={this.state.passwordField} className="login-input" type="password" placeholder="Password..."/>
              <input style={{borderColor: this.state.confirmPasswordFieldColor}} onChange={this._handleConfirmPasswordInput} value={this.state.confirmPasswordInput} className="login-input" type="password" placeholder="Confirm Password..."/>
              <button onClick={() => this._handleRegisterButtonPress()} className="btn btn-primary submit-button">REGISTER</button>
              <Link to="/login">Already have an account?</Link>              
            </div>
          </div>
        </div>
      </div>
    )
  }
}
