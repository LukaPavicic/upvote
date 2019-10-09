import React from 'react'
import '../../css/homescreen.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faArrowUp, faComments, faBookmark } from '@fortawesome/free-solid-svg-icons';
import moment from "moment"
import {Link} from 'react-router-dom'


export default class PostItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div className="single-post-wrapper">
                <div className="single-post-top">
                    <h4>{this.props.post.title}</h4>
                    <span className="lead">Posted by <Link to={`/users/${this.props.post.author.id}/`} className="author-link">{this.props.post.author.username}</Link> in <span className="author-link">{this.props.post.community.name}</span> community {moment(this.props.post.created_at).fromNow()}</span>
                    {(this.props.post.description === "") ? null : <p className="post-description">{this.props.post.description}</p>}
                </div>  
                <div className="single-post-bottom">
                    <div className="single-post-bottom-left">
                        <div>
                            <FontAwesomeIcon icon={faArrowUp}/>
                            <span style={{marginLeft: "5px", fontSize: "18px"}}>0</span>
                        </div>
                        {this.props.single ? null : <div style={{marginLeft: "20px", cursor: "pointer"}}>
                            <FontAwesomeIcon icon={faComments} color={"#e67e22"}/>
                            <span style={{marginLeft: "5px", fontSize: "18px", color: "#e67e22"}}>Comments</span>
                        </div>}
                        <div style={{marginLeft: "20px", cursor: "pointer"}}>
                            <FontAwesomeIcon icon={faBookmark} color={"#e67e22"}/>
                            <span style={{marginLeft: "5px", fontSize: "18px", color: "#e67e22"}}>Save</span>
                        </div>
                    </div>
                    <div className="single-post-bottom-right"></div>
                </div>              
            </div>
        )
    }
}