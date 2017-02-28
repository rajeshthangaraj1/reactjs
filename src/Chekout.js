/* eslint-disable */ 
import React from 'react';
import {  Link, hashHistory  } from 'react-router';
import axios from 'axios';
import getResult from './Api';
const config = require('./config');
const lang = require('./lang');
const APIURL = config.path.apiUrl;
const APPID = config.ids.appId;
const APIURLPRO = config.path.apiUrlPro;
import DocumentMeta from 'react-document-meta';
import cookie from 'react-cookie';
const Loading = require('./loading');
var dateFormat = require('dateformat');
var now = new Date();
var currentDate = dateFormat(now, "d/m/yyyy");
var currentTime = dateFormat(now, "h:MM TT");
var qs = require('qs');
import StripeCheckout from 'react-stripe-checkout';
//import Time from 'react-time';

 /* Load meta tags */
  const meta = {
      title: lang.checkout_meta_title + lang.site_title_with_separator,
      description: lang.checkout_meta_title,
      meta: {
        name: {
          keywords: lang.checkout_meta_title
        }
      }
	      };
 
class Chekout extends React.Component {

  constructor(props) {
       super(props);
       /* Declare state */
	   this.state = { cartResult:0,cartDetails:[],cartItems:[],status:'Loading',settings:[]};
	   
	   /* load cart details */
	   	  this.getCartDetails();
		  
		  
	    /* check Authentication */
	    if(getResult('Auth') === false ){
		   hashHistory.push("/sign-in");
		}
	   
	   /* check user informations  */
	     if(getResult('UserDetails') === false ){
		 alert(lang.user_info_missing);
	    	hashHistory.push("/my-account");
		}
		
		/* validate delivery details */
		if(cookie.load('defaultAvilablityId') === config.ids.deliveryId)
            { 
               if(getResult('DeliveryDetails') === false ){
		             alert(lang.delivery_info_missing);
	    	         hashHistory.push("/delivery-date");
		          }
            }
		
	   	/* validate cart details 
	 	axios.get(APIURL+'cart/contents?app_id='+APPID+"&customer_id="+cookie.load('UserId'))
		 .then(res => {
		  if(res.data.status === "ok"){
			  console.log('success');
		  } else{
		  alert('something went wrong');
	         hashHistory.push("/");
		  }
	  	});*/
	   
	   
	   
       /* get settings values */
	     var promise = getResult('settings','');
         promise.then(res => { 
		          this.setState({settings: res.data.result_set });
				  this.checkDeliveryAmount();
                  // console.log(this.state.settings);
		 });
 
   }
   
   
  /* post stripe account */   
  onToken = (token) => {
   /* add loading */
   this.setState({status:"Loading"});
    var postObject = {};
    postObject = { 
	'app_id' : APPID,
	'token' : token.id,
	"paid_amount":this.state.cartDetails.cart_grand_total,
	"outlet_name" :"",
	"payment_reference" : config.stripe.stripeReference
	} 
   
	  axios.post(APIURLPRO+"payment/stripeTokenPay", qs.stringify(postObject)).then(res => {
	        this.setState({status:""});
	           if(res.data.status === "ok"){
			     this.postOrder(2);
			     }
			  else if(res.data.status === "error") {
                alert(res.data.message);
			 }
      });
 
 }
 
 /* check  delivery account and grand total amount */
checkDeliveryAmount()
{
 /* check free  delivery */ 

  var freeDeliveryAmnt = this.state.settings.client_free_delivery_amount;
   var DeliveryAmnt = this.state.settings.client_delivery_surcharge;
   var grandTotal = this.state.cartDetails.cart_sub_total;
 
	if(this.state.cartDetails.cart_availability_id === config.ids.deliveryId && this.state.cartDetails.cart_delivery_charge > 0 && freeDeliveryAmnt > 0)
         {
				  this.setState({cartDetails: Object.assign({}, this.state.cartDetails, {cart_delivery_charge: 0,cart_grand_total:grandTotal})});
		  } 
}
  
