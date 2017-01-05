import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../store';
import { Link } from 'react-router';


class PostBody extends Component {
  handleClick(){
    store.dispatch({type: 'INCREMENT_LIKES', index: this.props.postId - 1})
  }
  render(){
    return(
      <div className="post-body">
        <Link to={`/posts/${this.props.postId}`} className="title">
          { this.props.posts[this.props.postId - 1].title }
        </Link>
        <div className="likes-num num" onClick={this.handleClick.bind(this)}>
          { this.props.posts[this.props.postId - 1].likes } 喜欢
        </div>

        <div className="comment-num num">
          { this.props.comments[this.props.postId].length } 评论
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  comments: state.comments,
  posts: state.posts
});

export default connect(mapStateToProps)(PostBody);
