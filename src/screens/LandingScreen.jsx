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
                        gg
                    </div>
                </div>
            )
        }        
    }
}