import React from 'react';
import '../css/homescreen.css';
import {Redirect} from 'react-router-dom'
import axios from 'axios'

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      joined_communities: [],
      isLoading: true,
    }
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/userjoinedcommunities/', {
      headers: {
        'Authorization': `Token ${localStorage.getItem('authToken')}`
      }
    }).then(res => {
      console.log("here")
      this.setState({
        joined_communities: res.data.joined_communities,
        isLoading: false,
      })
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
                    {this.state.posts.map(post => (
                      <div key={post.id} className="single-post-wrapper">
    
                      </div>
                    ))}
                  </div>
                  <div className="col-lg-4 col-md-4 col-xs-0 position-sticky">                
                    <h5>Joined communities</h5>
                    <ul className="list-group">
                      {this.state.joined_communities.map((community) => (
                        <li key={community.id} className="list-group-item">{community.name}</li>
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
                <h1>Loading...</h1>
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
