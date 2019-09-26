import React from 'react'
import {Redirect, Link} from 'react-router-dom'
import '../css/master.css'

export default class LandingScreen extends React.Component {
    render() {
        if(localStorage.getItem('authToken') !== null) {
            return <Redirect to="/"/> 
        } else {
            return (
                <div class="full-wh">
                    <div className="background-main center-xy">
                        <Link to="/login/">login</Link>
                        <Link to="/register/">register</Link>
                    </div>
                </div>
            )
        }        
    }
}