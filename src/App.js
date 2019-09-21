import React from 'react';
import HomeScreen from './screens/HomeScreen';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginScreen from './screens/Auth/LoginScreen';
import RegisterScreen from './screens/Auth/RegisterScreen';
import LandingScreen from './screens/LandingScreen'
import NewPostScreen from './screens/Auth/NewPostScreen';

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
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
