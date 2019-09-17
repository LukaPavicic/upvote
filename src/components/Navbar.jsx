import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPencilAlt, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import '../css/navbar.css'

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
          <button className="btn btn-primary" style={{marginLeft: "10px"}}>LOGIN</button>
          <button className="btn btn-primary" style={{marginLeft: "10px"}}>REGISTER</button>
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
        <a className="navbar-brand" href="#"><FontAwesomeIcon icon={faArrowUp} className="create-post-icon"/> UPVOTE</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
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
