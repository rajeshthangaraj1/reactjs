/* eslint-disable */ 
import React from 'react';
import axios from 'axios';
const config = require('./config');
import getResult from './Api';
const lang = require('./lang');
const APIURL = config.path.apiUrl;
const APPID = config.ids.appId;
const currency = config.ids.currency;
import DocumentMeta from 'react-document-meta';
import {  Link ,hashHistory } from 'react-router'
import cookie from 'react-cookie';
import './App.css';
const Loading = require('./loading');
var qs = require('qs');

 /* Load meta tags */
  const meta = {
      title: lang.cart_page_title + lang.site_title_with_separator,
      description: lang.cart_page_title,
      meta: {
        name: {
          keywords: lang.cart_page_title
        }
      }
    };
	
class Cart extends React.Component {
  constructor(props) {
       super(props);
       /* Declare state */
	   this.state = { cartDetails:[],cartItems:[],status:'Loading',cartCount:'No',settings:[],delPercentage:0,remaingAmnt:0};
	   
	   /* get settings values */
	     var promise = getResult('settings','');
         promise.then(res => { this.setState({'settings' : res.data.result_set }) });
   }

  componentWillMount  () {  
	 
	/* API CALL FOR BANNERS */
	   if(typeof cookie.load('UserId') === 'undefined'){
              var  customerParam = "&reference_id="+getResult('referenceId');
         }else{
               customerParam = "&customer_id="+cookie.load('UserId');
          }
		axios.get(APIURL+'cart/contents?status=A&app_id='+APPID+customerParam)
		 .then(res => {
		  if(res.data.status === "ok"){
		      this.setState({status: 'ok'});
			   if(typeof res.data.result_set !=="undefined")
			   {
			     this.setStateSuccess('ok',res.data.result_set.cart_details,res.data.result_set.cart_items);
			     this.cartCountSts('Yes');
			   }
			   
		  } else{
		   this.cartCountSts('No');
		    this.setState({status: 'error' });
		  }
	  	});  
	 }
/* this function used to delte all  cart items */
destroyCart(){ 
   var postObject = {};
   postObject = { 'app_id' : config.ids.appId } ;
   
    if(typeof cookie.load('UserId') === 'undefined'){ 
	     postObject['reference_id'] = getResult('referenceId');
   }else{
	      postObject['customer_id'] = cookie.load('UserId');
   }
   
 axios.post(APIURL+"cart/destroy",qs.stringify(postObject)).then(res => {
  
		  if(res.data.status === "ok")
		    {
			   this.cartCountSts('No');
			   this.setStateSuccess('error','[]','[]');
			}
		  else if(res.data.status === "error"){
				    alert(res.data.message);
		   }
      });
}

/* this function used to delte single cart items */
deleteCartItem(cartItemId){

    var postObject = {};
	 postObject = { 'app_id' : config.ids.appId, 'cart_item_id':cartItemId } ;
	 
   if(typeof cookie.load('UserId') === 'undefined'){ 
	     postObject['reference_id'] = getResult('referenceId');
   }else{
	      postObject['customer_id'] = cookie.load('UserId');
   }
 axios.post(APIURL+"cart/delete",qs.stringify(postObject)).then(res => {
		  if(res.data.status === "ok")
		    {
			   if(res.data.contents) {
			      this.cartCountSts('Yes');
			    this.setStateSuccess('ok',res.data.contents.cart_details,res.data.contents.cart_items);
			   }else {
			      this.cartCountSts('No');
			      this.setStateSuccess('error','[]','[]');
			   }
			}
		  else if(res.data.status === "error"){
	    	    alert(res.data.message);
		   }
      });
}

/* this function used increase cart item qty */
incQty(cartItemId,qty,productId,type){
//console.log(type);
 if(type === "add")
 {
    var cartQty = Number(qty) + 1;
 }else
 {
  if(Number(qty) === 1){
   return false;
  }
  else {
   cartQty =  Number(qty) - 1;
  }
 }
 
  var postObject = {};
   postObject = { 'app_id' : config.ids.appId,'cart_item_id' : cartItemId, 'product_id' : productId, product_qty : cartQty } ;
   
   if(typeof cookie.load('UserId') === 'undefined'){ 
	     postObject['reference_id'] = getResult('referenceId');
   }else{
	      postObject['customer_id'] = cookie.load('UserId');
   }
   
 axios.post(APIURL+"cart/update",qs.stringify(postObject)).then(res => {
		  if(res.data.status === "ok")
		    {
			  this.cartCountSts('Yes');
		      this.setStateSuccess('ok',res.data.contents.cart_details,res.data.contents.cart_items);
			}
		  else if(res.data.status === "error"){
				    alert(res.data.message);
		   }
      });
	  
}


/* store special instruction  cokie value */
 handleChange(event) {
 cookie.save('product_remarks',event.target.value);
  }
 
