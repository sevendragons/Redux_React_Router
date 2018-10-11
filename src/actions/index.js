import axios from 'axios';

export const FETCH_POSTS = 'fetchPosts';
export const FETCH_POST = 'fetchPost';
export const CREATE_POSTS = 'createPost';
export const DELETE_POST = 'deletePost';

const API_KEY = '?key=AAEC9948F78FF33C3AF956ACF2F8F';
const ROOT_URL = 'http://reduxblog.herokuapp.com/api';

/*--------------------------------------------------------------*/
/* Read data API use axios
/*--------------------------------------------------------------*/
export function fetchPosts(){
  const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);
  // const request = axios.get(`http://reduxblog.herokuapp.com/api/posts?key=AAEC9948F78FF33C3AF956ACF2F8F`);

  return {
    type: FETCH_POSTS,
    payload: request
  };
}

/*--------------------------------------------------------------*/
/* Create data or Post
/*--------------------------------------------------------------*/
export function createPost(values, callback) {
  const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values)
                            .then( () => callback() );

  return {
    type: CREATE_POSTS,
    payload: request
  }
}

export function fetchPost(id){
    const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);
    return {
      type: FETCH_POST,
      payload: request
    };
}

export function deletePost(id, callback){
    const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
                                .then(() => callback());
    return {
      type: DELETE_POST,
      payload: id
    };
}

/*--------------------------------------------------------------*/
/* Redux thunk is a kind of middleware
Vanilla redux expects us to return an action
/*--------------------------------------------------------------*/
export function fetchUsers(){
  const request = axios.get('http://jsonplaceholder.typicode.com/users');
  return {
    type: FETCH_PROFILES,
    payload: request
  };

  // return (dispatch) => {
  //   request.then(({data}) => {
  //     dispatch({ type: FETCH_PROFILES, payload: data })
  //   });
  // }
}
 /*--------------------------------------------------------------*/
 /* dispatch method is essentially that big funnel or big pipe
   If we pass an action into dispatch  it's going to be sent off to all of our Different REDUCER.

 /*--------------------------------------------------------------*/
