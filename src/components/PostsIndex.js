import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux'
import {fetchPosts, fetchUsers} from '../actions';
import {BrowserRouter, Switch, Link, Route} from 'react-router-dom';

class PostsIndex extends Component{
  componentDidMount() {
    this.props.fetchPosts();
  /*--------------------------------------------------------------*/
  /* componentDidMount will automatic call once the component render to the DOM
  /*--------------------------------------------------------------*/
  }
  renderPosts(){
    return _.map(this.props.posts, post => {
      return(
        <li key={post.id} className="list-group-item">
          <Link to={ `posts/${post.id}` }>
            {post.title}
          </Link>
          <Link to={ `posts/${post.id}` }>
            {post.name}
          </Link>
        </li>
      );
    })
  }

  render() {
    // console.log(this.props.posts);
    return (
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="posts/new">Add a Post</Link>
          <Link className="btn btn-warning" to="user">User</Link>
        </div>
        <h3>Post - What the hex</h3>
        <ul className="list-group">
           {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

//mapStateToProps is the key code to fetch data
function mapStateToProps(state){
  return { posts: state.posts };
}

export default connect(mapStateToProps, { fetchPosts: fetchPosts, fetchUsers: fetchUsers })(PostsIndex);