 /* this function used to set default succes  state value */
 setStateSuccess(sts,cartDetails,cartItms){
    this.setState({status: sts});
    this.setState({cartDetails: cartDetails});
    this.setState({cartItems: cartItms});
	
	/* store orginal data for refference */
	//this.setState({cartDetailsSource: cartDetails});
    //this.setState({cartItemsSource: cartItms})
	
	 if(sts === "ok"){
	     /* calculate free delivery amount calculation */
	     var freeDeliveryAmnt = this.state.settings.client_free_delivery_amount;
		  var DeliveryAmnt = this.state.settings.client_delivery_surcharge;
	     if(cartDetails.cart_availability_id === config.ids.deliveryId && cartDetails.cart_delivery_charge > 0 && freeDeliveryAmnt > 0)
           {
		    
		      var subTotal = cartDetails.cart_sub_total;
			   var subTotal = cartDetails.cart_sub_total;
		       var percentage = (subTotal * 100 ) / freeDeliveryAmnt;
               percentage = Math.round(percentage);
               var remaingAmnt = parseFloat((freeDeliveryAmnt - subTotal)).toFixed(2);
			   if(remaingAmnt > 0) {
			   console.log('not allow freee' + remaingAmnt);
			      this.setState({remaingAmnt: remaingAmnt});
			      this.setState({delPercentage: percentage});
				 // this.changeDeliveryAmount(DeliveryAmnt,subTotal);
			   }else{
			      this.setState({remaingAmnt: 0});
				  this.setState({delPercentage: 0});
				   this.changeDeliveryAmount(0,subTotal);
				 // console.log(' allow freee delivery' + remaingAmnt);
				  
			   }
		   }
	 }
 }
	 
/* this function used to  set cart items count */	 
cartCountSts(cartsts)
{
  console.log(cartsts);
   cookie.save('cartValue',cartsts);
}
	 
/* this function used to load cart items */
loadCartItems(){
  return   this.state.cartItems.map((item, index)=> <div className="row product-holder1" key={index}>
	           {this.loadiItemsCount(index)}
                 
                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-6">
                    <img src={item.cart_item_product_image} alt="pizza -thumbnail" width="100%"/>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-6">
                    <h1 className="head22">{item.cart_item_product_name}</h1>

                </div>
                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-3 nopadding">
                    <div className="counter-bg">
                        <div className="subh count-div" > 
                            <Link  className="btn btn-my btn-left btn-group-mini" onClick={this.incQty.bind(this,item.cart_item_id,item.cart_item_qty,item.cart_item_product_id,'remove')}>
                                <i className="material-icons">remove</i></Link>&nbsp;<span className="head22">{item.cart_item_qty}</span> {" "}
                            <Link className="btn btn-my btn-right btn-group-sm"  onClick={this.incQty.bind(this,item.cart_item_id,item.cart_item_qty,item.cart_item_product_id,'add')}> 
                                <i className="material-icons">add</i></Link>
                        </div>
                    </div>
                </div>
                <div className="col-lg-1 col-md-1 col-sm-1 col-xs-2 unit-price">
                    <h1 className="head222 pull-right">{item.cart_item_total_price} </h1>
                </div>
                <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 del-icon">
                    <h1 className="head22 color-light-gray"><Link style={{cursor:'pointer', textDecoration: 'none'}} onClick={this.deleteCartItem.bind(this,item.cart_item_id)}><i className="fa fa-trash" aria-hidden="true"></i></Link></h1>
                </div>
            </div> );
}

/* this function used to load cart itmes count */
loadiItemsCount(key){
if(key === 0 ) {
 return (  <p className="cart-text">You have {this.state.cartDetails.cart_total_items} item(s) in your cart  <span className="pull-right"><Link style={{cursor:'pointer', textDecoration: 'none'}} onClick={this.destroyCart.bind(this)}>Clear Cart</Link></span> </p>);
}
}



/* this function used to load delivery content */
loadDeliveryContent(availblity){
 if(availblity === config.ids.deliveryId  ) {
 return ( <tr>
              <td className="sub-price text-left">Delivery</td>
              <td className="sub-num text-right ">{parseFloat(this.state.cartDetails.cart_delivery_charge).toFixed(2)}</td>
           </tr>);
		   
		   }
}

/* this  function used to load delivery percentage */
loadDeliveryPercentage(availblity)
{
 var freeDeliveryAmnt = this.state.settings.client_free_delivery_amount;
 var remainAmnt = this.state.remaingAmnt;
 if(availblity === config.ids.deliveryId && this.state.cartDetails.cart_delivery_charge > 0  && freeDeliveryAmnt > 0 &&  remainAmnt > 0)
 {
      return ( 
             <div> 
			   <div className="progress">
			     <div className={"progress-bar progress-bar-danger width-"+this.state.delPercentage}></div>
			   </div>
				<p className="text-center"><b>{currency+this.state.remaingAmnt} more to FREE delivery!</b></p>    
			  </div>
		   );
 }
 
}

/* this function used to change delivery amount */
changeDeliveryAmount(amnt,grandTotal)
{
  		 this.setState({cartDetails: Object.assign({}, this.state.cartDetails, {cart_delivery_charge: amnt,cart_grand_total:grandTotal})});
		//  this.setState({cartDetails: Object.assign({}, this.state.cartDetails, {cart_delivery_charge: amnt})});
}

/* this metod used to validate cart delvery amount and next redirect URL */
validateCart()
{
   if(this.state.cartDetails.cart_availability_id === config.ids.deliveryId)
    {
	  var subtotal = this.state.cartDetails.cart_sub_total; 
	  var minCart = this.state.settings.client_free_delivery_amount;
	  console.log(this.state.cartDetails.cart_sub_total+"->"+this.state.settings.client_free_delivery_amount );
	  if(subtotal <= minCart )
	  {
	     alert("You must have an order with a minimum of "+currency+minCart+" to place your order, your current order total is "+currency+subtotal+".");
		return false;
	  }
	 hashHistory.push("/add-on");
	}else{
	 hashHistory.push("/add-on");
	}
   
}


