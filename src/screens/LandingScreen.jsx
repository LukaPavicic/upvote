import React from 'react'
import {Redirect} from 'react-router-dom'

export default class LandingScreen extends React.Component {
    render() {
        if(localStorage.getItem('authToken') !== null) {
            return <Redirect to="/"/> 
        } else {
            return (
                <div>
                    hjgfroegjhreoi
                </div>
            )
        }        
    }
}