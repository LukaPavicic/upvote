import React from 'react';
import '../../css/auth.css';
import {Link} from 'react-router-dom';

export default class LoginScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      emailField: "",
      passwordField: "",
    }
  }

  _handleEmailInput = (event) => {
    this.setState({
      emailField: event.target.value,
    })
  }

  _handlePasswordnput = (event) => {
    this.setState({
      passwordField: event.target.value,
    })
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
              <h2>LOGIN</h2>
              <input onChange={this._handleEmailInput} value={this.state.emailField} className="login-input" type="text" placeholder="Email..."/>
              <input onChange={this._handlePasswordnput} value={this.state.passwordField} className="login-input" type="password" placeholder="Password..."/>
              <button className="btn btn-primary submit-button">LOGIN</button>
              <Link to="/login">Forgot your password?</Link>
              <img src="/undraw_authentication_fsn5.svg" alt="login illustration" className="login-svg"/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
