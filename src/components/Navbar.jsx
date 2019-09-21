import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPencilAlt, faPowerOff, faUser } from '@fortawesome/free-solid-svg-icons';
import '../css/navbar.css';
import {Link} from 'react-router-dom';

export default class Navbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      'userToken': "",
    }
  }

  _logout = () => {
    localStorage.removeItem('authToken')
    window.location.replace("http://localhost:3000/welcome/")
  }

  render() { 
    if(localStorage.getItem('authToken') !== null) {   
      return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/"><img src="/mainlogo.png" height="45" className="d-inline-block align-top" alt="logo"/></Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Communities</a>
              </li>
              <li className="nav-item">
                <Link className="nav-link create-post-text" to="/newpost">Post <FontAwesomeIcon icon={faPencilAlt} className="create-post-icon"/></Link>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
              <button className="btn btn-primary" type="submit">Search</button>
              {/* <button onClick={() => this._logout()} className="btn btn-primary" style={{marginLeft: "10px"}}>LOGOUT</button> */}
              <div className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Account
                </a>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="#"><FontAwesomeIcon style={{marginRight: "5px"}} color="#e67e22" icon={faUser}/>View Profile</a>                
                  <div className="dropdown-divider"></div>
                  <span onClick={() => this._logout()} className="dropdown-item"><FontAwesomeIcon style={{marginRight: "5px"}} color="#e67e22" icon={faPowerOff}/>Logout</span>
                </div>
              </div>
            </form>
          </div>
        </nav>
      ) 
    } else {
      return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/welcome"><img src="/mainlogo.png" height="45" className="d-inline-block align-top" alt="logo"/></Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/welcome">Home <span className="sr-only">(current)</span></Link>
              </li>              
            </ul>            
          </div>
        </nav>
      )
    } 
  }
}
