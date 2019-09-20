import React from 'react';
import '../css/homescreen.css';

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      userAuthenticated: false,
      user: {
        joined_communities: [
          {id: 1, name: 'Programming'},
          {id: 2, name: 'Gaming'},
          {id: 5, name: 'Trucking'},
          {id: 76, name: 'DankMemes'},
          {id: 33, name: 'Django'},
        ]
      },
      top_communities: [{'id': 1, 'name': 'WebDevelopment'}, {'id': 23, 'name': 'Memes'}]
    }
  }

  render() {
      if(this.state.userAuthenticated) {
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
                    {this.state.user.joined_communities.map((community) => (
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
            <div className="row">
                <div className="col-lg-8 col-md-8 col-xs-12">
                  <h5>Recent Posts</h5>
                  {this.state.posts.map(post => (
                    <div key={post.id} className="single-post-wrapper">
  
                    </div>
                  ))}
                </div>
                <div className="col-lg-4 col-md-4 col-xs-0 position-sticky">                
                  <h5>Popular Communities</h5>
                  <ul className="list-group">
                    {this.state.user.joined_communities.map((community) => (
                      <li key={community.id} className="list-group-item">{community.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      }       
  }
}
