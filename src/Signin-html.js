import React from 'react';
//import axios from 'axios';
import { Link  } from 'react-router'
//const config = require('./config');
//const APIURL = config.path.apiUrl;
//const APPID = config.ids.appId;

class Signin extends React.Component {
	 //c/onstructor(props) {
	  // super(props);
	// }

  
 
  render() {

    return (
	   <div> <div className="container-fluid desktop-container">
        <div className="row">
          <div className="col-xs-12 top-nav inner-top-nav">
            <div className="col-xs-3 nav-head pd-l-20"> <Link to={"/"}><img src="/img/icons/arrow-right.png" alt="left-arrow" className="icon-img-small-3" /></Link>
            </div>
            <div className="col-xs-6 nav-head ">
              <h1 className="main-title">LOGIN</h1>
            </div>
            <div className="col-xs-3 nopadding">
              <p className="b-txt text-right ">
                <img src="/img/icons/shopping-cart.png" className="icon-img-small-1-inner" alt="shopping-cart" /> 
              </p> 
            </div>
          </div>
        </div>
        <div className="row login-container">
          <div className="col-xs-offset-1 col-xs-10 col-xs-offset-1">
            <div className="row">
              <div className="col-xs-12 login-screen">
                <div className="row ">
                  <div className=" item-add1">
                    <h4 className="login-screen-heading"><span>Ninja</span>Pass</h4>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-12">
                    <div className="space-20" />
                    <Link to={"/sign-in/#"}>
                      <button type="button" className="btn btn-raised btn-info login-with-facebook"><i className="fa fa-facebook" aria-hidden="true" /> &nbsp; Login with Facebook</button>
                    </Link>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-12">
                    <div className="space-10" />
                    <p className="font-weight-400">Or</p>
                  </div>
                </div>
                <form action method>
                  <div className="row">
                    <div className=" item-add2">
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
                    </div>
                  </div>
                </form>
                <div className="row">
                  <div className="space-20" />
                  <div className="col-xs-12 text-center font-weight-400">
                    <Link to={"/forgot-password"}>Forgot Your Password?</Link>
                    <br />
                    <span>Don't have account ? Please</span> <Link to={"/sign-up"}>Sign Up</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
		
		{/* hide guset check out 
        <div className="row disabled-continue-as-a-guest">
          <div className="text-center">
            <button type="button" id="checkout" className="btn btn-raised btn-info login-check-out-as-guest font-gray disable-btn">CheckOut As Guest</button><br />
          </div>
          <div className="space-50 hide-on-click" />
          <div className="space-50 hide-on-click" />
        </div> */}
        <div className="new-user-reg">
          <form action method>
            <div className="row">
              <div className=" item-add2">
                <div className="space-10" />
                <p className="text-center">Please enter your name and email address to receive receipt </p>
                <div className="form-group label-floating is-empty card-no">
                  <div className="input-group">
                    <label className="control-label" htmlFor="card">Name</label>
                    <input id="card" className="form-control" type="text" />
                  </div>
                </div>
                <div className="form-group label-floating is-empty card-no">
                  <div className="input-group">
                    <label className="control-label" htmlFor="card">Email Address</label>
                    <input id="card" className="form-control" type="Text" />
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div className="space-50" />
          <div className="space-10" />
        </div>
        <div className="row">
          <button className="col-lg-12 continue-but desktop-container container-fluid">LET'S GO!</button>
        </div>
      </div>
</div>
	 ); 
	 }
 }
 
  
 export default Signin;
 