import React from 'react'
import '../css/homescreen.css'
import PostItem from '../components/Homescreen/PostItem'
import axios from 'axios'


class PostScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            postExists: false,
            isLoading: true,
        }
    }

    componentDidMount() {
        this._getPost()
    }

    _getPost = () => {
        axios.get(`http://127.0.0.1:8000/api/posts/${this.props.match.params.id}/`, {
            headers: {
                'Authorization': `Token ${localStorage.getItem('authToken')}`
            }
        }).then(res => {
            this.setState({
                post_data: res.data.post_data,
                post_comments: res.data.post_comments,
                postExists: true,
                isLoading: false,
            })
            console.log(res.data)
        }).catch(err => {
            this.setState({
                errorMessage: err.response.data.error_message,
                isLoading: false,
            })
        })
    }

    render() {
        if(!this.state.isLoading) {
            if(this.state.postExists) {
                return (
                    <div className="homescreen-wrapper">
                        <div className="container">
                            <PostItem post={this.state.post_data} single={true}/>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="homescreen-wrapper">
                        <div className="container">
                            {this.state.errorMessage}
                        </div>
                    </div>
                )
            }
        } else {
            return (
                <div className="homescreen-wrapper">
                    <div className="container">
                        Loading...
                    </div>
                </div>
            )
        }        
    }
}

export default PostScreen;