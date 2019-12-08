import React from 'react';
import HomeScreen from './screens/HomeScreen';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginScreen from './screens/Auth/LoginScreen';
import RegisterScreen from './screens/Auth/RegisterScreen';
import LandingScreen from './screens/LandingScreen'
import NewPostScreen from './screens/Auth/NewPostScreen';
import ProfileScreen from './screens/ProfileScreen';
import ServerErrorScreen from './screens/ServerErrorScreen';
import CommunitiesScreen from './screens/CommunitiesScreen';
import CommunityScreen from './screens/CommunityScreen';
import PostScreen from './screens/PostScreen';
import SavedPostsScreen from './screens/SavedPostsScreen';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGithub, faStackOverflow} from '@fortawesome/free-brands-svg-icons'
import './css/homescreen.css'

class App extends React.Component {
  render() {
    return (
      <Router>
        <div style={{width: "100%", height: "100vh"}}>
          <Navbar/>
          <Switch>
            <Route exact path="/" component={HomeScreen}/>
            <Route exact path="/login" component={LoginScreen}/>
            <Route exact path="/register" component={RegisterScreen}/>
            <Route exact path="/welcome" component={LandingScreen}/>
            <Route exact path="/newpost" component={NewPostScreen}/>
            <Route exact path="/users/:id" component={ProfileScreen}/>
            <Route exact path="/servererror" component={ServerErrorScreen}/>
            <Route exact path="/communities" component={CommunitiesScreen}/>
            <Route exact path="/community/:id" component={CommunityScreen}/>
            <Route exact path="/post/:id" component={PostScreen}/>
            <Route exact path="/savedposts" component={SavedPostsScreen}/>
          </Switch>
          {/* <footer className="footer">
            <span style={{marginRight: "10px"}}>Developed by Luka Pavičić</span>
            <a target="_blank" href="https://github.com/LukaPavicic"><FontAwesomeIcon className="footer-icon" icon={faGithub} color="black" size="2x"/></a>
            <a target="_blank" href="https://stackoverflow.com/users/10249627/crodev?tab=profile"><FontAwesomeIcon icon={faStackOverflow} color="black" size="2x"/></a>
          </footer> */}
        </div>
      </Router>
    );
  }
}

export default App;
