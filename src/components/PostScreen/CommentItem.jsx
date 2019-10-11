import React from 'react'
import '../../css/posts.css'
import moment from 'moment'
import {Link} from 'react-router-dom'

export default class CommentItem extends React.Component {
    render() {
        return (
            <div className="comment-wrapper">
                <div className="author-image-wrapper">
                    <div className="author-image"></div>
                </div>
                <div className="comment-content-wrapper">
                    <span> Comment by <Link style={{color: "black"}} to={`/users/${this.props.comment.author.id}`}>{this.props.comment.author.username}</Link> posted {moment(this.props.comment.created_at).fromNow()}</span>
                    <p>
                        {this.props.comment.content}
                    </p>
                </div>
            </div>
        )
    }
}