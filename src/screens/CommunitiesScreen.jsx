import React from 'react'
import '../css/communities.css'
import '../css/master.css'
import '../css/homescreen.css'
import Community from '../components/CommunitiesScreen/Community'
import axios from 'axios'
import {Link, withRouter} from 'react-router-dom'

class CommunitiesScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            communities: null,
            new_com_name: "",
            new_com_description: "",
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

    _createCommunity = () => {
        axios.post('http://127.0.0.1:8000/api/communities/', {
            name: this.state.new_com_name,
            description: this.state.new_com_description
        }, {
            headers: {
                'Authorization': `Token ${localStorage.getItem('authToken')}`
            }
        }).then(res => {
            if(res.status === 201) {
                
            }
        }).catch(err => {
            console.log(err)
        })
    }

    componentDidMount() {
        this._getCommunities()
    }

    _handleNameChange = (event) => {
        this.setState({new_com_name: event.target.value})
    }

    _handleDescriptionChange = (event) => {
        this.setState({new_com_description: event.target.value})
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

                    <div className="modal fade" id="modalSocial" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
                    aria-hidden="true">
                        <div className="modal-dialog cascading-modal" role="document">                        
                            <div className="modal-content">                        
                                <div className="modal-header light-blue darken-3 white-text">
                                    <h4 className="title"><i className="fas fa-users"></i> Create new community</h4>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                                        aria-hidden="true">&times;</span></button>
                                </div>                        
                                <div className="modal-body mb-0">
                                    <label>Name</label>
                                    <input onChange={this._handleNameChange} id="name" value={this.state.new_com_name} className="form-control" placeholder="Community name..."/>
                                    <label style={{marginTop: "20px"}}>Description</label>
                                    <textarea onChange={this._handleDescriptionChange} style={{resize: "none"}} rows="5" placeholder="Community description..." className="form-control"
                                     value={this.state.new_com_description}>
                                    </textarea>
                                    <button onClick={() => this._createCommunity()} style={{marginTop: "15px"}} className="btn btn-primary">CREATE</button>
                                </div>
                            </div>    
                        </div>
                    </div>

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
                        <button style={{marginTop: "30px"}} type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalSocial">CREATE COMMUNITY</button>
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

export default withRouter(CommunitiesScreen);