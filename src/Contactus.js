import React from 'react';
import { Link  } from 'react-router'
import update from 'immutability-helper'
import {validated} from 'react-custom-validation' 
const lang = require('./lang');
import DocumentMeta from 'react-document-meta';
/* Load meta tags */
  const meta = {
      title: lang.contactus_meta_title,
      description: lang.contactus_meta_title,
      meta: {
        name: {
          keywords: lang.contactus_meta_title
        }
      }
    };
    
class Contactus extends React.Component {
  state = {
    fields: {
      name: '',
      mobile: '',
      restaurant: '',
      website: ''
    }
  }

  fieldChange = (field, value) => {
    this.setState(update(this.state, {fields: {[field]: {$set: value}}}))
  }
  
  handleFormSubmit = () => { } 
  render() {
    return (<Form
      fields={this.state.fields}
      onChange={this.fieldChange}
      onValid={this.handleFormSubmit}
      onInvalid={() => console.log('Form invalid!')}
    />)
  }
}
const phonenumberPattern = /^[0-9]{6,14}$/;
const isEmpty = (value) =>
  value === '' ? 'This field is required.' : null 
  
const isMobile = (mobile) =>
	mobile.match(phonenumberPattern) ? null : 'This is not a valid mobile number.'
  
function validationConfig(props) {
  const {name,mobile,restaurant,website} = props.fields

  return { 
    fields: ['name', 'mobile', 'restaurant', 'website'],

    validations: {
      name: [[isEmpty, name]],
      mobile: [[isEmpty, mobile],[isMobile, mobile]],
      restaurant: [[isEmpty, restaurant]],
      website: [[isEmpty, website]],
    }
  }
}

class Form extends React.Component {
  render() {
    const {fields, onChange, onValid, onInvalid, $field, $validation} = this.props
    return (
    <div>
		<DocumentMeta  {...meta} />
		<div className="container-fluid desktop-container">
		<div className="row">
			<div className="col-xs-12 main-title-bar">
				<Link to={"/"}> <img src="/img/left-arrow.png" className="pull-left icon-img-small" alt="left-arrow" /> </Link>
				<h3 className="top-title main-title padding-right-20 text-uppercase">contactus</h3>
			</div>
		</div>
		<div className="row"><div className="space-10 bg-gray"></div></div>
		<div className="white-outer center-block">
			<div className="col-xs-10 div-center">
				<div className="space-20"></div>
				<p className="text-left font-bold font-size-18">Contact Details</p>
				Singapore Office<br/>
				Inno Centre, 1003 Bukit Merah Central,<br/>
				#07-41, <br/>Singapore 159836<br/><br />
				<hr/>
				<div className="space-5"></div>
				<div className="form-group label-floating is-empty card-no">
					<div className="input-group">
						<label className="control-label">Name</label>
						<input type="text" className="form-control"  value={fields.name} {...$field('name', (e) => onChange('name', e.target.value))}/>
						{$validation.name.show && <span className="spn-error">{$validation.name.error.reason}</span>}
					</div>
				</div>
				<div className="form-group label-floating is-empty card-no">
					<div className="input-group">
						<label className="control-label">Telephone Number</label> 
						<input type="text" className="form-control" value={fields.mobile} {...$field('mobile', (e) => onChange('mobile', e.target.value))}/>
						{$validation.mobile.show && <span className="spn-error">{$validation.mobile.error.reason}</span>}
					</div>
				</div>
				<div className="form-group label-floating is-empty card-no">
					<div className="input-group">
						<label className="control-label">Restaurant Name</label>
						<input type="text" className="form-control" value={fields.restaurant} {...$field('restaurant', (e) => onChange('restaurant', e.target.value))}/>
						{$validation.restaurant.show && <span className="spn-error">{$validation.restaurant.error.reason}</span>}
					</div>
				</div>
				<div className="form-group label-floating is-empty card-no">
					<div className="input-group">
						<label className="control-label">Website</label>
						<input type="text" className="form-control" value={fields.website} {...$field('website', (e) => onChange('website', e.target.value))}/>
						{$validation.website.show && <span className="spn-error">{$validation.website.error.reason}</span>}
					</div>
				</div>
				<div className="text-center ">
					<button type="button" className="btn btn-raised btn-info full-width-btn text-uppercase" onClick={(e) => { e.preventDefault(); this.props.$submit(onValid, onInvalid);}}>Send<div className="ripple-container"></div></button><br />
				</div>
				<div className="space-20"></div>
			</div>
			<div className="clearfix"></div>
		</div>
		<div className="space-30"></div>
		<div className="space-30"></div>
		<div className="space-10"></div>
		<div className="space-30"></div>
		<div className="space-10"></div>
		<div className="space-10"></div>
	  </div>
	  </div>
    )
  }
}
Form = validated(validationConfig)(Form)

export default Contactus; 
