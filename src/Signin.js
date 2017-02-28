import React from 'react'
import { Link, hashHistory  } from 'react-router'
import update from 'immutability-helper'
import validator from 'validator'
import {validated} from 'react-custom-validation'
import getResult from './Api';
import axios from 'axios'; 
const Loading = require('./loading');
const config = require('./config');
const lang = require('./lang');
const APIURL = config.path.apiUrl;
const APPID = config.ids.appId;
import cookie from 'react-cookie';
import FacebookLogin from 'react-facebook-login';
import DocumentMeta from 'react-document-meta';

 /* Load meta tags */
  const meta = {
      title: lang.signin_meta_title,
      description: lang.signin_meta_title,
      meta: {
        name: {
          keywords: lang.signin_meta_title
        }
      }
    };
	

class Signin extends React.Component {

 /* If user logged in goto  order page */
		
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
  
  componentDidMount () { 
	var list = document.getElementsByClassName('form-group');
	var n;
	for (n = 0; n < list.length; ++n) {
		list[n].classList.add("is-empty");
	}
  }
  handleFormSubmit = () => {
	  
	  	this.setStateLoading('Loading');
		const formPayload = this.state.fields; 
		var qs = require('qs');
		var postObject = {
				   "app_id": APPID,
				   "type" : "web",
				   "login_username" : formPayload.email,
				   "login_password": formPayload.password
				   }; 
		axios.post(APIURL+"customer/login", qs.stringify(postObject)).then(response => {
		
		if(response.data.status==="ok"){ 
		
		    /* set User cookie values - Start */
			cookie.save("UserId",response.data.result_set.customer_id);
			cookie.save("UserFname",response.data.result_set.customer_first_name);
			cookie.save("UserLname",response.data.result_set.customer_last_name);
		    cookie.save("UserMobile",response.data.result_set.customer_phone);
			cookie.save("UserEmail",response.data.result_set.customer_email);
			 /* set User cookie values - End */
			 
			 /* set redirection */
			 
			/* upadte customer info */ 
		    var qs = require('qs');
			var postObject = {
						   "app_id": APPID,
						   "reference_id" : getResult('referenceId'),
						   "customer_id" : response.data.result_set.customer_id,
						   "availability_id": cookie.load('defaultAvilablityId') 
						   };
			 
		 	  axios.post(APIURL+"cart/update_customer_info", qs.stringify(postObject)).then(res => {
	           if(res.data.status === "ok"){
			   
			    /* check FB login function */
			       cookie.save('cartValue','Yes');
				    if(cookie.load('defaultAvilablityId') === config.ids.dineinId){ 
							hashHistory.push("/book-a-table");
					  }
					  else if(cookie.load('defaultAvilablityId') === config.ids.deliveryId){
					  	hashHistory.push("/checkout");
					  }
					  else {
					    alert(lang.availability_disabled);
					  }
					  
			this.setStateLoading('ok');  
			     }
			  else  {
               hashHistory.push("/my-account");
				cookie.save('cartValue','No');
			 }
			 });
			 
			/*  if( cookie.load('cartValue') === "Yes"){  
					 if(cookie.load('defaultAvilablityId') === config.ids.dineinId){  console.log(2); 
							hashHistory.push("/book-a-table");
						   }
			  }else{
			 	hashHistory.push("/#/dashboard");
			  }   */
		} else { 
			this.setStateLoading('error');
			document.getElementById("form-error").innerHTML=response.data.message;
		} 
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
	
  state = { 
    status:'Loading'
  }
	
  static contextTypes = {
	  router: React.PropTypes.object.isRequired
  }
  componentWillMount(){  
		this.setStateLoading('ok'); 
	} 
  setStateLoading(sts){
    this.setState({status: sts});
  }
  responseFacebook = (response) => { 
    if(response.name){
		this.setStateLoading('Loading');
		 
		var qs = require('qs');
		var postObject = {
				   "app_id": APPID,
				   "type" : "web",
				   "customer_first_name" : response.name,
				   "customer_last_name": '',
				   "login_username" : response.email,
				   "customer_fb_id" : response.id
				   }; 
		axios.post(APIURL+"customer/fbloginapp", qs.stringify(postObject)).then(response => { 
			if(response.data.status==="ok"){
				/* set User cookie values - Start */
				cookie.save("UserId",response.data.result_set.customer_id); 
				cookie.save("UserEmail",response.data.result_set.customer_email);
				 /* set User cookie values - End */
				 
				 /* set redirection */
				 
				  /* upadte customer info */
				var qs = require('qs');
				var postObject = {
						   "app_id": APPID,
						   "reference_id" : getResult('referenceId'),
						   "customer_id" : response.data.result_set.customer_id,
						   "availability_id": cookie.load('defaultAvilablityId') 
						   };
			 
		 	  axios.post(APIURL+"cart/update_customer_info", qs.stringify(postObject)).then(res => {
				   if(res.data.status === "ok"){
					   cookie.save('cartValue','Yes');
						if(cookie.load('defaultAvilablityId') === config.ids.dineinId){ 
								hashHistory.push("/book-a-table");
						  }else {
							alert(lang.availability_disabled);
						  }
						  this.setStateLoading('ok');
					 }
				  else  {
					 hashHistory.push("/my-account");
					cookie.save('cartValue','No');
				 }
				 }); 
				 
			} else {
				this.setStateLoading('error');
				document.getElementById("form-error").innerHTML=response.data.message;
			} 
		  })
		  .catch(function (error) {
			  console.log(error);
		  }); 
	}
  }
  
  render() {
	  
	  if(this.state.status === "Loading"){
			return ( <Loading/>); 
		 } else {
  
    const {fields, onChange, onValid, onInvalid, $field, $validation} = this.props
    return (
		<div> 
		<DocumentMeta  {...meta} />
		<div className="container-fluid desktop-container">
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
                    <FacebookLogin
						appId={config.ids.fbAppId}
						fields="name,email,picture"
						callback={this.responseFacebook}
						cssClass="btn btn-raised btn-info login-with-facebook"
						icon="fa-facebook"
						textButton="&nbsp; Login with Facebook"
					  />
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
}
Form = validated(validationConfig)(Form)

export default Signin;
