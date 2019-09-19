import React from 'react';
import '../css/homescreen.css';

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [{'title': "ETS2 is epic", 'content': 'Eiusmod dolor cillum aliquip do. Commodo elit et ea ea occaecat occaecat incididunt enim deserunt cillum non exercitation sint. Velit laboris quis aliqua culpa consectetur dolore cillum laborum. Amet eiusmod enim ullamco est in fugiat do dolore adipisicing culpa mollit consectetur ullamco. Incididunt sit nostrud dolor tempor magna elit. Deserunt deserunt aliqua magna ea anim fugiat deserunt nulla consequat.'},1,1,1,1,1,1],
      user: {
        joined_communities: [
          {id: 1, name: 'Programming'},
          {id: 2, name: 'Gaming'},
          {id: 5, name: 'Trucking'},
          {id: 76, name: 'DankMemes'},
          {id: 33, name: 'Django'},
        ]
      }
    }
  }

  render() {
    if(this.state.posts.length === 0) {
      return (
        <div className="container">
          <img src="/undraw_post2_19cj.svg" alt="posts" className="posts-svg" />
          <h2>There are no posts to show.</h2>
        </div>
      )
    } else {
      return (
        <div className="homescreen-wrapper">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-8 col-xs-12">
                <h5>Posts</h5>
                {this.state.posts.map(post => (
                  <div className="single-post-wrapper">

                  </div>
                ))}
              </div>
              <div className="col-lg-4 col-md-4 col-xs-0 position-sticky">                
                <h5>Joined communities</h5>
                <ul className="list-group">
                  {this.state.user.joined_communities.map(community => (
                    <li className="list-group-item">{community.name}</li>
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
