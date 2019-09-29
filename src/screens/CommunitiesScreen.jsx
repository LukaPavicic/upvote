import React from 'react'
import '../css/communities.css'
import '../css/master.css'
import '../css/homescreen.css'
import Community from '../components/CommunitiesScreen/Community'
import axios from 'axios'
import {Link} from 'react-router-dom'

class CommunitiesScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            communities: null,
        }
    }

    _getCommunities = () => {
        axios.get('http://127.0.0.1:8000/api/communities/', {
            headers: {
                'Authorization': `Token ${localStorage.getItem('authToken')}`
            }
        }).then(res => {
            this.setState({
                communities: res.data,
                isLoading: false,
            })
        }).catch(err => {
            console.log(err)
        })
    }

    componentDidMount() {
        this._getCommunities()
    }

    render() {
        if(this.state.isLoading) {
            return (
                <div className="homescreen-wrapper">
                    <div className="container">
                        <div className="row com-description">
                            <div className="col-lg-8 col-md-8 col-xs-12 com-desc-left">
                            <h1>Communities</h1>
                            <p>
                                Join communities you like to share your experiences<br/> and discuss topics with people you want to!
                            </p> 
                            </div>
                            <div className="col-lg-4 col-md-4 col-xs-12 com-desc-right">
                                <img src="/undraw_status_update_jjgk.svg" width="80%"/>
                            </div>
                        </div>
                        <div style={{marginTop: "30px"}} className="lds-ring"><div></div><div></div><div></div><div></div></div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="homescreen-wrapper">
                    <div className="container">
                        <div className="row com-description">
                            <div className="col-lg-8 col-md-8 col-xs-12 com-desc-left">
                            <h1>Communities</h1>
                            <p>
                                Join communities you like to share your experiences<br/> and discuss topics with people you want to!
                            </p> 
                            </div>
                            <div className="col-lg-4 col-md-4 col-xs-12 com-desc-right">
                                <img src="/undraw_status_update_jjgk.svg" width="80%"/>
                            </div>
                        </div>
                        <h2>Featured Communities</h2>
                        <div className="row" style={{marginTop: "15px"}}>
                            {/* <div className="col-lg-4 col-md-6 col-xs-12"></div> */}
                            {this.state.communities.map(community => (
                                <div key={community.id} className="col-lg-4 col-md-6 col-xs-12">
                                    <Link style={{textDecoration: "none"}}>
                                        <Community community={community}/>
                                    </Link>                                    
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )
        }
    }

}

export default CommunitiesScreen;