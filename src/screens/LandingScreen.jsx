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
                <div className="landing-screen-wrapper">
                    <div className="container">
                        <img src="/mainlogo.png"/>
                        <p className="lead">Join UPVOTE today to share your experiences with people who have similar interests.</p>
                        <div className="log-reg-buttons">
                            <Link to="/login" className="btn btn-primary" style={{marginRight: "20px"}}>LOGIN</Link>
                            <Link to="/register" className="btn btn-primary">REGISTER</Link>
                        </div>
                    </div>
                </div>
            )
        }        
    }
}