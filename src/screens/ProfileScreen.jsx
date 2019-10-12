import React from 'react'
import '../css/homescreen.css'
import axios from "axios"
import moment from "moment"
import PostItem from '../components/Homescreen/PostItem'
import {Link} from 'react-router-dom'

export default class ProfileScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            user_info: null,
            isLoading: true,
            user_not_found: false,
        }
    }

    _getUserData = () => {
        axios.get(`http://127.0.0.1:8000/api/users/${this.props.match.params.id}/`, {
            headers: {
                'Authorization': `Token ${localStorage.getItem('authToken')}`
            }
        }).then(res => {
            console.log(res.data)
            this.setState({
                user_info: res.data.user_info,
                user_posts: res.data.user_posts,
                isLoading: false,
            })
        }).catch(err => {            
            this.setState({
                user_not_found: true,
                isLoading: false,
            })            
        })
    }

    updatePostData = (postId, index) => {
        axios.get(`http://127.0.0.1:8000/api/posts/${postId}/`, {
          headers: {
            'Authorization': `Token ${localStorage.getItem('authToken')}`
          }
        }).then(res => {
          this.state.user_posts[index] = res.data.post_data
          this.forceUpdate()      
        }).catch(err => {
          console.log(err)
        })
    }
    

    componentDidMount() {
        this._getUserData()
    }

    render() {
        if(this.state.isLoading) {
            return (
                <div className="homescreen-wrapper">
                    <div className="container">
                        Loading...
                    </div>
                </div>
            )
        } else {
            if(!this.state.user_not_found) {
                return (
                    <div className="homescreen-wrapper">
                        <div className="container">
                            <div class="card text-center">
                                <div className="card-header">
                                    User Profile
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{this.state.user_info.username}</h5>
                                    <p className="card-text"><b>Joined: </b>{moment(this.state.user_info.created_at).fromNow()}</p>
                                    <p className="card-text"><b>Upvote points: </b>{this.state.user_info.upvotes}</p>                                    
                                </div>                                
                            </div>
                            <div style={{width: "80%"}}>
                                <h2>User Posts</h2>
                                {this.state.user_posts.map((post, index) => (
                                    <Link style={{color: "black", textDecoration: "none"}} to={`/post/${post.id}`}>
                                        <PostItem post={post} postIndex={index} key={post.id} style={{width: "100%"}} updatePostData={this.updatePostData}/>
                                    </Link>                                    
                                ))}
                            </div>               
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="homescreen-wrapper">
                        <div className="container">
                            <div className="user-not-found">
                                <img src="/undraw_void_3ggu.svg" alt="User not found" width="30%"/>
                                <h2>User not found</h2>
                            </div>                            
                        </div>
                    </div>
                )
            }                 
        }        
    }
}