import React from 'react';
//import axios from 'axios';
import { Link  } from 'react-router'
//const config = require('./config');
//const APIURL = config.path.apiUrl;
//const APPID = config.ids.appId;

class Signup extends React.Component {
	 //c/onstructor(props) {
	  // super(props);
	// }

  
 
  render() {
    return (
	   <div> 
	   
	    <div className="container-fluid desktop-container">
        <div className="row">
          <div className="col-xs-12 main-title-bar">
           <Link to={"/sign-in"}> <img src="/img/left-arrow.png" className="pull-left icon-img-small" alt="left-arrow" /> </Link>
            <h3 className="top-title main-title padding-right-20 text-uppercase">register</h3>
          </div>
        </div>
        <div className="row"><div className="space-10 bg-gray" /></div>
        <div className="white-outer center-block">
          <div className="col-xs-10 div-center">
            <div className="space-20" />
            <p className="text-center font-bold font-size-18">Account Information</p>
            <div className="space-5" />
            <div className="form-group label-floating is-empty card-no">
              <div className="input-group">
                <label className="control-label" htmlFor="card">First Name</label>
                <input id="card" className="form-control" type="text" />
              </div>
            </div>
            <div className="form-group label-floating is-empty card-no">
              <div className="input-group">
                <label className="control-label" htmlFor="card">Last Name</label>
                <input id="card" className="form-control" type="text" />
              </div>
            </div>
            <div className="form-group label-floating is-empty card-no">
              <div className="input-group">
                <label className="control-label" htmlFor="card">Email Address</label>
                <input id="card" className="form-control" type="text" />
              </div>
            </div>
            <div className="form-group label-floating is-empty card-no">
              <div className="input-group">
                <label className="control-label" htmlFor="card">Password</label>
                <input id="card" className="form-control" type="password" />
              </div>
            </div>
            <div className="form-group label-floating is-empty card-no">
              <div className="input-group">
                <label className="control-label" htmlFor="card">Re Enter Password</label>
                <input id="card" className="form-control" type="password" />
              </div>
            </div>
            <div className="form-group label-floating is-empty card-no">
              <div className="input-group">
                <label className="control-label" htmlFor="card">Mobile Number</label>
                <input id="card" className="form-control" type="text" />
              </div>
            </div>
            <div className="form-group label-floating is-empty card-no">
              <div className="input-group">
                <label className="control-label" htmlFor="card">Birthday</label>
                <input id="card" className="form-control" type="text" />
              </div>
            </div>
            <div className="form-group label-floating is-empty card-no">
              <div className="input-group">
                <label className="control-label" htmlFor="card">Postal Code</label>
                <input id="card" className="form-control" type="text" />
              </div>
            </div>
            <div className="form-group label-floating is-empty card-no">
              <div className="input-group">
                <label className="control-label" htmlFor="card">Address</label>
                <input id="card" className="form-control" type="text" />
              </div>
            </div>
            <div className="col-sm-6 padding-left-0 padding-right-10">
              <div className="form-group label-floating is-empty card-no">
                <div className="input-group">
                  <label className="control-label" htmlFor="card">Unit Number 2</label>
                  <input id="card" className="form-control" type="text" />
                </div>
              </div>
            </div>
            <div className="col-sm-6 padding-right-0 padding-left-10">
              <div className="form-group label-floating is-empty card-no">
                <div className="input-group">
                  <label className="control-label" htmlFor="card">Unit Number 1</label>
                  <input id="card" className="form-control" type="text" />
                </div>
              </div>
            </div>
            <div className="clearfix" />
            <div className="form-group label-floating is-empty card-no">
              <div className="input-group">
                <label className="control-label" htmlFor="card">Company Name</label>
                <input id="card" className="form-control" type="text" />
              </div>
            </div>
            <div className="text-center ">
              <button type="button" className="btn btn-raised btn-info full-width-btn-2 text-uppercase">send<div className="ripple-container" /></button><br />
            </div>
            <div className="space-20" />
          </div>
          <div className="clearfix" />
        </div>
      </div>

	  
       </div>
	 ); 
   }
 }
 
  
 export default Signup;
 