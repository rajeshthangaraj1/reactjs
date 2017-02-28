import React from 'react';
import axios from 'axios';
import { Link, hashHistory  } from 'react-router'
//import getResult from './Api';
const config = require('./config');
const lang = require('./lang');
//const APIURL = config.path.apiUrl;
const APIURLPRO = config.path.apiUrlPro;
const APPID = config.ids.appId;
import DocumentMeta from 'react-document-meta';
//var strp = require('strp');
import cookie from 'react-cookie';
var dateFormat = require('dateformat');
var now = new Date();
var currentTime = dateFormat(now, "h:MM TT");

 /* Load meta tags */
  const meta = {
      title: lang.ordersuccess_meta_title+lang.site_title_with_separator,
      description: lang.ordersuccess_meta_title,
      meta: {
        name: {
          keywords: lang.ordersuccess_meta_title
        }
      }
    };
	
class Ordersuccess extends React.Component {
	 constructor(props) {
	  super(props);
	    	  this.state = { cartResult:0,cartDetails:[],cartItems:[],status:'Loading'};
			
			if(typeof cookie.load('UserId') === 'undefined'){
			
				hashHistory.push("/");
			}
	}

	componentWillMount() { 
	    
				/* API CALL FOR BANNERS */
			 var orderId = this.props.params.orderId;
		axios.get(APIURLPRO+'reports/order_history?app_id='+APPID+"&local_order_no="+orderId+"&customer_id="+cookie.load('UserId'))
		 .then(res => {
		  if(res.data.status === "ok"){
		    this.setState({status: res.data.status});
		     this.setState({cartItems: res.data.result_set[0]['items']});
		     this.setState({cartDetails: res.data.result_set[0]});
		  } else {
		   	hashHistory.push("/");
		  }
	  	});  
	
	 }
	 
	 
	 /* this function used to load product items */	 
loadProductsItems()
{
 //console.log(this.state.cartItems);
 
 // return   this.state.cartItems.map((item, index)=> 
 return this.state.cartItems.map((item, index)=>  
		<tr key={index}>
			<td className="main-item">{item.item_qty} X {item.item_name}</td>
			<td className="text-right">{item.item_unit_price}</td>
		</tr>
		 
  );
}
 
  render() {
 
    return ( <div>  <DocumentMeta  {...meta} />
        <div className="container-fluid desktop-container">
            <div className="row">
                <div className="col-xs-12 main-title-bar">
                    <Link to={"/"} > <img src="/img/left-arrow.png" className="pull-left icon-img-small" alt="left-arrow"/> </Link>
                    <h3 className="top-title main-title">ORDER SUCCESS</h3>
                </div>
            </div>
            <div className="row"><div className="space-10 bg-gray"></div></div>
            <div className="white-outer center-block">
                <div className="row">

                    <div className="col-xs-12 padd2">
                        <img src="/img/success-background.jpg" className="img-responsive" alt="success-background"/>
                        <div className="thank-you-div">
                            <h3 className="thank-you">Thank You</h3>
                            <p className="thank-you-sub">Order has been <span className="thank-you-span">placed successfully</span></p>
                            <p className="text-center"><i className="fa fa-check thank-you-right"></i></p>
                        </div>
                    </div>
                </div>


                <div className="row ">
                    <div className="space-10"></div>
                    <h3 className="inner-title">your order details</h3>
                    <div className="space-10"></div>


                    <div className="col-xs-12 padd2">
                        <div className="col-sm-6  date-div">
                            <p className="font-weight-600 fs-15">Dine in Date :<span className="span-txt1"> {dateFormat(this.state.cartDetails.order_date,"d/m/yyyy")}</span></p>
                            <p className="font-weight-600 fs-15">Table :<span className="span-txt1">{this.state.cartDetails.order_table_number}</span></p>
                        </div>
                        <div className="col-sm-6 hidden-xs date-div">
                            <p className="text-right font-weight-600 fs-15"><span>Current Time : </span><span className="span-txt1">{currentTime}</span></p>
                            <p className="text-right">&nbsp;<span className="span-txt1">&nbsp;</span></p>
                        </div>
                        <div className="col-sm-6 visible-xs padding-left-right-30 date-div">
                            <p className=""><span>Current Time : </span><span className="span-txt1">{currentTime}</span></p>
                            <p className="text-right">&nbsp;<span className="span-txt1">&nbsp;</span></p>
                        </div>
                    </div>
                    <div className="col-xs-12 padd2">

                        <div className="col-sm-12 padd1 bg-gray order-div no-border">
                            <div className="space-5"></div>
                            <h3>Order No - {this.state.cartDetails.order_local_no}</h3>
                            <p>Order placed at : {dateFormat(this.state.cartDetails.order_created_on,"d/m/yyyy")}  ; {dateFormat(this.state.cartDetails.order_created_on,"h:MM TT")}</p>
                        </div>
                        <div className="col-sm-12 padd1 bg-gray price-list">
                            <table>
                                <tbody>
                                
								{this.loadProductsItems()}
								{/*    <tr>
                                        <td className="main-item">1 X Product Name</td>
                                        <td className="text-right">25.50</td>
                                    </tr>
                                    <tr>
                                        <td className="sub-item">Sub Item</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td className="sub-item">Sub Item 2</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td className="main-item pd-t-40 pd-b-40">1 X Product Name</td>
                                        <td className="text-right pd-t-40 pd-b-40">25.50</td>
                                    </tr>
									 */}
                                    <tr className="sub-total-tr">
                                        <td className="sub-total">Sub Total</td>
                                        <td className="sub-total text-right">{config.ids.currency+this.state.cartDetails.order_sub_total}</td>
                                    </tr>
                                    <tr>
                                        <td className="total">Total</td>
                                        <td className="total text-right">{config.ids.currency+this.state.cartDetails.order_total_amount}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-xs-12 padd1 price-list-footer1">
                            <p className="text-center">Problem with your order ? please email us<br/>
                                at <span>sales@ninjapro.com.sg</span></p>
                        </div>
                    </div>
                </div>
                <div className="space-20"></div>


            </div>
            <div className="space-50"></div>
            <div className="space-20"></div>

            <div className="row">
                <Link to={"/orders"}> <button className="col-lg-12 continue-but desktop-container container-fluid">GO TO MY ACCOUNT</button> </Link>
            </div>
        </div> </div> ); 
	  
	 }
 }
 
  
 export default Ordersuccess;
 