  /* Load modifier arr */
  modifierArr()
  {
   return []
  }
  /* this fuction used to post order to biz panel */
  postOrder(paymentMode)
  {
  var products = [];

 
  var row = this.state.cartItems.map(function(item, i) {
    
	  var modifierdata = [];
     if(item.cart_item_type  === "Modifier"){
 	 //console.log(item);
	   var modifierLen = item.modifiers.length;
	
	     if(modifierLen > 0){
		     for(var l=0; l < modifierLen; l++ )
			 {
			   var modifierVal= [];
			    modifierVal.push( {
			    modifier_value_id:item.modifiers[l].modifiers_values[0].cart_modifier_id ,
			    modifier_value_qty:item.modifiers[l].modifiers_values[0].cart_modifier_qty,
			    modifier_value_name:item.modifiers[l].modifiers_values[0].cart_modifier_name,
			    modifier_value_price:item.modifiers[l].modifiers_values[0].cart_modifier_price});
			    modifierdata.push( {
							modifier_id:item.modifiers[l].cart_modifier_id,
							modifier_name:item.modifiers[l].cart_modifier_name,
							modifiers_values:modifierVal})
			 }
			 
			
		 }
	
	 
	 }else {
	// console.log(i+" Out"+item.cart_item_product_name);
	    modifierdata = [];
	 }
 
		    products.push( {         product_name: item.cart_item_product_name,
									 product_unit_price: item.cart_item_unit_price,
									 product_total_amount : item.cart_item_total_price,
									 product_sku: item.cart_item_product_sku,
									 product_image: item.cart_item_product_image,
									 product_id: item.cart_item_product_id,
									 product_qty :item.cart_item_qty,
									 condiments : '',
									 modifiers : modifierdata,
									 bakers_modifiers : '',
									 menu_set_components :'',
									 baby_pack : ''
									 })
							 
			         return products;
							 
    }.bind(this));
 
  //console.log(products);
 //return false;
 

			console.log(products);
   /* get cart details */
  
   var postObject = {};
      postObject = { 
	  
	  /* cart details */
	  'app_id' : APPID,
	  'availability_id' : cookie.load('defaultAvilablityId'),
	  'sub_total':this.state.cartDetails.cart_sub_total,
	  "grand_total" :  this.state.cartDetails.cart_grand_total,
	  "outlet_id" : cookie.load('orderOutletId'),
	  "table_number" :cookie.load('orderTableNo'),
	  "order_status" : 1,
	  "order_source" : 'Mobile',
	  "order_remarks" : cookie.load('product_remarks'),
	  "products" : JSON.stringify(products),
	  
	  /* customer  Details */
	  "customer_id" : cookie.load('UserId'),
	  "customer_fname" : cookie.load('UserFname'),
	  "customer_lname" : cookie.load('UserLname'),
	  "customer_mobile_no" : cookie.load('UserMobile'),
	  "customer_email" : cookie.load('UserEmail'),
	  "customer_address_line1" : '',
	  "customer_postal_code" : '',
	  
	  /* Payment */
	  "payment_mode" : paymentMode,
	  "payment_reference" :  config.stripe.stripeReference,
	  "order_payment_getway_type" :'',
	  "order_payment_getway_status" : '',
	 	
	  /* additional paras */
	   "order_delivery_charge" : '',
	   "order_tat_time" : '',
	   "order_tax_charge" : '',
	   "order_tax_calculate_amount" : '',
	   
	   /* discount */
	   "order_discount_applied" : '',
	   "order_discount_amount" : '',
	   "order_discount_type" : ''
	   
	  } 
	
	 this.setState({status:"Loading"});
    	  axios.post(APIURLPRO+"orders/submit_order", qs.stringify(postObject) ).then(res => {
	       console.log(res);
	           if(res.data.status === "ok"){
			    this.setState({status:"ok"});
			   	 this.destroyCart();
			     this.deleteOrderCookie();
				hashHistory.push("/order-success/"+res.data.common.local_order_no);
			     }
			  else if(res.data.status === "error") {
			   this.setState({status:"error"});
			   alert(res.data.status);
			 }
      });
  }
 
/* this function used to  delete all cookie values */ 
deleteOrderCookie()
{
  cookie.save('cartValue','No');
  cookie.remove('orderPaymentMode');
  cookie.remove('orderOutletId');
  cookie.remove('orderTableNo');
  cookie.remove('product_remarks');
  cookie.remove('orderOutletName');
  cookie.remove('orderOutletId');
  
    
  /* Delivery avilablity */
  cookie.remove('DeliveryDate');
  cookie.remove('DeliveryTime');
  cookie.remove('unitNoOne');
  cookie.remove('unitNoTwo');
  
}
  
