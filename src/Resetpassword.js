import React from 'react';
import { Link  } from 'react-router'
import update from 'immutability-helper'
import {validated} from 'react-custom-validation'
import axios from 'axios'; 

const config = require('./config');
const APIURL = config.path.apiUrl;
const APPID  = config.ids.appId;
const initialState = {
    fields: {
      password: '',
      rePassword: ''
    }
};
class Resetpassword extends React.Component {
  state = {
    fields: {
      password: '',
      rePassword: ''
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
				   'key' : '5E07E8D6-047D-4E27-8B2C-D6F5E2637621',
				   "password": formPayload.password,
				   "confirmpassword" : formPayload.rePassword
				   };
     
	axios.post(APIURL+"customer/resetpassword", qs.stringify(postObject)).then(response => {
		if(response.data.status==="ok"){ 
			document.getElementById("form-msg").innerHTML='<p class="spn-success">'+response.data.message+'</p>';
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
   
const minLength = (password, length) =>
  password.length >= length ? null : 'Password is too short.'

const areSame = (password, rePassword) =>
  password === rePassword ? null : 'Passwords do not match.'
  
function validationConfig(props) {
  const {password,rePassword} = props.fields

  return { 
    fields: ['password', 'rePassword'],

    validations: {
      password: [[isEmpty, password],[minLength, password, 6]],
      rePassword: {
        rules: [[isEmpty, rePassword],[areSame, password, rePassword]],
        fields: ['password', 'rePassword']
      }
    }
  }
}

class Form extends React.Component {
  render() {
    const {fields, onChange, onValid, onInvalid, $field, $validation} = this.props
    return (
    <div className="container-fluid desktop-container">
            <div className="row">
                <div className="col-xs-12 main-title-bar">
                   <Link to={"/sign-in"}> <img src="/img/left-arrow.png" className="pull-left icon-img-small" alt="left-arrow"/> </Link>
                    <h3 className="top-title main-title padding-right-20 text-uppercase">reset password</h3>
                </div>
            </div>
            <div className="row"><div className="space-10 bg-gray"></div></div>
            <div className="white-outer center-block" id="form-success"></div>
            <div className="white-outer center-block" id="resetpassword-form">
                <div className="col-xs-10 div-center">
                    <div className="space-20"></div>
                    <p className="text-center font-bold font-size-18">Enter Your new password</p>
                    <div className="space-5"></div>
                    <div className="form-group label-floating is-empty card-no">
                        <div className="input-group">
                            <label className="control-label">Password</label> 
                            <input type="password" className="form-control" value={fields.password} {...$field('password', (e) => onChange('password', e.target.value))}/>
							{$validation.password.show && <span className="spn-error">{$validation.password.error.reason}</span>}
                        </div>
                    </div>
                    <div className="form-group label-floating is-empty card-no">
                        <div className="input-group">
                            <label className="control-label">Re Enter Password</label>
                            <input type="password" className="form-control" value={fields.rePassword} {...$field('rePassword', (e) => onChange('rePassword', e.target.value))}/>
							{$validation.rePassword.show && <span className="spn-error">{$validation.rePassword.error.reason}</span>}
                        </div>
                    </div>
                    <div className="space-20" id="form-msg"></div>
                    <div className="text-center ">
                        <button type="button" className="btn btn-raised btn-info full-width-btn text-uppercase" onClick={(e) => { e.preventDefault(); this.props.$submit(onValid, onInvalid);}}>Reset<div className="ripple-container"></div></button><br />
                    </div>
                    <div className="space-20"></div>
                </div>
                <div className="clearfix"></div>


            </div>
            <div className="space-30"></div>
            <div className="space-30"></div>
            <div className="space-10"></div>
        </div>
    )
  }
}
Form = validated(validationConfig)(Form)

export default Resetpassword;
 
