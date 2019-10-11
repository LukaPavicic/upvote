import React from 'react';
import '../css/homescreen.css';
import {Redirect, Link} from 'react-router-dom'
import axios from 'axios'
import PostItem from '../components/Homescreen/PostItem'


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
    axios.get('http://127.0.0.1:8000/api/userjoinedcommunities/', {
      headers: {
        'Authorization': `Token ${localStorage.getItem('authToken')}`
      }
    }).then(res => {      
      this.setState({
        joined_communities: res.data.joined_communities,        
      })
    }).catch(err => {
      console.log(err)
      // window.location.replace('/servererror')
    })
  }

  _getPosts = () => {
    axios.get('http://127.0.0.1:8000/api/posts/', {
      headers: {
        'Authorization': `Token ${localStorage.getItem('authToken')}`
      }
    }).then(res => {
      this.setState({
        posts: res.data.reverse(),
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

  render() {
      if(localStorage.getItem('authToken') !== null) {
        if(!this.state.isLoading) {
          return (
            <div className="homescreen-wrapper">
              <div className="container">
                <div className="row">
                  <div className="col-lg-8 col-md-8 col-xs-12">
                    <h5>Posts</h5>
                    {this.state.posts.map(post => (
                      <Link style={{textDecoration: "none", color: "black"}} to={`/post/${post.id}`}>
                        <PostItem key={post.id} post={post}/>
                      </Link>                      
                    ))}
                  </div>
                  <div className="col-lg-4 col-md-4 col-xs-0 position-sticky">                
                    <h5>Joined communities</h5>
                    <ul className="list-group">
                      {(this.state.joined_communities.length===0) ? <p className="lead">You haven't joined any communities.</p> : this.state.joined_communities.map((community) => (
                        <Link style={{color: "black", textDecoration: "none"}} to={`/community/${community.id}`}><li key={community.id} className="list-group-item joined-com-item">{community.name}</li></Link>
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
          <Redirect to="/login"/>
        )
      }       
  }
}
