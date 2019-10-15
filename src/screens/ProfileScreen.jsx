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

    _showUploadFile = () => {
        document.getElementById('changeProfilePicture').click()
    }

    _onChangeFile = (event) => {
        let formData = new FormData()
        formData.append('profile_image', event.target.files[0])
        axios.patch(`http://127.0.0.1:8000/api/users/${this.state.user_info.id}/`, formData, {
            headers: {
                'Authorization': `Token ${localStorage.getItem('authToken')}`
            }
        }).then(res => {
            this._getUserData()
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })
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
                            <div className="row com-description" style={{marginBottom: "30px"}}>
                                <div className="col-lg-8 col-md-8 col-xs-12 com-desc-left">
                                <h1>{this.state.user_info.username}</h1>
                                <p>
                                    Joined {moment(this.state.user_info.created_at).fromNow()} | Posted {this.state.user_posts.length} post(s)
                                </p> 
                                </div>
                                <div className="col-lg-4 col-md-4 col-xs-12 com-desc-right">
                                    {/* <img src={`http://localhost:8000${this.state.user_info.profile_image}`} height="100%" alt="img"/> */}
                                    <div className="profile-picture-wrapper" 
                                    style={{backgroundImage: `url(http://localhost:8000${this.state.user_info.profile_image})`, 
                                    backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center",
                                    width: "150px", height: "150px", borderRadius: "75px", display: "flex", alignItems: "center", justifyContent: "center"}} 
                                    onClick={this._showUploadFile}>
                                        <input onChange={this._onChangeFile} type="file" id="changeProfilePicture" style={{display: "none"}}/>
                                        <b><span className="change-prof-pic-text">CHANGE</span></b>
                                    </div>
                                </div>
                            </div>
                            <div style={{width: "100%"}}>
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