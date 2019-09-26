import React from 'react'
import '../css/master.css'

export default class ServerErrorScreen extends React.Component {

_tryAgain = () => {
        window.location.replace('/')
    }

    render() {
        return (
            <div className="background-main" style={{width: "100%", height: "100%", display: "flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                <img src="/undraw_server_down_s4lk.svg" alt="500 Server Error" height="45%"/>
                <h1 style={{marginTop: "50px"}}>500 Internal Server Error</h1>
                <button onClick={this._tryAgain} className="btn btn-primary">TRY AGAIN</button>
            </div>
        )
    }
}