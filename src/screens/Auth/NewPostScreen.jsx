import React from 'react'
import '../../css/homescreen.css'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {API_ROOT} from '../../apiconf'

class NewPostScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            'joined_communities': [],
            isLoading: true,
            titleField: "",
            descriptionField: "",
            communityField: 0,
            image: null,
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
            isLoading: false,      
          })
        }).catch(err => {
          console.log(err)
        })
    }

    _createPost = () => {       
        let formData = new FormData()
        formData.append('title', this.state.titleField)
        formData.append('description', this.state.descriptionField)
        formData.append('community', this.state.communityField)
        if(this.state.image !== null) {                     
            formData.append('post_image', this.state.image) 
        }
        axios.post(`${API_ROOT}/api/posts/`, formData, {
            headers: {
                'Authorization': `Token ${localStorage.getItem('authToken')}`,
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            this.props.history.push(`/post/${res.data.id}`)
        }).catch(err => {
            console.log(err)
        })
    }

    componentDidMount() {
        this._getUserJoinedCommunities()
    }

    _onChangeTitle = (event) => {
        this.setState({
            titleField: event.target.value
        })
    }

    _onChangeDescription = (event) => {
        this.setState({
            descriptionField: event.target.value
        })
    }

    _onCommunityChange = (event) => {
        this.setState({
            communityField: event.target.value
        })
    }

    _handleImage = (event) => {
        this.setState({
            image: event.target.files[0]
        })
    }

    render() {
        if(!this.state.isLoading) {
            return (
                <div className="homescreen-wrapper">
                    <div className="container">
                        <div className="subcontainer-newpost">
                            <div className="row com-description" style={{marginBottom: "30px"}}>
                                <div className="col-lg-8 col-md-8 col-xs-12 com-desc-left">
                                <h1>New Post</h1>
                                <p>
                                    Share something interesting with people in your community.
                                </p> 
                                </div>
                                <div className="col-lg-4 col-md-4 col-xs-12 com-desc-right">
                                    <img src="/undraw_post2_19cj.svg" height="100%" alt="img"/>
                                </div>
                            </div> 
                            <p style={{marginTop: "20px"}}>Community</p>
                            <select onChange={this._onCommunityChange} className="form-control" defaultValue="">
                                <option value="" disabled>Select community you are posting to</option>
                                {this.state.joined_communities.map(community => (
                                    <option key={community.id} value={community.id}>{community.name}</option>
                                ))}
                            </select>
                            <p style={{marginTop: "10px"}}>Title</p>
                            <input className="form-control" placeholder="Title..." value={this.state.titleField} onChange={this._onChangeTitle}/>
                            <p style={{marginTop: "10px"}}>Content(optional)</p>
                            <textarea style={{resize: "none"}} rows="4" cols="50" className="form-control" placeholder="Content(optional)..." value={this.state.descriptionField} onChange={this._onChangeDescription}>
                            </textarea>
                            <label style={{marginTop: "10px"}}>Add image to post(optional)</label><br/>
                            <input type="file" onChange={this._handleImage} style={{marginBottom: "10px"}}/><br/>
                            <button onClick={() => this._createPost()} className="btn btn-primary" style={{marginTop: "10px"}}>POST</button>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div>Loading...</div>
            )
        }
    }
}

export default withRouter(NewPostScreen)