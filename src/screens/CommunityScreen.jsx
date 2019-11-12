import React from 'react'
import '../css/homescreen.css'
import '../css/communities.css'
import '../css/master.css'
import axios from 'axios'
import PostItem from '../components/Homescreen/PostItem'
import {Link} from 'react-router-dom'
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

class CommunityScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
        }
    }

    _getCommunity = () => {
        axios.get(`http://127.0.0.1:8000/api/communities/${this.props.match.params.id}/`, {
            headers: {
                'Authorization': `Token ${localStorage.getItem('authToken')}`
            }
        }).then(res => {
            this.setState({
                community_data: res.data.community_data,
                community_posts: res.data.community_posts.reverse(),
                isLoading: false,
            })
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    _getCurrentUserId = () => {
        axios.get('http://127.0.0.1:8000/api/getcurrentuserid/', {
            headers: {
                'Authorization': `Token ${localStorage.getItem('authToken')}`
            }
        }).then(res => {
            this.setState({
                currentUserId: res.data.user_id
            })
        })
    }

    updatePostData = (postId, index) => {
        axios.get(`http://127.0.0.1:8000/api/posts/${postId}/`, {
          headers: {
            'Authorization': `Token ${localStorage.getItem('authToken')}`
          }
        }).then(res => {
          this.state.community_posts[index] = res.data.post_data
          this.forceUpdate()      
        }).catch(err => {
          console.log(err)
        })
    }

    _deleteCommunity = () => {
        if(window.confirm('Are you sure you want to delete this community?')) {
            axios.delete(`http://127.0.0.1:8000/api/communities/${this.state.community_data.id}/`, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('authToken')}`
                }
            }).then(res => {
                window.location.replace('/');
            }).catch(err => {
                console.log(err)
            })
        }
    }

    componentDidMount() {
        this._getCurrentUserId()
        this._getCommunity()
    }

    render() {
        if(!this.state.isLoading) {
            return (
                <div className="homescreen-wrapper">
                    <div className="container">
                        <div className="row com-description" style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.7) ,rgba(0,0,0,0.7)), url(${this.state.community_data.community_image})`,
                        backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center", backgroundBlendMode: "luminosity",
                        backgroundColor: "white",}}>
                            <div className="col-lg-8 col-md-8 col-xs-12 com-desc-left">
                            <h1>{this.state.community_data.name}</h1>
                            <p>
                                {this.state.community_data.description}
                            </p> 
                            </div>
                            <div className="col-lg-4 col-md-4 col-xs-12 com-desc-right">
                                <div className="com-right-img-wrapper"
                                 style={{width: "200px", height: "200px", borderRadius: "100px",
                                  backgroundImage: `url(${this.state.community_data.community_image})`,
                                  backgroundRepeat: "no-repeat", backgroundPosition: "center",
                                  backgroundSize: "cover"}}>

                                </div>
                                {(this.state.currentUserId !== this.state.community_data.created_by) ? null : 
                                <div className="edit-community" onClick={this._deleteCommunity}>
                                   <FontAwesomeIcon icon={faTrash} color="white" size={"25px"}/> 
                                </div>}
                            </div>                            
                        </div>
                        <h3>Community Posts</h3>
                        {this.state.community_posts.map((post, index) => (
                        <Link style={{textDecoration: "none", color: "black", width: "100%"}} to={`/post/${post.id}`}>
                            <PostItem key={post.id} post={post} postIndex={index} updatePostData={this.updatePostData}/>
                        </Link>                      
                        ))}
                    </div>
                </div>
            )
        } else {
            return (
                <div className="homescreen-wrapper">
                    <div className="container">
                        Loading...
                    </div>
                </div>
            )
        }    
    }
}

export default CommunityScreen;