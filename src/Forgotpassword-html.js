import React from 'react';
//import axios from 'axios';
import { Link  } from 'react-router'
//const config = require('./config');
//const APIURL = config.path.apiUrl;
//const APPID = config.ids.appId;

class Forgotpassword extends React.Component {
	 //c/onstructor(props) {
	  // super(props);
	// }

  
 
  render() {

    return (
	   <div>   
	   
	    <div className="container-fluid desktop-container">
            <div className="row">
                <div className="col-xs-12 main-title-bar">
                   <Link to={"/sign-in"}> <img src="/img/left-arrow.png" className="pull-left icon-img-small" alt="left-arrow"/> </Link>
                    <h3 className="top-title main-title padding-right-20 text-uppercase">forget password</h3>
                </div>
            </div>
            <div className="row"><div className="space-10 bg-gray"></div></div>
            <div className="white-outer center-block">
                <div className="col-xs-10 div-center">
                    <div className="space-20"></div>
                    <p className="text-center font-bold font-size-18">Enter Your Email Address</p>
                    <div className="space-5"></div>
                    <div className="form-group label-floating is-empty card-no">
                        <div className="input-group">
                            <label className="control-label" htmlFor="card">Email Address</label>
                            <input type="text" id="card" className="form-control"/>
                        </div>
                    </div>
                    <div className="text-center ">
                        <button type="button" className="btn btn-raised btn-info full-width-btn text-uppercase">send<div className="ripple-container"></div></button><br/>
                    </div>
                    <div className="space-20"></div>
                </div>
                <div className="clearfix"></div>

            </div>
            <div className="space-30"></div>
            <div className="space-30"></div>
            <div className="space-10"></div>
            <div className="space-30"></div>
            <div className="space-30"></div>
            <div className="space-30"></div>
   
        </div>
		
       </div>
	 ); 
	 }
 }
 
  
 export default Forgotpassword;
 