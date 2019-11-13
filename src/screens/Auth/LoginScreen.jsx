import React from 'react';
import '../../css/auth.css';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import {API_ROOT} from '../../apiconf'

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

  _onSubmit = () => {
    let formData = new FormData();
    formData.set('username', this.state.emailField);
    formData.set('password', this.state.passwordField);
    axios({
      method: "POST",
      data: formData,
      url: `${API_ROOT}/api/login/`,
      config: {headers: {'Content-Type': 'multipart/form-data'}}
    }).then(res => {
      localStorage.setItem('authToken', res.data.token)   
      this.props.history.push('/')      
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    if(localStorage.getItem('authToken') === null) {
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
                <button onClick={() => this._onSubmit()} className="btn btn-primary submit-button">LOGIN</button>
                <Link to="/register">Don't have an account?</Link>
                <img src="/undraw_authentication_fsn5.svg" alt="login illustration" className="login-svg"/>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <Redirect to="/"/>
      )
    }  
  }
}
