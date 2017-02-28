/* eslint-disable */ 
import React from 'react'; 
import { Link , hashHistory } from 'react-router' 
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
import theme from '../public/react-toolbox/theme.js'
import '../public/react-toolbox/theme.css'
import DatePicker from 'react-toolbox/lib/date_picker/DatePicker';
const datetime = new Date(); 
var currentDate = datetime.getDate();
const min_datetime = new Date(new Date(datetime).setDate(currentDate-1));
import TimePicker from 'react-toolbox/lib/time_picker/TimePicker';
import DocumentMeta from 'react-document-meta';
const lang = require('./lang');
const config = require('./config');
import cookie from 'react-cookie';
import getResult from './Api';
let time = new Date(); 

 /* Load meta tags */
  const meta = {
      title: lang.choose_delvery_date,
      description: lang.site_title,
      meta: {
        name: {
          keywords: lang.site_title
        }
      }
    };
	
class DeliveryDatePicker extends React.Component {

  constructor(props) {
       super(props);
	    /* validate delivery avilablity */
		 if(cookie.load('defaultAvilablityId') !== config.ids.deliveryId)
		 {
		   	 hashHistory.push("/");
		 }
	   
	   }
  state = {date2: datetime,time};

  handleChange = (item, value) => {
    this.setState({...this.state, [item]: value});
    var des = document.getElementsByClassName('deliverydate') 
	var label = des[0].getElementsByTagName('label');
	label[0].style.top='0px';
  };
  handleChangeTime = (time) => {
   console.log(time);
    this.setState({time}); 
  };
  componentDidMount () {  
	var des = document.getElementsByClassName('deliverydate')
	var fc = des[0].getElementsByTagName('div');
	var se = fc[0].getElementsByTagName('div');
	se[0].style.padding='0px';
	var input = se[0].getElementsByTagName('input'); 
	input[0].style.borderBottom='0px';
	var label = des[0].getElementsByTagName('label');
	label[0].style.top='6px';
	
	var des1 = document.getElementsByClassName('deliverytime')
	var fc1 = des1[0].getElementsByTagName('div');
	var se1 = fc1[0].getElementsByTagName('div');
	se1[0].style.padding='0px';
	var input1 = se1[0].getElementsByTagName('input'); 
	input1[0].style.borderBottom='0px';
	var label1 = des1[0].getElementsByTagName('label');
	label1[0].style.top='0px';
	
  }
  
  /* this function used to load cart icon image */
  loadCartImage()
  {
   return getResult('cartImage','Yes');
  }
  
  /* store unit no's */
  stroteUnitNoOne(event)
  {
    cookie.save('unitNoOne',event.target.value);
  } 
  
    /* store unit no's */
  stroteUnitNoTwo(event)
  {
    cookie.save('unitNoTwo',event.target.value);
  } 
  
  /* validate delivery date */
  checkDeliveryDate()
  {
    var seldate = document.getElementsByClassName('deliverydate')[0].getElementsByTagName('input')[0].value;
	var seltime  = document.getElementsByClassName('deliverytime')[0].getElementsByTagName('input')[0].value;

	 if(seldate !=="" && seltime !==""){
	    cookie.save('DeliveryDate',seldate);
	    cookie.save('DeliveryTime',seltime);
		 	 hashHistory.push("/checkout");
	 
	 }else{
	  alert(lang.choose_delvery_date_error);
	 }
  } 
  render() {

    return (
	        <div> <DocumentMeta  {...meta} />
			<div className="container-fluid desktop-container">  
				<div className="row">
					<div className="col-xs-12 top-nav inner-top-nav">
						<div className="col-xs-3 nav-head pd-l-20">
							<Link to={"/add-on"}><img src="/img/icons/arrow-right.png" alt="left-arrow" className="icon-img-small-3" /></Link> 
						</div>
						<div className="col-xs-6 nav-head ">
							<h1 className="main-title">Delivery</h1>
						</div>
						<div className="col-xs-3 nopadding">
							<p className="b-txt text-right ">
								<Link to={"/cart"} >  <img alt=""  src={this.loadCartImage()}className="icon-img-small-1"/> </Link>
							</p>
						</div>
					</div> 
				</div>
				<div className="row">
					<div className="col-lg-12 calender-area">
						<div className="col-xs-12 calender-area-sub">
							<div className="col-xs-offset-2 col-xs-8 cal-div">
								<h1 className="sub-heading" style={{textAlign:'center'}}>SELECT YOUR DELIVERY DATE AND TIME</h1>
								<div className="form-group label-floating is-empty card-no">
									<div className="input-group deliverydate">
										<ThemeProvider theme={theme}>
{/* <DatePicker label='Date (dd/mm/yyyy)' sundayFirstDayOfWeek onChange={this.handleChange.bind(this, 'date')} value={this.state.date} /> */}

  <DatePicker label='Date (dd/mm/yyyy)'  minDate={min_datetime}  sundayFirstDayOfWeek inputFormat={(value) => `${value.getDate()}-${value.getMonth() + 1}-${value.getFullYear()}`} onChange={this.handleChange.bind(this, 'date')} value={this.state.date} />
										</ThemeProvider>
									</div>
								</div> 
								<div className="form-group label-floating is-empty card-no">
									<div className="input-group deliverytime">
										<ThemeProvider theme={theme}>
											<TimePicker label='Time' onChange={this.handleChangeTime} value={this.state.time} />
										</ThemeProvider>
									</div>
								</div>
								<div className="space-35"></div>
							</div>
						</div> 
						<div className="col-xs-12 calender-area-sub-2">
							<h1 className="sub-heading" style={{textAlign:'center'}}>DELIVERY TO</h1>
							<h1 className="sub-heading-2" style={{textAlign:'center'}}>{cookie.load('orderDeliveryAddress')}</h1>
							<div className="col-xs-8 unit-no-div">
								<div className="form-group col-sm-6 col-xs-12 no-margin">
									<div className="form-group label-floating is-empty card-no">
										<div className="input-group">
											<label className="control-label">Unit No</label>
											<input type="text" id="unitone" className="form-control"  onChange={this.stroteUnitNoOne }    />
										</div>
									</div>
								</div>
								<div className="form-group col-sm-6 col-xs-12 no-margin">
									<div className="form-group label-floating is-empty card-no">
										<div className="input-group">
											<label className="control-label">Unit No</label>
											<input type="text" id="unittwo" className="form-control" onChange={this.stroteUnitNoTwo } />
										</div>
									</div>
									<br />
								</div>
								<div className="clearfix"></div>
							</div>
						</div>
						<div className="space-30"></div>
					</div>
				</div>
				<div className="space-50"></div>
				<div className="space-50"></div>
				<div className="space-30"></div> 

				<div className="row">
					<Link onClick={this.checkDeliveryDate.bind()}>
						<button className="col-lg-12 continue-but desktop-container container-fluid">Continue</button>
					</Link>
				</div>
			</div></div>
		); 
	 }
 }
 export default DeliveryDatePicker;
