import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPost, deletePost, fetchUsers} from '../actions';
import { Link } from 'react-router-dom';

/*--------------------------------------------------------------*/
/* Popup windown for Delete Button
/*--------------------------------------------------------------*/
class Popup extends Component {
  /*--------------------------------------------------------------*/
  /* Delete method
  /*--------------------------------------------------------------*/

  // <button className="btn btn-success" onClick={this.onDeleteClick.bind(this)}>Yes</button>
  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <h4 className="popupTitle">{this.props.text}</h4>
          <button className="btn btn-success" onClick={this.props.closePopup}>Yes</button>
          <button className="btn btn-danger" onClick={this.props.closePopup}>No</button>
        </div>
      </div>
    );
  }
}

class PostShow extends Component {
  constructor() {
    super();
    this.state = {
      showPopup: false
    };
  }
  onDeleteClick() {
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
        this.props.history.push('/'); //this is callback function
    });
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    })
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPost(id)
  }

  render () {
    const {post} =this.props;
    if(!post){
      return (<div>Loading ...</div>);
     };
     // posts[this.props.match.params.id];  //the post we want to show
    return (
      <div>
        Posts Show!!
        <Link className="btn btn-primary" to="/">Back To Index (Home)</Link>
        <button className="btn btn-danger pull-xs-right"
                onClick={this.onDeleteClick.bind(this)}>Delete Post
        </button>
        <button className="btn btn-info pull-xs-right"
                onClick={this.togglePopup.bind(this)}>PopUp
        </button>

        {this.state.showPopup ?
          <Popup
            text='Are you sure?'
            closePopup={this.togglePopup.bind(this)}
          />
          : null
        }

        <h3>{post.title}</h3>
        <h6>Categories:   {post.categories}</h6>
        <p>{post.content}</p>
        <p>{post.name}</p>
        <p>{post.usename}</p>
      </div>
    );
  };
}

/*--------------------------------------------------------------*/
/* ownProps is props Object that control all component in class PostShow
## mapStateToProps will paste all the props that head in  PostShow using 'ownProps'
/*--------------------------------------------------------------*/
 function mapStateToProps({posts}, ownProps){
    return { post: posts[ ownProps.match.params.id ] };
 };

 export default connect(mapStateToProps, {fetchPost, deletePost, fetchUsers})(PostShow);





/*--------------------------------------------------------------*/
/* Common Operations - Reading  a Record; both have sam resault
/*--------------------------------------------------------------*/
/*------- Array -------*/
/*------- Reading the Record -------*/
// const postIdToFind = 34;
// state.posts.find(post => post.id === postIdFind);

/*------- Updating the Record -------*/
// const newPost = {id:34};
// newState.posts.filter(post => post.id !== id);
// return [...newState, newPost];

/*------- Deleting the Record -------*/
// const postIdToDelete = {id:34};
// return state.posts.filter(post => post.id !== postIdToDelete);



/*------- Object -------*/
/*------- Reading the Record -------*/
// const postIdToFind = 34;
// state.posts[postIdToFind]

/*------- Updating the Record -------*/
// const newPost = {id: 34};
// return {...state, [newPost.id]: newPost};

/*------- Deleting the Record -------*/
// const postIdToDelete = {id: 34};
// return _.omit{state, postIdToDelete};      //omit does is it takes an Object which is state its
                                             // finds a key that is the key "postIdToDelete" and just drop that key off
                                             // the object => delete the key

/*------- _.mapKeys[payload, 'id'] -------*/
// mapKeys take the array and the string. It looks for the property matching this string ('id') on each object (payload) in the array
//