  /* this function used to delte all  cart items */
destroyCart(){ 
    var params = new URLSearchParams();
    params.append('app_id', config.ids.appId);
	params.append('customer_id',cookie.load('UserId'));
    axios.post(APIURL+"cart/destroy", params)
}

	
/* this  function used get cart content details */	 
getCartDetails()
{
	/* API CALL FOR BANNERS */
	  //customerParam = "&customer_id="+cookie.load('UserId');
		axios.get(APIURL+'cart/contents?status=A&app_id='+APPID+"&customer_id="+cookie.load('UserId') )
		 .then(res => {
		  if(res.data.status === "ok"){
			    this.setState({status: 'ok'});
                this.setState({cartDetails: res.data.result_set.cart_details});
                 this.setState({cartItems: res.data.result_set.cart_items});
		  } else{
			hashHistory.push("/");
		  }
	  	});
}
/* this function used to validate customer information */	 
 validateCustomer()
 {
  
 }

/* this function used to validate customer information */ 
validateCart()
{

}

/* this function used to validate order details */
validateOrderDetails()
{

}

/*apply rewards function*/	
applyRewards()
{
 alert('Invalid Rewards');
}

/*apply coupon  function*/	
applyCoupon()
{
 alert('Invalid Promocode');
}
	
 	
/* this function used to load product items */	 
loadProductsDetails()
{


 return (
 <table>
	<tbody>
		 {this.loadProductItems()}
		 <tr className="sub-total-tr">
			<td className="sub-total">Sub Total</td>
			<td className="sub-total text-right">{config.ids.currency+this.state.cartDetails.cart_sub_total}</td>
		</tr>
		 
		  {this.loadDeliveryContent(this.state.cartDetails.cart_availability_id)}
		
		<tr>
			<td className="total">Total</td>
			<td className="total text-right">{config.ids.currency+this.state.cartDetails.cart_grand_total}</td>
		</tr>
	</tbody>
</table>
		 
  );
}

/* this function used to load delivery content */
loadDeliveryContent(availblity){
 if(availblity === config.ids.deliveryId  ) {
 return ( 
		   <tr className="sub-total-tr">
			<td className="sub-total">Delivery</td>
			<td className="sub-total text-right">{config.ids.currency+parseFloat(this.state.cartDetails.cart_delivery_charge).toFixed(2)}</td>
		</tr>);
		 
}
}




/*load product details */
loadProductItems()
{
  return this.state.cartItems.map((item, index)=> 
   <tr key={index}>
       <td className="main-item">{item.cart_item_qty} X {item.cart_item_product_name}</td>
       <td className="text-right">{item.cart_item_total_price}</td>
   </tr> 
  )  
 
}
 

/* this function used to load modifer items */
loadModifierItems()
{
    return ( 	<tr>
                    <td className="sub-item">Sub Item</td>
                    <td></td>
                 </tr>
             
		 );
}



/* this function used to  validate payment method.. */
payNow(){
if (document.getElementById('cash').checked) {
  //console.log('cash');
  this.postOrder(1)
}
else if (document.getElementById('stripe').checked) {
  cookie.save('orderPaymentMode','STRIPE');
  //indow.location="/pay-now";
hashHistory.push("/pay-now");
} else {
alert(lang.choose_payment_mode);
}

}

/* Show checkout page */
showCheckoutBtn(type)
{

   if(type === "CASH"){
   //console.log(type);
      document.getElementById("cash_btn").style.display = "block";
	  document.getElementById("stripe_btn").style.display = "none";
    }
   else if(type === "STRIPE")
     {
	 //console.log(type);
     document.getElementById("cash_btn").style.display = "none";
	 document.getElementById("stripe_btn").style.display = "block";
    }
}

/* this function used back nav link for all avilablities */
backLink()
{
  /* Validate delivery order details */
  if(this.state.cartDetails.cart_availability_id === config.ids.deliveryId)
  {
    return "delivery-date";
  }else{
    return "book-a-table";
  }
	
}

/* this function nused to load */


showOrderDetails()
{
 var labelThree = ''; var labelThreeVal = '';
 if(this.state.cartDetails.cart_availability_id === config.ids.deliveryId){
   var labelOne = "Delivery Date";
   var labelOneVal = cookie.load('DeliveryDate');
   var labelTwo = "Delivery Time";
   var labelTwoVal = cookie.load('DeliveryTime');
   
        return(   <div className="col-xs-12">
                            <div className="col-sm-6  date-info">
                                <p className="">{labelOne}:<span className="span-txt1"> {labelOneVal}</span></p>
                              
                                 {labelThree}
                            </div>
                            <div className="col-sm-6 hidden-xs date-info">
                                <p className="text-right"><span>{labelTwo}: </span><span className="span-txt1">{labelTwoVal}</span></p>
                              
                            </div>
                            
                        </div>);
						
 }else if(this.state.cartDetails.cart_availability_id === config.ids.dineinId) {
    
     return(   <div className="col-xs-12">
                            <div className="col-sm-6  date-info">
                                <p className="">Dine in Date: <span className="span-txt1"> {currentDate}</span></p>
                              
                                <p className="">Table : <span className="span-txt1">{cookie.load('orderTableNo')}</span></p>
                            </div>
                            <div className="col-sm-6 hidden-xs date-info">
                                <p className="text-right"><span>Current Time : </span><span className="span-txt1">{currentTime}</span></p>
                              <p className="text-right">&nbsp;<span className="span-txt1">&nbsp;</span></p>
                            </div>
                            
                        </div>);
 }

 
}

	 
render() { 
    
  
  if(this.state.status === "Loading"){
    return ( <Loading/>); 
  }else { 
   return ( <div>  
	 <DocumentMeta  {...meta} />
        <div className="container-fluid desktop-container">
            <div className="row">
                <div className="col-xs-12 top-nav inner-top-nav">
                    <div className="col-xs-3 nav-head pd-l-20"> <Link to={this.backLink(this)}><img src="/img/icons/arrow-right.png" className="icon-img-small-3" alt="left-arrow"/></Link>
                    </div>

                    <div className="col-xs-6 nav-head ">
                        <h1 className="main-title">CHECKOUT</h1>
                    </div>
                    <div className="col-xs-3 nopadding">

                      {/*  <p className="b-txt text-right ">

                            <img src="/img/icons/shopping-cart.png" className="icon-img-small-1-inner" alt="shopping-cart"/>
                        </p>  */}

                    </div>


                </div>
            </div>

			
			
			
			
            <div className="row bg-white">

                <div className="col-xs-12 ">
                    <div className="col-xs-12  main-outer margin-top-40">
                       <h3 className="inner-title-1">your order details</h3>
                       {this.showOrderDetails()}
					 
                        <div className="col-xs-12 padd1 price-list">
                            
								{/*this.loadProductsDetails()*/}
							{this.loadProductsDetails()}	
								
                                   {/* <tr>
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
                                        <td className="main-item">1 X Product Name</td>
                                        <td className="text-right">25.50</td>
                                    </tr>
                                    <tr className="sub-total-tr">
                                        <td className="sub-total">Sub Total</td>
                                        <td className="sub-total text-right">$76.50</td>
                                    </tr>
                                    <tr>
                                        <td className="total">Total</td>
                                        <td className="total text-right">$76.50</td>
                                    </tr> */}
                             
                        </div>
                    </div>
                    <div className="col-sm-12 no-padding main-outer">
                        <h3 className="inner-title-1">Rewards</h3>

                        <div className="col-sm-6 padd1 ">
                            <p className="text-center font-bold">Redeem Rewards Points</p>
                            <input type="text" className="txt-field" placeholder="You Can Redeem 0 Points"/>
                            <p className="text-center">
                                <button className="btn bg-black" onClick={this.applyRewards.bind()}>Apply</button>
                            </p>

                        </div>
                        <div className="col-sm-6 padd1 ">
                            <p className="text-center font-bold">Promotion</p>
                            <input type="text" className="txt-field" placeholder="Add Your Promo Code Here"/>
                            <p className="text-center">
                                <button className="btn bg-black"  onClick={this.applyCoupon.bind()}>Apply</button>
                            </p>

                        </div>

                    </div>
                    <div className="col-xs-12 no-padding main-outer">
                        <h3 className="inner-title-2">PAYMENT</h3>

                        <div className="col-xs-12 padd1 ">
                            <p className="text-center">Please select your payment method</p>
                            <div className="space-10"></div>
                            <div className="cards center-block">
                                <div className="radio radio-primary">
                                    <label>
                                        <input type="radio" name="payment" id="cash" value="CASH" onChange={this.showCheckoutBtn.bind(this,'CASH')} />
                                        <span className="circle"></span>
                                        <span className="check"></span>
                                        <img src="/img/cash-on-delivery.png" className="img-responsive img-width-120" alt="cash-on-delivery"/>

                                    </label>
                                </div>
                              {/*  <div className="radio radio-primary">
                                    <label>
                                        <input type="radio" name="optionsRadios" id="optionsRadios1" value="option1"/>
                                        <span className="circle"></span>
                                        <span className="check"></span>
                                        <img src="/img/paypal-logo.png" className="img-responsive img-width-120" alt="paypal"/>
                                    </label>
                                </div> */}
                                <div className="radio radio-primary">

                                    <label>
                                        <input type="radio" name="payment" id="stripe" value="STRIPE" onChange={this.showCheckoutBtn.bind(this,'STRIPE')}  />
                                        <span className="circle"></span>
                                        <span className="check"></span>
                                        <img src="/img/visa-logo.png" className="img-responsive img-width-120" alt="visa-card"/>

                                    </label>
                                </div>
                            </div>
                            <div className="space-10"></div>

                        </div>


                    </div>
                </div>
            </div>
            <div className="space-50"></div>
            <div className="row">
                  <div style={{display:'none'}} id="stripe_btn">  <StripeCheckout
					 name={config.stripe.stripeCompany}
					 image={config.stripe.stripeImage}
					 description={config.stripe.stripeDesc}
                     token={this.onToken}
                     stripeKey={config.stripe.stripeKey}
                     amount={100 * this.state.cartDetails.cart_grand_total}
					 email={config.stripe.stripeEmail}
                     currency={config.stripe.stripeCurrency}  > <button className="col-lg-12 continue-but desktop-container container-fluid">
    CONTINUE
  </button>  
                    </StripeCheckout>  </div>
					  <div style={{display:'block'}} id="cash_btn"> 
                 <button className="col-lg-12 continue-but desktop-container container-fluid"  onClick={this.payNow.bind(this)} >CONTINUE</button>    </div> 
                    
</div>
        </div>
	 </div> );
 }
   } 
   
}
export default Chekout;
