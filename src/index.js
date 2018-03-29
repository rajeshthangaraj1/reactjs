/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route,  IndexRoute,hashHistory   } from 'react-router'
import {App} from './App';
import './index.css';
import Home from './Home';
import NotFound from './NotFound';

 ReactDOM.render((
   <Router history={hashHistory } >
     {/*  <Route path="*" component={App}>  </Route> */}
    <Route path="/" component={App}>
         <IndexRoute component={Home} />
         <Route path="/home" component={Home} />
		  <Route path="*" component={NotFound} />
      </Route>
   </Router>
	
), document.getElementById('root'))

 
