import React from 'react'
import { Link  } from 'react-router'
import update from 'immutability-helper'
import validator from 'validator'
import {validated} from 'react-custom-validation'
import { DateField } from 'react-date-picker'
import 'react-date-picker/index.css'
import axios from 'axios'; 
const Loading = require('./loading');
const config = require('./config');
const APIURL = config.path.apiUrl;
const APPID = config.ids.appId;
const todayDate = new Date().toISOString();
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1;
var yyyy = today.getFullYear();
if(dd<10){
    dd='0'+dd;
} 
if(mm<10){
    mm='0'+mm;
} 
var todayDateFormat = yyyy+'-'+mm+'-'+dd;

class Signup extends React.Component {
  state = {
    fields: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      rePassword: '',
      mobile: '',
      postal: '',
	  unitnumber2: '',
	  unitnumber1: '',
	  company: ''
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
	formPayload.birthday = document.getElementsByClassName("react-date-field__input")[0].value;
     
    axios({
	  method: 'post',
	  url: APIURL+'customer/registration',
	  data: {
		customer_first_name : formPayload.firstname,
		customer_last_name : formPayload.lastname,
		customer_email : formPayload.email,
		customer_password : formPayload.password,
		app_id : APPID,
		customer_phone : formPayload.mobile,
		type : 'web',
		customer_birthdate : formPayload.birthday,
		customer_postal_code : formPayload.postal,
		customer_address_name : formPayload.address,
		customer_company_name : formPayload.company
	  }
	})
	.then(response => {
			this.setStateLoading('Loading');
			setTimeout(function() {
				if(response.data.status==="ok"){
					this.setStateLoading('ok');
					document.getElementById('register-form').style.display = "none";
					document.getElementById('form-success').style.display = "block";
					document.getElementById("form-success").innerHTML='<p>'+response.data.message+'</p>';
				} else {
					this.setStateLoading('error');
					//errorMsg = response.data.message
					//errorMsg = response.data.form_error
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

const phonenumberPattern = /^[0-9]{6,14}$/;
const postalcodePattern  = /^\d{6}$/;

const isEmpty = (value) =>
  value === '' ? 'This field is required.' : null
  
const isEmail = (email) =>
  validator.isEmail(email) ? null : 'This is not a valid email.'

const isMobile = (mobile) =>
	mobile.match(phonenumberPattern) ? null : 'This is not a valid mobile number.'
	
const isPostal = (postal) =>
	postal.match(postalcodePattern) ? null : 'This is not a valid postal code.'
  
const isUnique = (email) => {
	axios({
	  method: 'post',
	  url: APIURL+'customer/email_exist',
	  data: {
		customer_email : email,
		app_id : APPID,
		type : 'web'
	  }
	})
	.then(response => {  
		if(response.data.status==="ok"){ 
			document.getElementById("spn-email-error").innerHTML='';
		} else {
			document.getElementById("spn-email-error").innerHTML='<span class="spn-error">This email already exists</span>';
		} 
      })
	  .catch(function (error) {
		  console.log(error);
	  });
}

const loadPostalAddress = (postal) => {
	
	axios.get(APIURL+'/settings/get_address?app_id='+APPID+"&zip_code="+postal)
		 .then(res => {
		  if(res.data.status==="ok"){  
			  document.getElementById("postal-address").value = res.data.result_set.zip_sname;
			  document.getElementById("postal-address").setAttribute("value",res.data.result_set.zip_sname); 
				var list = document.getElementsByClassName('form-addressfield');
				var n;
				for (n = 0; n < list.length; ++n) {
					list[n].classList.remove("is-empty");
				}
			} else {
				document.getElementById("postal-address").value = '';
				document.getElementById("postal-address").setAttribute("value",'');
			}  
		});
}

const minLength = (password, length) =>
  password.length >= length ? null : 'Password is too short.'

const areSame = (password, rePassword) =>
  password === rePassword ? null : 'Passwords do not match.'

function validationConfig(props) {
  const {firstname, lastname, email, password, rePassword, mobile, postal} = props.fields

  return { 
    fields: ['firstname', 'lastname', 'email', 'password', 'rePassword', 'mobile', 'postal'],

    validations: {
	  firstname:[
		[isEmpty, firstname]
	  ],
	  lastname:[
		[isEmpty, lastname]
	  ],
      email: [
        [isEmail, email],
        [isUnique, email]
      ],
      password: [[minLength, password, 6]],
      rePassword: {
        rules: [[areSame, password, rePassword]],
        fields: ['password', 'rePassword']
      },
      mobile:[
		[isEmpty, mobile],
        [isMobile, mobile]
	  ],
      postal:[
		[isEmpty, postal],
        [isPostal, postal],
        [loadPostalAddress, postal]
	  ]
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
					<Link to={"/sign-in"}> <img src="/img/left-arrow.png" className="pull-left icon-img-small" alt="left-arrow" /> </Link>
                    <h3 className="top-title main-title padding-right-20 text-uppercase">register</h3>
                </div>
            </div>
            <div className="row"><div className="space-10 bg-gray"></div></div>
            <div className="white-outer center-block" id="form-success"></div>
            <div className="white-outer center-block" id="register-form">
                <div className="col-xs-10 div-center">
					<div className="space-20"></div>
                    <p className="text-center font-bold font-size-18">Account Information</p>
                    <div className="space-5"></div>
                    <div className="form-group label-floating card-no">
                        <div className="input-group">
                            <label className="control-label">First Name</label>
                            <input type="text" className="form-control"  value={fields.firstname} {...$field('firstname', (e) => onChange('firstname', e.target.value))}/>
							{$validation.firstname.show && <span className="spn-error">{$validation.firstname.error.reason}</span>}
                        </div>
                    </div>
                    <div className="form-group label-floating card-no">
                        <div className="input-group">
                            <label className="control-label">Last Name</label>
                            <input type="text" className="form-control"  value={fields.lastname} {...$field('lastname', (e) => onChange('lastname', e.target.value))}/>
							{$validation.lastname.show && <span className="spn-error">{$validation.lastname.error.reason}</span>}
                        </div>
                    </div>
                    <div className="form-group label-floating card-no">
                        <div className="input-group">
                            <label className="control-label">Email Address</label> 
                            <input type="text" className="form-control" value={fields.email} {...$field('email', (e) => onChange('email', e.target.value))}/>
                            <div  id="spn-email-error">{$validation.email.show && <span className="spn-error">{$validation.email.error.reason}</span>}</div>
                        </div>
                    </div>
                    <div className="form-group label-floating card-no">
                        <div className="input-group">
                            <label className="control-label">Password</label> 
                            <input type="password" className="form-control" value={fields.password} {...$field('password', (e) => onChange('password', e.target.value))}/>
							{$validation.password.show && <span className="spn-error">{$validation.password.error.reason}</span>}
                        </div>
                    </div>
                    <div className="form-group label-floating card-no">
                        <div className="input-group">
                            <label className="control-label">Re Enter Password</label>
                            <input type="password" className="form-control" value={fields.rePassword} {...$field('rePassword', (e) => onChange('rePassword', e.target.value))}/>
							{$validation.rePassword.show && <span className="spn-error">{$validation.rePassword.error.reason}</span>}
                        </div>
                    </div>
                    <div className="form-group label-floating card-no">
                        <div className="input-group">
                            <label className="control-label">Mobile Number</label> 
                            <input type="text" className="form-control" value={fields.mobile} {...$field('mobile', (e) => onChange('mobile', e.target.value))}/>
							{$validation.mobile.show && <span className="spn-error">{$validation.mobile.error.reason}</span>}
                        </div>
                    </div>
                    <div className="form-group label-floating card-no">
                        <div className="input-group">
                            <label className="control-label">Birthday</label>
                            <DateField maxDate={todayDate} defaultValue={todayDateFormat} forceValidDate dateFormat="YYYY-MM-DD" id="date-pick" />
                        </div>
                    </div>
                    <div className="form-group label-floating card-no">
                        <div className="input-group">
                            <label className="control-label">Postal Code</label>
                            <input type="text" className="form-control" value={fields.postal} {...$field('postal', (e) => onChange('postal', e.target.value))}/>
							{$validation.postal.show && <span className="spn-error">{$validation.postal.error.reason}</span>}
                        </div>
                    </div>
                    <div className="form-group label-floating card-no form-addressfield">
                        <div className="input-group">
                            <label className="control-label">Address</label>
                            <input id="postal-address" type="text" className="form-control" />
                        </div>
                    </div>
                    <div className="col-sm-6 padding-left-0 padding-right-10">
                        <div className="form-group label-floating card-no">
                            <div className="input-group">
                                <label className="control-label">Unit Number 2</label>
                                <input type="text" className="form-control" value={fields.unitnumber2} {...$field('unitnumber2', (e) => onChange('unitnumber2', e.target.value))}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 padding-right-0 padding-left-10">
                        <div className="form-group label-floating card-no">
                            <div className="input-group">
                                <label className="control-label">Unit Number 1</label>
                                <input type="text" className="form-control" value={fields.unitnumber1} {...$field('unitnumber1', (e) => onChange('unitnumber1', e.target.value))}/>
                            </div>
                        </div>
                    </div>
                    <div className="clearfix"></div>

                    <div className="form-group label-floating card-no">
                        <div className="input-group">
                            <label className="control-label">Company Name</label>
                            <input type="text" className="form-control" value={fields.company} {...$field('company', (e) => onChange('company', e.target.value))}/>
                        </div>
                    </div>
                    <div className="space-20"><span className="spn-error" id="form-error"></span></div>
                    <div className="text-center ">
                        <button type="button" className="btn btn-raised btn-info full-width-btn-2 text-uppercase" onClick={(e) => { e.preventDefault(); this.props.$submit(onValid, onInvalid);}}>send</button>
                    </div>
                    <div className="space-20"></div>
                </div>
                <div className="clearfix"></div>
            </div>
          </div>
    )
  }
}
Form = validated(validationConfig)(Form)

export default Signup;
