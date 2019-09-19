import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import '../css/navbar.css';
import {Link} from 'react-router-dom';

export default class Navbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      'userToken': "",
    }
  }

  displayAccountManagement = () => {
    if(this.state.userToken === "") {
      return (
        // login and register buttons
        <div>
          <Link to="/login" className="btn btn-primary" style={{marginLeft: "10px"}}>LOGIN</Link>
          <Link to="/register" className="btn btn-primary" style={{marginLeft: "10px"}}>REGISTER</Link>
        </div>
      )
    } else {
      return (
        // profile management
        <div></div>
      )
    }
  }

  render() {
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
              <a className="nav-link create-post-text" href="#">Post <FontAwesomeIcon icon={faPencilAlt} className="create-post-icon"/></a>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-primary" type="submit">Search</button>
            {this.displayAccountManagement()}
          </form>
        </div>
      </nav>
    )
  }
}
