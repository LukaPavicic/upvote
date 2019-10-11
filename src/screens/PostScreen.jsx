import React from 'react'
import '../css/homescreen.css'
import PostItem from '../components/Homescreen/PostItem'
import axios from 'axios'
import CommentItem from '../components/PostScreen/CommentItem'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';


class PostScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            postExists: false,
            isLoading: true,
            new_comment: "",
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

    _handleNewComment = (event) => {
        this.setState({
            new_comment: event.target.value
        })
    }

    _postComment = () => {
        axios.post('http://127.0.0.1:8000/api/comments/', {
            post: this.state.post_data.id,
            content: this.state.new_comment,
        }, {
            headers: {
                'Authorization': `Token ${localStorage.getItem('authToken')}`
            }
        }).then(res => {
            this.setState({
                new_comment: "",
            })
            this._getPost()
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        if(!this.state.isLoading) {
            if(this.state.postExists) {
                return (
                    <div className="homescreen-wrapper">
                        <div className="container">
                            <PostItem post={this.state.post_data} single={true}/>
                            <h3>Comments</h3>
                            <div class="input-group mb-3 new-comment">
                                <input type="text" class="form-control" placeholder="Add new comment..." value={this.state.new_comment} onChange={this._handleNewComment}/>
                                <button onClick={() => this._postComment()} class="btn btn-primary">
                                    <FontAwesomeIcon icon={faComment} />
                                </button>
                            </div>
                            {this.state.post_comments.map(comment => (
                                <CommentItem key={comment.id} comment={comment}/>
                            ))}
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