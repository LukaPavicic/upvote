import React from 'react'
import '../../css/communities.css'
import {Link} from 'react-router-dom'

export default class Community extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
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
                    <Link style={{textDecoration: "none", position: "absolute", bottom: "40px", right: "40px"}}>
                        <span style={{color: "#e67e22"}}>JOIN</span>
                    </Link>
                </div>
            </div>
        )
    }
}