import React from 'react'
import '../css/homescreen.css'
import axios from 'axios'
import PostItem from '../components/Homescreen/PostItem'
import {API_ROOT} from '../apiconf'

export default class SavedPostsScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
        }
    }

    _getUserSavedPosts = () => {
        axios.get(`${API_ROOT}/api/save/`, {
            headers: {
                'Authorization': `Token ${localStorage.getItem('authToken')}`
            }
        }).then(res => {
            this.setState({
                saved_posts: res.data.saved_posts,
                isLoading: false,
            })
        })
    }

    componentDidMount() {
        this._getUserSavedPosts()
    }

    updatePostData = (postId, index) => {
        axios.get(`${API_ROOT}/api/posts/${postId}/`, {
          headers: {
            'Authorization': `Token ${localStorage.getItem('authToken')}`
          }
        }).then(res => {
          this.state.saved_posts[index].post = res.data.post_data
          this.forceUpdate()      
        }).catch(err => {
          console.log(err)
        })
    }

    render() {
        if (this.state.isLoading) {
            return (
                <div className="homescreen-wrapper">
                    <div className="container">
                        Loading...            
                    </div>
                </div>
            )
        } else {
            return (
                <div className="homescreen-wrapper">
                    <div className="container">
                        <div className="row com-description" style={{marginBottom: "30px"}}>
                            <div className="col-lg-8 col-md-8 col-xs-12 com-desc-left">
                            <h1>Saved Posts</h1>
                            <p>
                                Here you will find all posts that you saved!
                            </p> 
                            </div>
                            <div className="col-lg-4 col-md-4 col-xs-12 com-desc-right">
                                <img src="/undraw_collecting_fjjl.svg" height="100%" alt="img"/>
                            </div>
                        </div>                        
                        {this.state.saved_posts.map((post, index) => (
                            <PostItem post={post.post} postIndex={index} key={post.post.id} updatePostData={this.updatePostData}/>
                        ))}            
                    </div>
                </div>
            )
        }
    }
}