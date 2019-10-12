import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPencilAlt, faPowerOff, faUser } from '@fortawesome/free-solid-svg-icons';
import '../css/navbar.css';
import {Link, Redirect, withRouter} from 'react-router-dom';
import axios from 'axios';

class Navbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      redirect_to_current_profile: false,      
    }
  }

  _logout = () => {
    localStorage.removeItem('authToken')
    window.location.replace("/welcome/")
  }

  _goToCurrentProfile = () => {
    axios.get('http://127.0.0.1:8000/api/getcurrentuserid/', {
      headers: {
        'Authorization': `Token ${localStorage.getItem('authToken')}`
      }
    }).then(res => {        
      // this.setState({
      //   current_user_id: res.data.user_id,
      //   redirect_to_current_profile: true,
      // })
      window.location.replace(`/users/${res.data.user_id}/`)
    }).catch(err => {
      console.log(err)
    })
  }

  render() { 
    if(this.props.location.pathname !== "/servererror") {
      if(localStorage.getItem('authToken') !== null) {
        if(this.state.redirect_to_current_profile){
          return <Redirect to={`/user/${this.state.current_user_id}`}/>
        } else {  
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
                    <Link className="nav-link" to="/communities">Communities</Link>
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
                      <span onClick={this._goToCurrentProfile} className="dropdown-item"><FontAwesomeIcon style={{marginRight: "5px"}} color="#e67e22" icon={faUser}/>View Profile</span>                
                      <div className="dropdown-divider"></div>
                      <span onClick={() => this._logout()} className="dropdown-item"><FontAwesomeIcon style={{marginRight: "5px"}} color="#e67e22" icon={faPowerOff}/>Logout</span>
                    </div>
                  </div>
                </form>
              </div>
            </nav>
          ) 
        }
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
    } else {
      return null
    }
  }
}

export default withRouter(Navbar);