  render() {
  
  if(this.state.status === "Loading"){
    return ( <Loading/>); 
  }
  else if(this.state.cartDetails.cart_total_items >  0 )
    return (
	<div> 
	<DocumentMeta  {...meta} />
        <div className="container-fluid desktop-container">

            <div className="row">
                <div className="col-xs-12 top-nav inner-top-nav">
                    <div className="col-xs-3 nav-head pd-l-20"><Link to={"/"}><img src="/img/icons/arrow-right.png" className="icon-img-small-3" alt="left-arrow"/></Link> 
                    </div>

                    <div className="col-xs-6 nav-head ">
                        <h1 className="main-title">CART</h1>
                    </div>
                    <div className="col-xs-3 nopadding">

                        <p className="b-txt text-right ">

                            <img src="/img/icons/shopping-cart-black.png" className="icon-img-small-1-inner" alt="shopping-cart"/>
                        </p> 

                    </div>


                </div>
            </div>

           
 {this.loadCartItems()}
            

            <div className="row">
                <div className="col-lg-7 col-md-7 col-sm-7">
                </div>

                <div className="col-sm-5">
                   <table className="sub-price-table" style={{border:0}}>
                        <tbody>
                            <tr>
                                <td className="sub-price text-left">Sub Total</td>
                                <td className="sub-num text-right ">{this.state.cartDetails.cart_sub_total}</td>
                            </tr>
							{this.loadDeliveryContent(this.state.cartDetails.cart_availability_id)}
                            
                            <tr>
                                <td colSpan="2"><hr></hr></td>
                            </tr>
                            <tr>
                                <td className="total">Total</td>
                                <td className=" text-right total-num">{this.state.cartDetails.cart_grand_total}</td>
                            </tr>
                        </tbody>
                    </table>


                     {this.loadDeliveryPercentage(this.state.cartDetails.cart_availability_id)}
                </div>

                <div className="clearfix"></div>
                <div className="space-5"></div>

                <div className="col-xs-12">

                    <div className="form-group label-floating is-empty card-no">
                        <div className="input-group">
                            <label className="control-label" htmlFor="remarks">Special Instructions</label>
                            <textarea type="text" id="remarks"   className="form-control" cols="5" onChange={this.handleChange} >{cookie.load.product_reamrks}</textarea>
                        </div>
                    </div>
                </div>

            </div>
			
			
            <div className="v-space-50"></div>
            <div className="space-40"></div>

            <div className="row">
                <Link onClick={this.validateCart.bind(this)}>
                <button className="col-lg-12 continue-but desktop-container main-title container-fluid">CHECKOUT</button>
            </Link>            </div>

        </div>
		
	</div>
    );
	else { 
	  return ( <div className="container-fluid desktop-container">

						<div className="row">
							<div className="col-xs-12 top-nav inner-top-nav">
								<div className="col-xs-3 nav-head pd-l-20"><Link to={"/"}><img src="/img/icons/arrow-right.png" className="icon-img-small-3" alt="left-arrow"/></Link> 
								</div>

								<div className="col-xs-6 nav-head ">
									<h1 className="main-title">CART</h1>
								</div>
								<div className="col-xs-3 nopadding">

									<p className="b-txt text-right ">

										<img src="/img/icons/shopping-cart.png" className="icon-img-small-1-inner" alt="shopping-cart"/>
									</p> 

								</div>


							</div>
						</div>  
						
					 

			
			 <div className="row product-holder1">
			
                <p className="cart-text">{lang.no_cart_items}  </p>
                
            </div>
			
				</div>);
	}
  }
}
export default Cart;
