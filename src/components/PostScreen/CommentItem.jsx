import React from 'react'
import '../../css/posts.css'
import moment from 'moment'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {API_ROOT} from '../../apiconf'

export default class CommentItem extends React.Component {

    _deleteComment = () => {
        axios.delete(`${API_ROOT}/api/comments/${this.props.comment.id}/`, {
            headers: {
                'Authorization': `Token ${localStorage.getItem('authToken')}`
            }
        }).then(res => {
            this.props.updatePostData(this.props.postId)
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <div className="comment-wrapper">
                <div className="author-image-wrapper">
                    <div className="author-image" style={{backgroundImage: `url('${API_ROOT}${this.props.comment.author.profile_image}')`,
                    backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center"}}></div>
                </div>
                <div className="comment-content-wrapper">
                    <span> Comment by <Link style={{color: "black"}} to={`/users/${this.props.comment.author.id}`}>{this.props.comment.author.username}</Link> posted {moment(this.props.comment.created_at).fromNow()} <span onClick={this._deleteComment} className="delete-comment">{(this.props.currentUserId === this.props.comment.author.id) ? "DELETE" : null}</span></span>
                    <p>
                        {this.props.comment.content}
                    </p>
                </div>
            </div>
        )
    }
}