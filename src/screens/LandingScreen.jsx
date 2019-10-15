import React from 'react'
import {Redirect, Link} from 'react-router-dom'
import '../css/master.css'
import '../css/landingscreen.css'

export default class LandingScreen extends React.Component {
    render() {
        if(localStorage.getItem('authToken') !== null) {
            return <Redirect to="/"/> 
        } else {
            return (
                <div class="landing-screen-wrapper">
                    <div className="container">
                        <div className="lnd-main-box">
                            <h1>Welcome to</h1>
                            <img src="/mainlogo.png" alt="logo"/>
                            <p>Share your experiences, thoughts or anything else with people in communities you like!</p>
                            <div className="login-or-register-wrapper">
                                <Link to={"/login"} className="btn btn-primary">LOGIN</Link>
                                <span>or</span>
                                <Link to={"/register"} className="btn btn-primary">REGISTER</Link>
                                <span>to start using UPVOTE</span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }        
    }
}