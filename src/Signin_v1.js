import React from 'react'
import { Link  } from 'react-router'
import update from 'immutability-helper'
import validator from 'validator'
import {validated} from 'react-custom-validation'
import axios from 'axios';
//import querystring from 'querystring';
const Loading = require('./loading');
const config = require('./config');
const APIURL = config.path.apiUrl;
const APPID = config.ids.appId;
import cookie from 'react-cookie';
class Signin extends React.Component {
  state = {
    fields: {
      email: '',
      password: ''
    },
    status:'Loading'
  }
  
  componentWillMount  () {  
	  this.setState({status: 'ok'});
  }
  
  fieldChange = (field, value) => {
    this.setState(update(this.state, {fields: {[field]: {$set: value}}}))
  }
  
  setStateLoading(sts){
    this.setState({status: sts});
  }
  
  handleFormSubmit = () => {
	  
    const formPayload = this.state.fields;
    axios({
	  method: 'post',
	  url: APIURL+'customer/login',
	  data: {
		login_username : formPayload.email,
		login_password : formPayload.password,
		app_id : APPID,
		type : 'web'
	  }
	})
	.then(response => {
			//this.setStateLoading('Loading');
			setTimeout(function() {
				if(response.data.status==="ok"){
				//	this.setStateLoading('ok');
					cookie.save("UserId",response.data.result_set.customer_id);
					cookie.save("UserFname",response.data.result_set.customer_first_name);
					cookie.save("UserLname",response.data.result_set.customer_last_name);
					cookie.save("UserEmail",response.data.result_set.customer_email);
					 
					 /* set redirection */
					  if( cookie.load('cartValue') === "Yes"){  
					  

					         if(cookie.load('defaultAvilablityId') === config.ids.dineinId){  console.log(2); 
	                                // window.location = "/book-a-table";
									 browserHistory.push("/book-a-table");
	                               }
					  }else{
					     //window.location = "/my-account";
						browserHistory.push("/my-account");
					  }
					
					 
				} else {
					this.setStateLoading('error');
					document.getElementById("form-error").innerHTML=response.data.message;
				}
			}.bind(this), 500);
      })
	  .catch(function (error) {
		console.log(error);
	  }); 
  }  
  render() {
	  if(this.state.status === "Loading"){
		return ( <Loading/>); 
	  } else {
		return (<Form
		  fields={this.state.fields}
		  onChange={this.fieldChange}
		  onValid={this.handleFormSubmit}
		  onInvalid={() => console.log('Form invalid!')}
		/>)
	 }
  }
}
const isEmpty = (value) =>
  value === '' ? 'This field is required.' : null
  
const isEmail = (email) =>
  validator.isEmail(email) ? null : 'This is not a valid email.'

function validationConfig(props) {
  const {email, password} = props.fields

  return { 
    fields: ['email', 'password'],

    validations: {
      email: [
        [isEmail, email],
        //[isUnique, email]
      ],
      password:[
		[isEmpty, password]
	  ]
    }
  }
}

class Form extends React.Component {
  render() {
    const {fields, onChange, onValid, onInvalid, $field, $validation} = this.props
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
        <div className="white-outer center-block" id="form-success"></div>
        <div className="row login-container" id="signin-form">
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
                      <div className="form-group label-floating card-no">
                        <div className="input-group">
                          <label className="control-label" htmlFor="card">Email Address</label>
                          <input type="text" className="form-control" value={fields.email} {...$field('email', (e) => onChange('email', e.target.value))}/>
                            {$validation.email.show && <span className="spn-error">{$validation.email.error.reason}</span>}
                        </div>
                      </div>
                      <div className="form-group label-floating card-no">
                        <div className="input-group">
                          <label className="control-label" htmlFor="card">Password</label>
                          <input type="password" className="form-control" value={fields.password} {...$field('password', (e) => onChange('password', e.target.value))}/>
							{$validation.password.show && <span className="spn-error">{$validation.password.error.reason}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="row">
                  <div className="space-20"><span className="spn-error" id="form-error"></span></div>
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
          <div className="spacDateFielde-50 hide-on-click" />
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
          <button className="col-lg-12 continue-but desktop-container container-fluid" onClick={(e) => { e.preventDefault(); this.props.$submit(onValid, onInvalid);}}>LET'S GO!</button>
        </div>
      </div>
	</div>
    )
  }
}
Form = validated(validationConfig)(Form)

export default Signin;
