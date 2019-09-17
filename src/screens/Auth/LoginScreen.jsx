import React from 'react';
import '../../css/auth.css';

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
              <input onChange={this._handleEmailInput} value={this.state.emailField} className="form-control login-input" type="text" placeholder="Email..."/>
              <input onChange={this._handlePasswordnput} value={this.state.passwordField} className="form-control login-input" type="password" placeholder="Password..."/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
