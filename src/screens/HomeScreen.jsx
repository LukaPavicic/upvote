import React from 'react';
import '../css/homescreen.css';
import {Redirect, Link} from 'react-router-dom'
import axios from 'axios'
import PostItem from '../components/Homescreen/PostItem'
import {API_ROOT} from '../apiconf'

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      joined_communities: [],
      isLoading: true,
    }
  }

  _getUserJoinedCommunities = () => {
    axios.get(`${API_ROOT}/api/userjoinedcommunities/`, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('authToken')}`
      }
    }).then(res => {      
      this.setState({
        joined_communities: res.data.joined_communities,        
      })
      console.log(res.data.joined_communities)
    }).catch(err => {
      console.log(err)
      // window.location.replace('/servererror')
    })
  }

  _getPosts = () => {
    axios.get(`${API_ROOT}/api/userrelevantposts/`, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('authToken')}`
      }
    }).then(res => {
      this.setState({
        posts: res.data.posts.reverse(),
        isLoading: false,
      })
    }).catch(err => {
      console.log(err)
      // window.location.replace('/servererror')
    })
  }

  componentDidMount() {
    this._getUserJoinedCommunities()
    this._getPosts()
  }

  updatePostData = (postId, index) => {
    axios.get(`${API_ROOT}/api/posts/${postId}/`, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('authToken')}`
      }
    }).then(res => {
      this.state.posts[index] = res.data.post_data
      this.forceUpdate()      
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
      if(localStorage.getItem('authToken') !== null) {
        if(!this.state.isLoading) {
          return (
            <div className="homescreen-wrapper">
              <div className="container">
                <div className="row">
                  <div className="col-lg-8 col-md-8 col-xs-12">
                    <h5>Posts</h5>
                    {this.state.posts.map((post,index) => (
                      <Link style={{textDecoration: "none", color: "black"}} to={`/post/${post.id}`}>
                        <PostItem postIndex={index} key={post.id} post={post} updatePostData={this.updatePostData}/>
                      </Link>                      
                    ))}
                  </div>
                  <div className="col-lg-4 col-md-4 col-xs-0 position-sticky">                
                    <h5>Joined communities</h5>
                    <ul className="list-group">
                      {(this.state.joined_communities.length===0) ? <p className="lead">You haven't joined any communities.</p> : this.state.joined_communities.map((community) => (
                        <Link style={{color: "black", textDecoration: "none"}} to={`/community/${community.id}`} key={community.id}>                          
                          <li className="list-group-item joined-com-item">  
                            <div style={{width: "30px", height: "30px", borderRadius: "15px", marginRight: "5px", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundImage: `url('${API_ROOT}/${community.community_image}')`}}>
                            </div>
                            {community.name}
                          </li>
                        </Link>
                      ))}
                    </ul>
                  </div>
                </div>          
              </div>
            </div>        
          )
        } else {
          return (
            <div className="homescreen-wrapper"> 
              <div className="container">
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
              </div>
            </div>
          )
        }
      } else {
        return (
          <Redirect to="/welcome"/>
        )
      }       
  }
}
