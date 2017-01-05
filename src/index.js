import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import './main.css';
import App from './components/App';
import Home from './components/Home';
import Post from './components/Post';
import { Router, Route, IndexRoute, browserHistory} from 'react-router';

const router = (
   <Router history={browserHistory}>
     <Route path="/" component={App}>
       <IndexRoute component={Home} />
       <Route path="/posts/:postId" component={Post} />
     </Route>
   </Router>
)


ReactDOM.render(router, document.getElementById('app'));
