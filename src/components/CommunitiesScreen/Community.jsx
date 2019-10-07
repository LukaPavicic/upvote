import React from 'react'
import '../../css/communities.css'
import {Link} from 'react-router-dom'
import axios from 'axios'

export default class Community extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    _joinCommunity = () => {
        axios.post('http://127.0.0.1:8000/api/userjoinedcommunities/', {
            community: this.props.community.id
        }, {
            headers: {
                'Authorization': `Token ${localStorage.getItem('authToken')}`
            }
        }).then(res => {
            window.location.replace('/communities')
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <div className="community-card-wrapper">
                <div className="com-card-left">
                    <div className="com-card-img-wrapper"></div>
                </div>
                <div className="com-card-right">
                    <h4 style={{color: "black"}}>{this.props.community.name}</h4>
                    {(this.props.community.description.length === 0) ? <p className="lead">This community has no description</p> : 
                    <p className="lead">{this.props.community.description.substring(0,38)}</p>}
                    <div style={{textDecoration: "none", position: "absolute", bottom: "40px", right: "40px"}}>
                        <span style={{color: "#e67e22"}}>JOIN</span>
                    </div>
                </div>
            </div>
        )
    }
}