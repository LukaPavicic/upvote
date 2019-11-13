import React from 'react'
import '../../css/communities.css'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { API_ROOT } from '../../apiconf';

export default class Community extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    _joinCommunity = () => {
        axios.post(`${API_ROOT}/api/userjoinedcommunities/`, {
            community: this.props.community.id
        }, {
            headers: {
                'Authorization': `Token ${localStorage.getItem('authToken')}`
            }
        }).then(res => {
            this.props.updateCommunityData(this.props.community.id, this.props.communityIndex)
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <div className="community-card-wrapper">
                <div className="com-card-left">
                    <div className="com-card-img-wrapper" 
                    style={{backgroundImage: `url(${this.props.community.community_image})`, 
                    backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center"}}>
                    </div>
                </div>
                <div className="com-card-right">
                    <h4 style={{color: "black", fontSize: "120%"}}>{this.props.community.name}</h4>
                    {(this.props.community.description.length === 0) ? <p className="lead">This community has no description</p> : 
                    <p className="lead">{this.props.community.description.substring(0,38)}</p>}
                    {this.props.community.has_user_joined ? 
                    (<Link onClick={this._joinCommunity} style={{textDecoration: "none", position: "absolute", bottom: "40px", right: "40px"}}>
                        <span style={{color: "#e67e22"}}>LEAVE</span>
                    </Link>) 
                    : 
                    (<Link onClick={this._joinCommunity} style={{textDecoration: "none", position: "absolute", bottom: "40px", right: "40px"}}>
                        <span style={{color: "#e67e22"}}>JOIN</span>
                    </Link>)}
                </div>
            </div>
        )
    }
}