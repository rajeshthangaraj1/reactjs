/* eslint-disable */
import React from 'react';
import { Link, hashHistory} from 'react-router'
import update from 'immutability-helper'
import validator from 'validator'
import {validated} from 'react-custom-validation'
import { DateField } from 'react-date-picker'
import 'react-date-picker/index.css'
import axios from 'axios'; 
import cookie from 'react-cookie';
import getResult from './Api';
const config = require('./config');
const Loading = require('./loading');
const APIURL = config.path.apiUrl;
const APPID  = config.ids.appId;
const todayDate = new Date().toISOString(); 
const lang = require('./lang');
import DocumentMeta from 'react-document-meta';
/* Load meta tags */
  const meta = {
      title: lang.myaccount_meta_title,
      description: lang.myaccount_meta_title,
      meta: {
        name: {
          keywords: lang.myaccount_meta_title
        }
      }
    };
class Myaccount extends React.Component { 
	constructor(props) {
	   super(props);
	   this.state = {
			fields: {
			  firstname: '',
			  lastname: '',
			  email: '',
			  mobile: '',
			  postal: '', 
			  unitnumber2: '',
			  unitnumber1: '',
			  company: '',
			  birthday:''
			},
			status:'Loading'  
		};
	   
	    /* check Authentication */
	    if(getResult('Auth') === false ){
		hashHistory.push("/sign-in");
		}
	 }
	
	componentWillMount() {  
		/* API CALL FOR CUSTOMER DETAIL*/
		axios.get(APIURL+'/customer/customerdetail?app_id='+APPID+"&refrence="+cookie.load('UserId'))
		 .then(res => {
			if(res.data.status === "ok"){
				this.setState({fields:{
				firstname: res.data.result_set.customer_first_name,
				lastname: res.data.result_set.customer_last_name,
				email: res.data.result_set.customer_email,
				mobile: res.data.result_set.customer_phone,
				postal: res.data.result_set.customer_postal_code,
				unitnumber2: res.data.result_set.customer_address_line2,
				unitnumber1: res.data.result_set.customer_address_line1,
				birthday : res.data.result_set.customer_birthdate,
				company: res.data.result_set.customer_company_name
				},status: res.data.status });
				document.getElementById("postal-address").value = res.data.result_set.customer_address_name;
				document.getElementById("postal-address").setAttribute("value",res.data.result_set.customer_address_name); 
				var vDefaultAddr = '';
				if(res.data.result_set.customer_address_name!==''){
					vDefaultAddr += '<p><b>Default Billing Address</b></p><p id="user-default-address" >'+res.data.result_set.customer_address_name+'<br />';
				}
				if(res.data.result_set.customer_address_line1!==''){
					vDefaultAddr += res.data.result_set.customer_address_line1+'<br />';
				}
				if(res.data.result_set.customer_address_line2!==''){
					vDefaultAddr += res.data.result_set.customer_address_line2+'<br />';
				}
				if(res.data.result_set.customer_postal_code!==''){
					vDefaultAddr += res.data.result_set.customer_postal_code;
				} 
				vDefaultAddr += '</p>';
				document.getElementById("user-default-billing-address").innerHTML=vDefaultAddr;
				var list = document.getElementsByClassName('form-group');
				var n;
				for (n = 0; n < list.length; ++n) {
					list[n].classList.remove("is-empty");
				}
			} else {
				cookie.remove("UserId");
			    cookie.remove("UserFname");
			    cookie.remove("UserLname");
			    cookie.remove("UserMobile");
			    cookie.remove("UserEmail");
				//hashHistory.push("/my-account");
				this.setState({status: res.data.status});
			}
		}); 
		
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
		formPayload.address = document.getElementById("postal-address").value;
		/*if(document.getElementById("user-default-address-id").value!== null){
			formPayload.defaultAddressId = document.getElementById("user-default-address-id").value;
		} else {
			formPayload.defaultAddressId = 0;
		}*/
		if(formPayload.birthday===''){
			document.getElementById("spn-birthday-error").innerHTML='This field is required.';
			return false;
		} else {
			document.getElementById("spn-birthday-error").innerHTML='';
		} 
		
		if(formPayload.address===''){
			document.getElementById("spn-address-error").innerHTML='This field is required.';
			return false;
		} else {
			document.getElementById("spn-address-error").innerHTML='';
		}  
	    var qs = require('qs');
	    var postObject = {
				   "app_id": APPID,
				   "type" : "web",
				   "customer_first_name" : formPayload.firstname,
				   "customer_last_name": formPayload.lastname,
				   "customer_email" : formPayload.email,
				   "customer_phone" : formPayload.mobile,
				   "customer_birthdate" : formPayload.birthday,
				   'customer_postal_code': formPayload.postal, 
				   'customer_address_name': formPayload.address,
					'customer_company_name': formPayload.company,
					'customer_address_line1': formPayload.unitnumber1,
					'customer_address_line2': formPayload.unitnumber2,
					'customer_id': cookie.load('UserId')
				   }; 
		this.setStateLoading('Loading');
		axios.post(APIURL+"customer/updateprofile", qs.stringify(postObject))
		.then(response => {
				
				setTimeout(function() {
					if(response.data.status==="ok"){
						this.setStateLoading('ok');
						//cookie.save("UserId",response.data.result_set.customer_id);
						cookie.save("UserFname",response.data.result_set.customer_first_name);
						cookie.save("UserLname",response.data.result_set.customer_last_name);
						cookie.save("UserMobile",response.data.result_set.customer_phone);
						cookie.save("UserEmail",response.data.result_set.customer_email);
						document.getElementById("form-msg").innerHTML='<p class="spn-success">'+response.data.message+'</p>'; 
					} else {
						this.setStateLoading('error');
						document.getElementById("form-msg").innerHTML='<p class="spn-error">'+response.data.message+'</p>';
					}
				}.bind(this) , 500);
		  })
		  .catch(function (error) {
			  console.log(error);
		  });  
	}  
	render() {
		 if(this.state.status === "Loading"){
			return ( <Loading/>); 
		 } else {
			return (<div> 
		<DocumentMeta  {...meta} /><Form
			  fields={this.state.fields}
			  onChange={this.fieldChange}
			  onValid={this.handleFormSubmit}
			  onInvalid={() => console.log('Form invalid!')}
			/></div>)
		}
	}
}

