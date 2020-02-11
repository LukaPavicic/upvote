import React from 'react'
import '../../css/homescreen.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faArrowUp, faComments, faBookmark, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import moment from "moment"
import {Link} from 'react-router-dom'
import axios from 'axios'
import {API_ROOT} from '../../apiconf'


export default class PostItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    _delete = () => {
        axios.delete(`${API_ROOT}/api/posts/${this.props.post.id}/`, {
            headers: {
                'Authorization': `Token ${localStorage.getItem('authToken')}`
            }
        }).then(res => {
            console.log(res.data)
            this.props.refreshPosts()
        }).catch(err => {
            console.log(err)
        })
    }

    _renderDelete = () => {
        if(this.props.canBeDeleted) {
            return (
                <div>
                {(this.props.currentUserId === this.props.post.author.id) ? 
                    <Link onClick={() => this._delete()} style={{marginLeft: "20px", textDecoration: "none"}}>
                        <FontAwesomeIcon icon={faTrash} color="red"/>
                        <span style={{marginLeft: "5px", fontSize: "18px", color: "red"}}>Delete</span>
                    </Link> : null}
                </div>
            );
        } else {
            return null;
        }
    }

    _save = () => {
        axios.post(`${API_ROOT}/api/save/`, {
            post: this.props.post.id
        }, {
            headers: {
                'Authorization': `Token ${localStorage.getItem('authToken')}`
            }
        }).then(res => {
            this.props.updatePostData(this.props.post.id, this.props.postIndex)
        }).catch(err => {
            console.log(err)
        })
    }

    _upvote = () => {
        axios.post(`${API_ROOT}/api/upvote/`, {
            post: this.props.post.id
        }, {
            headers: {
                'Authorization': `Token ${localStorage.getItem('authToken')}`
            }
        }).then(res => {
            this.props.updatePostData(this.props.post.id, this.props.postIndex)
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <div className="single-post-wrapper">
                <div className="single-post-top">
                    <h4>{this.props.post.title}</h4>
                    <span className="lead">Posted by <Link to={`/users/${this.props.post.author.id}/`} className="author-link">{this.props.post.author.username}</Link> in <Link to={`/community/${this.props.post.community.id}`} className="author-link">{this.props.post.community.name}</Link> community {moment(this.props.post.created_at).fromNow()}</span>
                    {(this.props.post.description === "") ? null : <p className="post-description">{this.props.post.description}</p>}
                    {(typeof this.props.post.post_image === "undefined" || this.props.post.post_image === null || this.props.post.post_image === "") ? null : (
                        <div style={{width: "100%", display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <img src={this.props.post.post_image} style={{maxWidth: "80%", margin: "10px 0px"}}/>
                        </div>
                    )}
                </div>  
                <div className="single-post-bottom">
                    <div className="single-post-bottom-left">
                        <Link style={{textDecoration: "none"}} onClick={() => this._upvote()}>
                            <FontAwesomeIcon icon={faArrowUp} color={(this.props.post.has_user_upvoted === 0) ? "black" : "#e67e22"}/>
                            <span style={{marginLeft: "5px", fontSize: "18px"}}>{this.props.post.post_upvotes}</span>
                        </Link>
                        {this.props.single ? null : <div style={{marginLeft: "20px", cursor: "pointer"}}>
                            <FontAwesomeIcon icon={faComments} color={"#e67e22"}/>
                            <span style={{marginLeft: "5px", fontSize: "18px", color: "#e67e22"}}>Comments</span>
                        </div>}
                        <Link onClick={() => this._save()} style={{marginLeft: "20px", textDecoration: "none"}}>
                            <FontAwesomeIcon icon={(this.props.post.has_user_saved === 1) ? faCheck : faBookmark} color={"#e67e22"}/>
                            <span style={{marginLeft: "5px", fontSize: "18px", color: "#e67e22"}}>{(this.props.post.has_user_saved === 1) ? "Saved" : "Save"}</span>
                        </Link>
                        {this._renderDelete()}
                    </div>
                    <div className="single-post-bottom-right"></div>
                </div>              
            </div>
        )
    }
}