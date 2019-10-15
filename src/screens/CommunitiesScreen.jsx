import React from 'react'
import '../css/communities.css'
import '../css/master.css'
import '../css/homescreen.css'
import Community from '../components/CommunitiesScreen/Community'
import axios from 'axios'
import {Link, withRouter} from 'react-router-dom'
import $ from 'jquery'

class CommunitiesScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoadingUJC: true,
            isLoadingComs: true,
            communities: null,
            new_com_name: "",
            new_com_description: "",
            new_com_image: null,
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
                isLoadingComs: false,            
            })
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    _getUserJoinedCommunities = () => {
        axios.get('http://127.0.0.1:8000/api/userjoinedcommunities/', {
            headers: {
                'Authorization': `Token ${localStorage.getItem('authToken')}`
            }
        }).then(res => {
            this.setState({
                user_joined_communities: res.data.joined_communities,
                isLoadingUJC: false,
            })            
        })
    }

    _updateCommunityData = (communityId, index) => {
        axios.get(`http://127.0.0.1:8000/api/communities/${communityId}/`, {
            headers: {
                'Authorization': `Token ${localStorage.getItem('authToken')}`
            }
        }).then(res => {
            console.log(res.data)
            this.state.communities[index] = res.data.community_data
            this.forceUpdate()            
        }).catch(err => {
            console.log(err)
        })
    }

    _createCommunity = () => {

        let formData = new FormData()
        formData.append('community_image', this.state.new_com_image)
        formData.append('name', this.state.new_com_name)
        formData.append('description', this.state.new_com_description)

        axios.post('http://127.0.0.1:8000/api/communities/', formData, {
            headers: {
                'Authorization': `Token ${localStorage.getItem('authToken')}`,
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            return axios.post('http://127.0.0.1:8000/api/userjoinedcommunities/', {
                community: res.data.id
            }, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('authToken')}`
                }
            })            
        }).then(res => {            
            this.props.history.push(`/community/${res.data.community}`)            
        }).catch(err => {
            console.log(err)
        })
    }

    componentDidMount() {        
        this._getCommunities()
        this._getUserJoinedCommunities()
    }

    _handleNameChange = (event) => {
        this.setState({new_com_name: event.target.value})
    }

    _handleDescriptionChange = (event) => {
        this.setState({new_com_description: event.target.value})
    }

    _handleFile = (event) => {
        this.setState({new_com_image: event.target.files[0]})
    } 

    render() {
        if(this.state.isLoadingUJC || this.state.isLoadingComs) {
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
                                <img src="/undraw_status_update_jjgk.svg" width="80%" alt="community image"/>
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
                                    <label>Community Image</label><br/>
                                    <input type="file" className="form-control-file" onChange={this._handleFile}/><br/>
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
                                <img src="/undraw_status_update_jjgk.svg" height="100%" alt="img"/>
                            </div>
                        </div>
                        <button style={{marginTop: "30px"}} type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalSocial">CREATE COMMUNITY</button>
                        <h2>Featured Communities</h2>
                        <div className="row" style={{marginTop: "15px"}}>
                            {/* <div className="col-lg-4 col-md-6 col-xs-12"></div> */}
                            {this.state.communities.map((community, index) => (
                                <div key={community.id} className="col-lg-4 col-md-6 col-xs-12">
                                    <Link style={{textDecoration: "none"}} to={`/community/${community.id}`}>
                                        <Community communityIndex={index} updateCommunityData={this._updateCommunityData} community={community}/>
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