const phonenumberPattern = /^[0-9]{6,14}$/; 
const postalcodePattern  = /^\d{6}$/;

const isEmpty = (value) =>
  value === '' ? 'This field is required.' : null
  
const isEmail = (email) =>
  validator.isEmail(email) ? null : 'This is not a valid email.'

const isMobile = (mobile) => {
	if(mobile){
	mobile.match(phonenumberPattern) ? null : 'This is not a valid mobile number.'
	}
}
	
const isPostal = (postal) =>{
	if(postal){
	postal.match(postalcodePattern) ? null : 'This is not a valid postal code.' 
	}
}

const loadPostalAddress = (postal) => {
	
	if(postal && postal.match(postalcodePattern)){
	
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
				document.getElementById("spn-postal-error").innerHTML='';
			} else {
				document.getElementById("spn-postal-error").innerHTML='<span class="spn-error">This is not a valid postal code.</span>';
				document.getElementById("postal-code").value = '';
				document.getElementById("postal-code").setAttribute("value",'');
				document.getElementById("postal-address").value = '';
				document.getElementById("postal-address").setAttribute("value",'');
			}  
		});
	}
}

function validationConfig(props) {
  const {firstname, lastname, email, mobile, postal} = props.fields

  return { 
    fields: ['firstname', 'lastname', 'email', 'mobile', 'postal'],

    validations: {
	  firstname:[
		[isEmpty, firstname]
	  ],
	  lastname:[
		[isEmpty, lastname]
	  ],
      email: [
        [isEmail, email] 
      ],
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
	constructor(props) {
		super(props);
		this.state = { 
			status:'Loading',
			secAddrData:[] 
		}; 
	}
	componentWillMount(){  
		this.setStateLoading('ok');
		this.getSecAddr();
	} 
	loadSecAddr(dataArr){
		 
		var htmlStr = dataArr.reverse().map(
				function(data, index) {  
				return  <p id="user-default-address" key={index}> 
				<img src={"/img/icons/modal-close.png"} alt="" className="settings-img" style={{width:'15px',float:'right',cursor:'pointer'}} onClick={() => {this.DeleteSecAddr(data.secondary_address_id)}} />
				{data.address}
				{ data.unit_code ? <br /> :''}
				{ data.unit_code ? data.unit_code :''}
				{ data.unit_code2 ? <br /> :''}
				{ data.unit_code2 ? data.unit_code2 :''}
				{ data.postal_code ? <br /> :''}
				{ data.postal_code ? data.postal_code :''} 
				</p>; 
		}.bind(this));
		return htmlStr;
	}
	DeleteSecAddr(pmId){
		this.setStateLoading('Loading');  
		var qs = require('qs');
	    var postObject = {
				   "app_id": APPID,
				   "type" : "web",
				   "secondary_address_id" : pmId,
				   "refrence": cookie.load('UserId')
				   };  
			
		axios.post(APIURL+"customer/secondary_address_remove", qs.stringify(postObject))
			.then(response => { 
				this.setStateLoading('ok');
				this.getSecAddr();
		  })
		  .catch(function (error) {
			  console.log(error);
		  });
	  }
	loadPostalAddress() { 
		var postal = document.getElementById("customer_postal_code").value;
		if(postal.match(postalcodePattern)){
		axios.get(APIURL+'/settings/get_address?app_id='+APPID+"&zip_code="+postal)
		 .then(res => {
		  if(res.data.status==="ok"){ 
			  document.getElementById("customer_address_line1").value = res.data.result_set.zip_sname;
			  document.getElementById("customer_address_line1").setAttribute("value",res.data.result_set.zip_sname); 
				document.getElementById("spn-postalcode-error").innerHTML='';
				var list = document.getElementsByClassName('form-group');
				var n;
				for (n = 0; n < list.length; ++n) {
					list[n].classList.remove("is-empty");
				}
			} else { 
				document.getElementById("spn-postalcode-error").innerHTML='<span class="spn-error">This is not a valid postal code.</span>';
				document.getElementById("customer_postal_code").value = '';
				document.getElementById("customer_postal_code").setAttribute("value",'');
				document.getElementById("customer_address_line1").value = '';
				document.getElementById("customer_address_line1").setAttribute("value",'');
			}  
		});
		}
	}
	openNewAddress() { 
		document.getElementsByClassName('new-user-reg')[0].style.display = "block"; 
		document.getElementById("checkout").classList.remove("disable-btn"); 
	}
	setStateLoading(sts){
		this.setState({status: sts});
	} 
	saveNewAddress(){
		var vsuccess = true;
		var vPostalCode = document.getElementById("customer_postal_code").value;
		var vAddress = document.getElementById("customer_address_line1").value;
		if(vPostalCode===''){
			document.getElementById("spn-postalcode-error").innerHTML='This field is required.'; 
			vsuccess = false;
		} else if(vPostalCode!=='' && (vPostalCode.match(postalcodePattern)===null)){
			document.getElementById("spn-postalcode-error").innerHTML='This is not a valid postal code.'; 
			vsuccess = false;
		} else {
			document.getElementById("spn-postalcode-error").innerHTML='';
		}
		if(vAddress===''){
			document.getElementById("spn-addr-error").innerHTML='This field is required.'; 
			vsuccess = false;
		} else {
			document.getElementById("spn-addr-error").innerHTML='';
		} 
		if(vsuccess){
			this.setStateLoading('Loading');
			 
			var qs = require('qs');
			var postObject = {
				   "app_id": APPID,
				   "type" : "web",
				   "customer_first_name" : cookie.load('UserFname'),
				   "customer_last_name": cookie.load('UserLname'),
				   "customer_email" : cookie.load('UserEmail'),
				   "customer_address_line1" : document.getElementById("customer_address_line1").value,
				   "customer_postal_code" : document.getElementById("customer_postal_code").value,
				   "customer_address_name" : document.getElementById("customer_address_name").value,
				   'customer_address_name2': document.getElementById("customer_address_name2").value, 
				   'refrence': cookie.load('UserId')
				   };
     
			axios.post(APIURL+"customer/secondary_address_add", qs.stringify(postObject))
			.then(response => { 
				if(response.data.status==="ok"){ 
					this.setStateLoading('ok');
					document.getElementById("form-msg1").innerHTML='<p class="spn-success">'+response.data.message+'</p>'; 
					this.getSecAddr();
				} else { 
					this.setStateLoading('error');
					document.getElementById("form-msg1").innerHTML='<p class="spn-error">'+response.data.message+'</p>'; 
				}
				this.openNewAddress();
		  })
		  .catch(function (error) {
			  console.log(error);
		  });
		}
		return false;
	}
	getSecAddr(){
		axios.get(APIURL+'/customer/get_user_secondary_address?app_id='+APPID+"&refrence="+cookie.load('UserId'))
		.then(res => {
			if(res.data.status === "ok"){
				
				this.setState({secAddrData: res.data.result_set});
			}
		});

		/* API CALL FOR CUSTOMER DETAIL*/
		axios.get(APIURL+'/customer/customerdetail?app_id='+APPID+"&refrence="+cookie.load('UserId'))
		 .then(res => {
			if(res.data.status === "ok"){ 
				document.getElementById("postal-address").value = res.data.result_set.customer_address_name;
				document.getElementById("postal-address").setAttribute("value",res.data.result_set.customer_address_name); 
				var vDefaultAddr = '';
				if(res.data.result_set.customer_address_name!==''){
					vDefaultAddr += '<p><b>Default Billing Address</b></p><p id="user-default-address" >'+res.data.result_set.customer_address_name+'<br />';
				}
				if(res.data.result_set.customer_address_line1!==''){
					vDefaultAddr += res.data.result_set.customer_address_line1+'<br />';
				}
				if(res.data.result_set.customer_address_line2!==''){
					vDefaultAddr += res.data.result_set.customer_address_line2+'<br />';
				}
				if(res.data.result_set.customer_postal_code!==''){
					vDefaultAddr += res.data.result_set.customer_postal_code;
				} 
				vDefaultAddr += '</p>';
				document.getElementById("user-default-billing-address").innerHTML=vDefaultAddr;
				var list = document.getElementsByClassName('form-group');
				var n;
				for (n = 0; n < list.length; ++n) {
					list[n].classList.remove("is-empty");
				}
			} else { 
				cookie.remove("UserId");
			    cookie.remove("UserFname");
			    cookie.remove("UserLname");
			    cookie.remove("UserMobile");
			    cookie.remove("UserEmail");
				//hashHistory.push("/my-account");
			}
		});
	}
	
	render() {
		if(this.state.status === "Loading"){
			return ( <Loading/>); 
		 } else {
			const {fields, onChange, onValid, onInvalid, $field, $validation} = this.props
			
			return (
				<div className="container-fluid desktop-container">
				   <div className="row">
					  <div className="col-xs-12 top-nav inner-top-nav">
						 <div className="col-xs-3 nav-head pd-l-20"> <Link to={"/"}><img src="/img/icons/arrow-right.png" alt="left-arrow" className="icon-img-small-3" /></Link>
						</div>
						 <div className="col-xs-6 nav-head ">
							<h1 className="main-title">my account</h1>
						 </div>
						 <div className="col-xs-3 nopadding">
							<p className="b-txt text-right ">
							   <img src="/img/icons/shopping-cart.png" className="icon-img-small-1-inner" alt="shopping-cart" /> 
							</p>
						 </div>
					  </div>
				   </div>
				   <div className="row login-container color-grey">
					  <div className="col-lg-12 myAccount">
						 <div className="profileimage">
							<img src="/img/no-images/productthump-no-image.jpg" style={{width:'150px',height:'150px',borderRadius:'100px'}} alt="profile" />
							<h1>{fields.firstname} {fields.lastname}</h1>
							<h5>{fields.email}</h5>
							{/*<img src="/img/100but.png" alt="profile" />*/}
						 </div>
					  </div>
					  <div className="col-lg-12">
						 <div className="myAccountTabs">
							<div className="col-md-offset-4 col-xs-offset-4 col-md-4 col-xs-4">
							   <Link to={"/orders"}><img src="/img/icons/view-oder.png" alt="" />
							   <h4>View Orders</h4></Link>
							</div>
							{/*<div className="col-md-4 col-xs-4">
							   <img src="/img/icons/view-rewards.png" alt="" />
							   <h4>View Rewards</h4>
							</div>
							<div className="col-md-4 col-xs-4">
							   <img src="/img/icons/share.png" alt="" />
							   <h4>Share</h4>
							</div>*/}
						 </div>
					  </div>
					  <div className="col-lg-12 myAccountForm">
						 <h1>ACCOUNT INFORMATIONS</h1> 
						 <div className="Form-holder" id="myaccount-form">
							<div className="form-group label-floating card-no">
							   <div className="input-group">
								  <label className="control-label">First Name</label>
									<input type="text" className="form-control"  value={fields.firstname || ''} {...$field('firstname', (e) => onChange('firstname', e.target.value))}/>
									{$validation.firstname.show && <span className="spn-error">{$validation.firstname.error.reason}</span>}
								</div>
							</div>
							<div className="form-group label-floating card-no">
							   <div className="input-group">
								  <label className="control-label">Last Name</label>
									<input type="text" className="form-control"  value={fields.lastname || ''} {...$field('lastname', (e) => onChange('lastname', e.target.value))}/>
									{$validation.lastname.show && <span className="spn-error">{$validation.lastname.error.reason}</span>}
								</div>
							</div>
							<div className="form-group label-floating card-no">
							   <div className="input-group">
								  <label className="control-label">Email Address</label> 
									<input type="text" className="form-control" value={fields.email || ''} {...$field('email', (e) => onChange('email', e.target.value))}/>
									{$validation.email.show && <span className="spn-error">{$validation.email.error.reason}</span>}
								</div>
							</div>
							<div className="form-group label-floating card-no">
							   <div className="input-group">
								  <label className="control-label">Mobile Number</label> 
									<input type="text" className="form-control" value={fields.mobile || ''} {...$field('mobile', (e) => onChange('mobile', e.target.value))}/>
									{$validation.mobile.show && <span className="spn-error">{$validation.mobile.error.reason}</span>}
								</div>
							</div>
							<div className="form-group label-floating card-no">
							   <div className="input-group">
								 <label className="control-label">Birthday</label>
									<DateField maxDate={todayDate} defaultValue={fields.birthday || ''} dateFormat="YYYY-MM-DD" id="date-pick" />
									<span id="spn-birthday-error" className="spn-error" style={{clear:'both'}}></span>
								</div>
							</div>
							<div className="form-group label-floating card-no">
							   <div className="input-group">
									<label className="control-label">Postal Code</label>
									<input id="postal-code" type="text" className="form-control" value={fields.postal || ''} {...$field('postal', (e) => onChange('postal', e.target.value))}/>
									<div id="spn-postal-error" >{$validation.postal.show && <span className="spn-error">{$validation.postal.error.reason}</span>}</div>
								</div>
							</div>
							<div className="form-group label-floating card-no form-addressfield">
								<div className="input-group">
									<label className="control-label">Address</label>
									<input id="postal-address" type="text" className="form-control" />
									<span id="spn-address-error" className="spn-error"></span>
								</div>
							</div>
							<div className="form-group label-floating card-no col-xs-6">
							   <div className="input-group">
									<label className="control-label">Unit Number 2</label>
									<input type="text" className="form-control" value={fields.unitnumber2 || ''} {...$field('unitnumber2', (e) => onChange('unitnumber2', e.target.value))}/>
								</div>
							</div>
							<div className="form-group label-floating card-no col-xs-6 unitno">
							   <div className="input-group">
								  <label className="control-label">Unit Number 1</label>
										<input type="text" className="form-control" value={fields.unitnumber1 || ''} {...$field('unitnumber1', (e) => onChange('unitnumber1', e.target.value))}/>
									</div>
							</div>
							<div className="form-group label-floating card-no mt80">
							   <div className="input-group">
								  <label className="control-label">Company Name</label>
									<input type="text" className="form-control" value={fields.company || ''} {...$field('company', (e) => onChange('company', e.target.value))}/>
								</div>
							</div>
							<div className="space-20" id="form-msg"></div>
							<div className="text-center ">
							   <button type="button" className="btn btn-raised btn-info full-width-btn text-uppercase color-green"  onClick={(e) => { e.preventDefault(); this.props.$submit(onValid, onInvalid);}}>
								  update profile
								  <div className="ripple-container"></div>
							   </button>
							   <br />
							</div>
							<div className="text-left row" id="default-address">
							   <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
								  <div id="user-default-billing-address"></div>
								  {this.loadSecAddr(this.state.secAddrData)} 
							   </div> 
							</div>
							<div className="row disabled-continue-as-a-guest">
							   <div className="col-lg-12 text-center">
								  <button type="button" id="checkout" onClick={() => {this.openNewAddress()}} className="btn btn-raised btn-info full-width-btn text-uppercase disable-btn focusgrey" >Add new Address</button><br />
							   </div>
							   <div className="space-50 hide-on-click"></div> 
							</div>
							<div className="new-user-reg">
							   <div className="form-group label-floating card-no">
								  <div className="input-group">
									 <label className="control-label">Postal Code</label>
									 <input type="text" id="customer_postal_code" className="form-control" onChange={() => {this.loadPostalAddress()}}/>
									 <span id="spn-postalcode-error" className="spn-error"></span>
								  </div>
							   </div>
							   <div className="form-group label-floating card-no">
								  <div className="input-group">
									 <label className="control-label">Address</label>
									 <input type="text" id="customer_address_line1" className="form-control" />
									 <span id="spn-addr-error" className="spn-error"></span>
								  </div>
							   </div>
							   <div className="form-group label-floating card-no col-xs-6">
								  <div className="input-group">
									 <label className="control-label">Unit No 2</label>
									 <input type="text" id="customer_address_name" className="form-control" />
								  </div>
							   </div>
							   <div className="form-group label-floating card-no col-xs-6 unitno">
								  <div className="input-group">
									 <label className="control-label">Unit No 1</label>
									 <input type="text" id="customer_address_name2" className="form-control" />
								  </div>
							   </div>
							   <div className="space-20" id="form-msg1"></div>
							   <div className="text-center">
								  <button type="button" onClick={this.saveNewAddress.bind(this)} className="btn btn-raised btn-info full-width-btn text-uppercase">
									 add
									 <div className="ripple-container"></div>
								  </button>
								  <br />
							   </div>
							   <div className="space-50"></div>
							   <div className="space-10"></div>
							</div>
						 </div>
					  </div>
				   </div>
				</div>
			
		
    )
	}
  }
}
Form = validated(validationConfig)(Form)

export default Myaccount;
 
