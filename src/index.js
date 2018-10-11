import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import {BrowserRouter, Switch, Link, Route} from 'react-router-dom';

import PostsIndex from './components/PostsIndex';
import PostsNew from './components/PostsNew';
import PostShow from './components/PostShow';
import reducers from './reducers';
import User from './components/User';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/posts/new" component={PostsNew}></Route>
          <Route exact path="/posts/:id" component={PostShow}></Route>
          <Route exact path="/" component={PostsIndex}></Route>
          <Route exact path="/user" component={User}></Route>
        </Switch>
      </div>
    </BrowserRouter>

  </Provider>
  , document.querySelector('.container'));
