import React from 'react';
import { Link  } from 'react-router'
import update from 'immutability-helper'
import validator from 'validator'
import {validated} from 'react-custom-validation'
import axios from 'axios'; 
import DocumentMeta from 'react-document-meta';
const config = require('./config');
const lang = require('./lang');
const APIURL = config.path.apiUrl;
const APPID = config.ids.appId;
const initialState = {
    fields: {
      email: ''
    }
};

 /* Load meta tags */
  const meta = {
      title: lang.forgotpassword_meta_title,
      description: lang.forgotpassword_meta_title,
      meta: {
        name: {
          keywords: lang.forgotpassword_meta_title
        }
      }
    };
class Forgotpassword extends React.Component {
  state = {
    fields: {
      email: ''
    }
  }

  fieldChange = (field, value) => {
    this.setState(update(this.state, {fields: {[field]: {$set: value}}}))
  }
  
  handleFormSubmit = () => {
	  
    const formPayload = this.state.fields;
     
	var qs = require('qs');
    var postObject = {
				   "app_id": APPID,
				   "type" : "web", 
				   "email_address" : formPayload.email
				   };
     
	axios.post(APIURL+"customer/forgot_password", qs.stringify(postObject)).then(response => {
		if(response.data.status==="ok"){ 
			document.getElementById("form-msg").innerHTML='<p class="spn-success">An email has been sent to your mail with reset password link</p>';
			this.setState(initialState);
			var list = document.getElementsByClassName('spn-error');
			var n;
			for (n = 0; n < list.length; ++n) {
				list[n].innerHTML='';
			}
		} else {
			document.getElementById("form-msg").innerHTML='<p class="spn-error">'+response.data.message+'</p>';
		}
		
	})
	.catch(function (error) {
		console.log(error);
	}); 
	
	
} 
  render() {
    return (<Form
      fields={this.state.fields}
      onChange={this.fieldChange}
      onValid={this.handleFormSubmit}
      onInvalid={() => console.log('Form invalid!')}
    />)
  }
}
const isEmpty = (value) =>
  value === '' ? 'This field is required.' : null
  
const isEmail = (email) =>
  validator.isEmail(email) ? null : 'This is not a valid email.'

function validationConfig(props) {
  const {email} = props.fields

  return { 
    fields: ['email'],

    validations: {
      email: [
        [isEmpty, email],
        [isEmail, email],
        //[isUnique, email]
      ]
    }
  }
}

class Form extends React.Component {
  render() {
    const {fields, onChange, onValid, onInvalid, $field, $validation} = this.props
    return (
		<div> <DocumentMeta  {...meta} />
		<div className="container-fluid desktop-container">
            <div className="row">
                <div className="col-xs-12 main-title-bar">
                   <Link to={"/sign-in"}> <img src="/img/left-arrow.png" className="pull-left icon-img-small" alt="left-arrow"/> </Link>
                    <h3 className="top-title main-title padding-right-20 text-uppercase">forget password</h3>
                </div>
            </div>
            <div className="row"><div className="space-10 bg-gray"></div></div>
            
            <div className="white-outer center-block" id="forgotpassword-form">
                <div className="col-xs-10 div-center">
                    <div className="space-20"></div>
                    <p className="text-center font-bold font-size-18">Enter Your Email Address</p>
                    <div className="space-5"></div>
                    <div className="form-group label-floating is-empty card-no">
                        <div className="input-group">
                            <label className="control-label" htmlFor="card">Email Address</label>
                          <input type="text" className="form-control" value={fields.email} {...$field('email', (e) => onChange('email', e.target.value))}/>
                            {$validation.email.show && <span className="spn-error">{$validation.email.error.reason}</span>}
                        </div>
                    </div>
                    <div className="space-20" id="form-msg"></div>
                    <div className="text-center ">
                        <button type="button" className="btn btn-raised btn-info full-width-btn text-uppercase"  onClick={(e) => { e.preventDefault(); this.props.$submit(onValid, onInvalid);}}>send<div className="ripple-container"></div></button><br/>
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
    )
  }
}
Form = validated(validationConfig)(Form)

export default Forgotpassword;
 
