/* eslint-disable */ 
import React from 'react';
import axios from 'axios';
import { Link, hashHistory } from 'react-router'
import getResult from './Api';
var strp = require('strp');
const config = require('./config');
const lang = require('./lang');
const APIURL = config.path.apiUrl;
const APIURLPRO = config.path.apiUrlPro;
const APPID = config.ids.appId;
import cookie from 'react-cookie';
import DocumentMeta from 'react-document-meta';
var qs = require('qs');

 /* Load meta tags */
  const meta = {
      title: lang.home_meta_title,
      description: lang.home_meta_title,
      meta: {
        name: {
          keywords: lang.home_meta_title
        }
      }
    };

//var Loading = require('react-loading');
class Productsdetails extends React.Component {
	 constructor(props) {
	   super(props);
	  this.state = { details: [],orderHandled:'', details_common: [],cartCount:1,status:'Loading',allowCart:'Yes',productPrice:'',itemType:'Simple',ModifierCount:''}; 
	  
	   /* set default cookie values */
	    cookie.save('modiferCount',0); 
	    cookie.save('itemType','Simple');
	   
	 }
	 
	 componentWillMount() {
		/* API CALL FOR BANNERS */
			 const productSlug = this.props.params.productSlug;
		axios.get(APIURL+'products/products_list?status=A&app_id='+APPID+"&availability="+cookie.load('defaultAvilablityId')+"&product_slug="+productSlug)
		 .then(res => {
		  this.setState({status: res.data.status});
		  if(res.data.status === "ok"){
		   this.setState({status: res.data.status});
		   this.setState({details_common: res.data.common});
		   this.setState({productPrice:  res.data.result_set[0].product_price});
		   this.setState({details: res.data.result_set[0]});
		  // this.setState({productPrice: res.data.result_set[0]});
		  } 
	  	});  
		
		
		axios.get(APIURL+'outlets/pickup_outlets?app_id='+APPID)
		.then(res => {
		 // console.log('banner result loading done');
		    if(res.data.status === "ok"){
			  this.setState({Status: res.data.status});
	          this.setState({Outlets: res.data.result_set});
			 
		  }else {
		    this.setState({Status: res.data.status});
		  }
      });
	  
	  
	  
	 }
	 
/* show product thump image */	 
__productImage(product_thumbnail){
   return  (product_thumbnail ==="" )? config.noImages.product_listing: this.state.details_common.image_source+"/"+product_thumbnail;
}

/* show modifiers values */
showModifiers(modVal){
 if( modVal ){
var modLen = modVal.length;
   return   modVal.map((item, index)=>  <div className="panel panel-default" key={index}>
                                <div className="panel-heading" role="tab" id="headingTwo">
                                    <h4 className="panel-title">
                                        <Link className="collapsed" data-toggle="collapse" data-parent="#accordion" to={"#collapse" + index} aria-expanded="true" aria-controls="collapseTwo">{strp.stripslashes(item.pro_modifier_name)}
                                        </Link>
                                    </h4>
                                </div>
                                <div id={"collapse"+index} className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
                                    <div className="panel-body">
                                          {this.showModifierItems(item.modifiers_values,index,modLen,item.pro_modifier_name,item.pro_modifier_id)}
                                    </div>
                                </div>
                            </div>)
  } 
}


/* load outlets */
__loadOutlets(){
  
  
	if(this.state.Outlets){ 
			return this.state.Outlets.map((loaddata, index)=>
			<div className="map-li" key={index} onClick={this.pickOutlet.bind(this,loaddata.outlet_id,loaddata.outlet_name,loaddata.outlet_postal_code, loaddata.outlet_address_line1, loaddata.outlet_address_line2, loaddata.outlet_unit_number1, loaddata.outlet_unit_number2,loaddata.outlet_pickup_tat)} >
                <p className="map-h">{loaddata.outlet_name}</p>
                <p className="map-sub">{loaddata.outlet_address_line1 +", "+ loaddata.outlet_address_line2 + " "+ loaddata.outlet_postal_code}</p>
            </div>);
		} 
	}
	

/* this fucntion used to show modifer items */
showModifierItems(modVal,mIndex,length,modName,modId){
//console.log(modVal);
 var totalLen = modVal.length;
 var modItemLen = totalLen - 1; 
  if(totalLen === 0 ){
        alert('Modifier items missing');
    	hashHistory.push("/");
  }
 
  /*  Modifer count */
     cookie.save('modiferCount',length  ); 
     cookie.save('itemType','Modifier' );
   
   return   modVal.map((item, index)=>
			  <div className={this.showArrow(modItemLen,index)} key={index}>
					<h1 className="bb-txt2 margin-15" >{strp.stripslashes(item.pro_modifier_value_name)+this.modifierPrice(item.pro_modifier_value_price)} 
						<div className="checkbox pull-right">
							<label><input type="radio" value={modName +"~"+ modId +"~"+ item.pro_modifier_value_name +"~"+ item.pro_modifier_value_id +"~"+ item.pro_modifier_value_price} id={"modVal_"+ mIndex }   name={"modVal_"+ mIndex } defaultChecked={this.isDefault(item.pro_modifier_value_is_default,modName,modId,item.pro_modifier_value_name,item.pro_modifier_value_id,item.pro_modifier_value_price)} onChange={this.validateModifier.bind(this,length,modName,modId,item.pro_modifier_value_name,item.pro_modifier_value_id,item.pro_modifier_value_price)} /></label>
						</div>
					</h1>
				</div>
			 
										
			 );
										
	}

/* show  modifier extra amount */
modifierPrice(price)
{
 return (price > 0)? " (+"+price+")": "";
}

/* this function used to validate modifer values */	
validateModifier(ModifierLen,modName,modId,modValName,modValId,modValPrice)
{
 
var allModVal = "";
var commaVal = ModifierLen - 1;
var sts ="Fail";
 //console.log(modName + "_"+modId+" - "+modValName+"-"+modValId+"-"+modValPrice);
for (var i = 0, length = ModifierLen; i < length; i++) {
 var  inputName = "modVal_"+i;
 var modVal = document.querySelector('input[name = '+inputName+']:checked').value ;
  var res = modVal.split("~"); 
 if(modVal === "")
 {
   sts ="Fail";
   document.getElementById("addToCart").disabled = true;
   alert(lang.select_all_modofier);
   break;
 }else{
    sts ="Success";
    document.getElementById("addToCart").disabled = false;;
	var strt = (i === commaVal) ? res[3]  : res[3] + ";" ;
    allModVal +=strt;
	  /* post data */
 }
}
   if(sts === "Success")
  {
    axios.get(APIURLPRO+'products/validate_product?app_id='+APPID+"&product_id="+this.state.details.product_id+"&modifier_value_id="+allModVal)
		.then(res => {

		          /* Success response */
		         if(res.data.status === "ok")
				 {
				  this.setState({sts:'No'});
				  this.setState({allowCart:'Yes'});
			      this.setState({productPrice:  res.data.result_set[0].product_price});

				 }
				 /* Error response */
				   if(res.data.status === "error")
				 {
				     alert(res.data.message);
					 this.setState({allowCart:'No'});
					 document.getElementById("addToCart").disabled = true;
				 }
				 
		   });
  }
} 
	
/* this function used to checked radio value */	
isDefault(select)
{
   return (select === "Yes"? true : false);
}
	
/* this function used to show show  arrow*/
showArrow(len,index)
{
 return (len === index? "" : "acrow");
}
	
/* increase cart qty */
iQty(){
   this.setState({cartCount: this.state.cartCount + 1 });
}

/* decrease cart qty */
dQty(){
if(this.state.cartCount !== 1 ){
 this.setState({cartCount: this.state.cartCount - 1 });
} 
}

/* pick outlet */
pickOutlet(outlet_id,outlet_name,outlet_postal_code, outlet_address_line1,outlet_address_line2,outlet_unit_number1,outlet_unit_number2,outlet_pickup_tat){
	
	var orderHandled = outlet_name+" "+outlet_address_line1+" "+outlet_address_line2+", Singapore "+outlet_postal_code;
	console.log(outlet_id+outlet_postal_code)
	this.setState({orderHandled:orderHandled});
	cookie.save('orderOutletId',outlet_id);
	cookie.save('orderOutletName',outlet_name);
	cookie.save('orderPostalCode',outlet_postal_code);
	cookie.save('orderTAT',outlet_pickup_tat);
	cookie.save('orderHandled',orderHandled);
	$("#Pickup-OutletSelection").modal("toggle");
	$("#Pickup-Sucess").modal("toggle");
					
	
}

/* continue with pickup success */
pickupSuccess(){
	var productId = this.state.productId;
	var proName = this.state.proName;
	var prosku = this.state.prosku;
	var proPrice = this.state.proPrice;
	var proQty = this.state.proQty;
	var proImage = this.state.proImage;
	var allowCart = this.state.allowCart;
	$("#Pickup-Sucess").modal("toggle");
	this.addToCart(productId,proName,prosku,proPrice,proQty,proImage,allowCart);
}

/* continue with delivery success */
deliverySuccess(){
	var productId = this.state.productId;
	var proName = this.state.proName;
	var prosku = this.state.prosku;
	var proPrice = this.state.proPrice;
	var proQty = this.state.proQty;
	var proImage = this.state.proImage;
	var allowCart = this.state.allowCart;
	$("#DeliverySucess").modal("toggle");
	this.addToCart(productId,proName,prosku,proPrice,proQty,proImage,allowCart);
}


/* Select outlet */

selectOutlet(){

var postalcode = $("#postalcode").val();
	/*add loading */
   axios.get(APIURL+'outlets/find_outlet?app_id='+APPID+"&availability_id="+cookie.load('defaultAvilablityId')+"&postal_code="+postalcode)
		.then(res => {

		          /* Success response */
		         if(res.data.status === "ok")
				 {
					 var orderDeliveryAddress = res.data.result_set.postal_code_information.zip_buno +" "+ res.data.result_set.postal_code_information.zip_sname+" Singapore "+res.data.result_set.postal_code_information.zip_code;
					 var orderHandled = res.data.result_set.outlet_name+", Crew will be seeing you in "+res.data.result_set.outlet_delivery_timing+" Minutes";
					this.setState({orderDeliveryAddress:orderDeliveryAddress});
					this.setState({orderHandled:orderHandled});
					cookie.save('orderOutletId',res.data.result_set.outlet_id);
					cookie.save('orderOutletName',res.data.result_set.outlet_name);
					cookie.save('orderPostalCode',res.data.result_set.outlet_postal_code);
					cookie.save('orderTAT',res.data.result_set.outlet_delivery_timing);
					cookie.save('orderDeliveryAddress',orderDeliveryAddress);
					cookie.save('orderHandled',orderHandled);
					 
					
					$("#DeliveryAddress").modal("toggle");
					$("#DeliverySucess").modal("toggle");
					
					 
				 }
				 /* Error response */
				   if(res.data.status === "error")
				 {
					 $("#DeliveryAddress").modal("toggle");
					 $("#DeliveryError").modal("toggle");
				     
					  
				 }
				 
		   });
	  
}

/* Open Zipcode popup */

changeDelivery(){
	$("#DeliveryError").modal("toggle");
	$("#DeliveryAddress").modal("toggle");
}
closeDeliveryErr(){
	$("#DeliveryError").modal("toggle");
}

/* add to cart */
addToCart(productId,proName,prosku,proPrice,proQty,proImage,allowCart) {
  
  
  this.setState({productId:productId});
  this.setState({proName:proName});
  this.setState({prosku:prosku});
  this.setState({proPrice:proPrice});
  this.setState({proQty:proQty});
  this.setState({proImage:proImage});
  this.setState({allowCart:allowCart});
  
  
  if(cookie.load('defaultAvilablityId')==='634E6FA8-8DAF-4046-A494-FFC1FCF8BD11' && cookie.load('defaultAvilablity')==='Delivery'){
		if(typeof cookie.load('orderOutletId')==="undefined" || typeof cookie.load('orderPostalCode')==="undefined"){
			$("#DeliveryAddress").modal("toggle");
			return false;
		}
  }else if(cookie.load('defaultAvilablityId')==='718B1A92-5EBB-4F25-B24D-3067606F67F0' && cookie.load('defaultAvilablity')==='Takeaway'){
	  if(typeof cookie.load('orderOutletId')==="undefined" || typeof cookie.load('orderPostalCode')==="undefined"){
	  $("#Pickup-OutletSelection").modal("toggle");
	  return false;
	  }
  }
  
  
   	   
			   
  /* check add to cart permission */
  if(allowCart === "No")
  {
    alert(lang.modifier_missing);
    return false;
  }
 
 /* Post Modifier part */
 
  var modifier= [];
   //console.log(cookie.load('itemType') +"<---->"+ cookie.load('modiferCount'));
   if(cookie.load('itemType') === 'Modifier' && cookie.load('modiferCount') > 0){
    console.log('is allow');
		 for (var i = 0, length = cookie.load('modiferCount') ; i < length; i++) {
		 console.log(i);
			 var  inputName = "modVal_"+i;
			 var modVal = document.querySelector('input[name = '+inputName+']:checked').value ;
			  if(modVal !== ""){ 
			  var res = modVal.split("~"); 
			   var modifierVal= [];
			   modifierVal.push( {modifier_value_id:res[3],modifier_value_qty:'1',modifier_value_name:res[2], modifier_value_price:res[4]}); 
               modifier.push( {modifier_id:res[1],modifier_name:res[0],modifiers_values:modifierVal})
			  }else{
			    alert(lang.modifier_missing)
				return false;
			  }
		    
           }
 //  console.log(modifier);
   // modifierVal.push( {modifier_value_id:'AEC989CD-64EF-4D0C-AD2F-BB63F2F6DA0E',modifier_value_qty:'1',modifier_value_name:'Small', //modifier_value_price:'0'}); 
    //modifier.push( {modifier_id:'3EB2DB76-87F1-4C74-B54D-65AB968101AD',modifier_name:'Size',modifiers_values:modifierVal});
   }else {
   // console.log(cookie.load('itemType'));
    //console.log(cookie.load('modiferCount'));
    console.log('not mod product');
   }
  // console.log(modifier); return false;
 
  var totalPrice = proQty * proPrice;
  
   var postObject = {};
   postObject = { 
   'app_id' : config.ids.appId,
   "product_id" : productId,
   "product_name" : proName,
   "product_sku" : prosku,
   "product_image" : proImage,
   "availability_id" : cookie.load('defaultAvilablityId'),
   "product_unit_price" : proPrice,
   "product_qty" : proQty,
   "product_total_price" : totalPrice,
   "modifiers" : JSON.stringify(modifier)
     
   } ;

    if(typeof cookie.load('UserId') === 'undefined'){ 
	     postObject['reference_id'] = getResult('referenceId');
   }else{
	      postObject['customer_id'] = cookie.load('UserId');
   }

   
   /*add loading */
   this.setState({status:'Loading'});
  axios.post(APIURLPRO+"cart/insert", qs.stringify(postObject) 

 ).then(res => {
       this.setState({status:'ok'});
		  if(res.data.status === "ok"){
		        cookie.save('cartValue','Yes');
				hashHistory.push("/cart");
			  //  window.location = "/cart";
			   }
		  else if(res.data.status === "error"){
				    alert(res.data.message);
		}
      });
	 
}
	 
	 
  render() {
 var proImg = this.__productImage(this.state.details.product_thumbnail)
  if(this.state.status === "Loading"){
  
    return (  <div style={{bottom : 0, left: 0, position: 'fixed', right : 0,  top : 0, margin :'auto'}}> <img src="/img/loader.gif" alt="Loading... "  style={{bottom : 0, left: 0, position: 'fixed', right : 0,  top : 0, margin :'auto'}} /> </div> );
  }else if(this.state.status === "ok") {
    return ( 
	
	 <div><DocumentMeta  {...meta} /> <div className="container-fluid desktop-container">

            <div className="row no-bar-image">
                <Link to={"/"}><img src="/img/icons/arrow-right.png" className="icon-img-small-3" alt="left-arrow"/></Link>
                <img src={proImg} alt="banner" className="img-responsive"/>
            </div>


            <div className="row ">

                <div className="col-lg-12 col-md-12 col-sm-12 ">
                    <h1 className="head2 ">{this.state.details.product_name} </h1> 
                    <p className="subh" >{this.state.details.product_short_description}</p>


                </div>

            </div>
            <div className="row ">

                <div className="col-lg-12 col-md-12 col-sm-12 ">
                    <div className="" > 
                        <div className="btn-div">
                            <Link  className="btn btn-group-mini"  ><i className="material-icons" onClick={this.dQty.bind(this)}> remove</i></Link> 
                            &nbsp; {this.state.cartCount} &nbsp; 
                            <Link  className="btn btn-group-sm "  > <i className="material-icons" onClick={this.iQty.bind(this)}>add</i></Link>  
                            <div className="clearfix"></div>
                        </div>
                    </div>
                </div>

            </div>
        <br/>
        </div>
		
		<div className="container-fluid desktop-container">
            <div className="row ">
                <div className="col-lg-12 col-md-12 col-sm-12 nopadding ">
                    <div className="fancy-collapse-panel">
                        <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
						
						{this.showModifiers(this.state.details.modifiers)}
						
		                  </div>
                    </div>
                   
                </div>
            </div>
        </div>				
        
		

        <div className="container-fluid ">
 
            <div className="space-30"></div>
            <div className="row ">
                <Link >
                <button id="addToCart" className="col-xs-12 continue-but desktop-container container-fluid bg-red "  onClick={this.addToCart.bind(this,this.state.details.product_id,this.state.details.product_name,this.state.details.product_sku,this.state.productPrice,this.state.cartCount,proImg,this.state.allowCart)}>{lang.add_to_cart}( {this.state.cartCount} )
                <p className="bb-txt pull-right no-margin pd-r-25">{this.state.productPrice}</p>
                </button>
                </Link>
            </div>
            <div className="clearfix"></div>
        </div> 
		
		{/* For Pickup Success */}
		
		<div className="modal" id="Pickup-Sucess">
                <div className="modal-dialog PopupWidth">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true" >
                                <img src="/img/icons/modal-close.png" className="img-responsive" alt="" />
                            </button>
                            <h4 className="modal-title">
                                <img src="/img/icons/DeliverySucess.png" className="img-responsive" alt="" />
                                Awesome, you can pickup !</h4>
                        </div>
                        <div className="modal-body text-center" >
                            <p><b>Your Order is handled by:  </b><br />
							{this.state.orderHandled}</p>
                            <br />
                            <button type="button" onClick={this.pickupSuccess.bind(this)} className="btn btn-raised btn-info ">Continue</button>
                            <br />
                            <br />
                        </div>
                        <div className="modal-footer">
                        </div>
                    </div>
                </div>
            </div>
			
			
		{/* For Delivery Success */}
		
		<div className="modal" id="DeliverySucess">
                <div className="modal-dialog PopupWidth">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                                <img src="/img/icons/modal-close.png" className="img-responsive" alt="close" />
                            </button>
                            <h4 className="modal-title">
                                <img src="/img/icons/DeliverySucess.png" className="img-responsive" alt="thumb-up" />
                                Awesome, we can deliver!</h4>
                        </div>
                        <div className="modal-body text-center">
                            <p><b>Your Delivery Address: </b><br />
                                {this.state.orderDeliveryAddress}</p>

                            <p><b>Your Order is handled by:</b><br /> 
							{this.state.orderHandled}</p>
                            <br />
                            <button type="button" onClick={this.deliverySuccess.bind(this)} className="btn btn-raised btn-info ">Continue</button>
                            <br />
                            <br />
                        </div>
                        <div className="modal-footer">
                        </div>
                    </div>
                </div>
            </div>
			
		{/* For Delivery error */}
		
		<div className="modal" id="DeliveryError">
                <div className="modal-dialog PopupWidth">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                                <img src="/img/icons/modal-close.png" className="img-responsive" alt="" />
                            </button>
                            <h4 className="modal-title">
                                <img src="/img/icons/Cant_Deliver.png" className="img-responsive" alt="" />
                                Sorry !</h4>
                        </div>
                        <div className="modal-body" >
                            <p>Sorry we cant deliver to your address <br />
                                Do you want to change your address or check again later ?</p>
                            <br />
                            <div className="col-sm-6">
                            <button type="button" onClick={this.closeDeliveryErr.bind(this)} className="col-lg-6 btn btn-raised btn-info fullwidth ">Check Later</button>
                            </div>
                            <div className="col-sm-6">
                            <button type="button" onClick={this.changeDelivery.bind(this)}  className="col-lg-6 btn btn-raised btn-info fullwidth ">Change Address</button>
                            </div>
                            <br />
                            <br />
                            <br />
                        </div>
                        <div className="modal-footer">


                        </div>
                    </div>
                </div>
            </div>
		
		{/* For takeaway popup */ }
		
		<div className="modal" id="Pickup-OutletSelection">
                <div className="modal-dialog locWidth">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                                <img src="/img/icons/modal-close.png" className="img-responsive" alt="close" />
                            </button>
                            <h4 className="modal-title">Select Your Pickup Location</h4>
                        </div>
                        <div className="modal-body">
                            <div className="map-loc">
                                 

                                <div className="map-box scrollbar" id="style-3" >
                                    
									{this.__loadOutlets()}
                                </div>
                                
                                
                                <br />
                                <br />
                            </div>
                        </div>
                        <div className="modal-footer">


                        </div>
                    </div>
                </div>
            </div>
			
		{/* For delivery popup */}
		<div className="modal" id="DeliveryAddress">
                <div className="modal-dialog PopupWidth">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                                <img src="/img/icons/modal-close.png" className="img-responsive" alt="close" />
                            </button>
                            <h4 className="modal-title">Your Delivery Address</h4>
                        </div>
                        <div className="modal-body">
                            <div className="form-group label-floating is-empty card-no">
                                <div className="input-group">
                                    <label className="control-label" >Enter Your Postal Code</label>
                                    <input type="text" id="postalcode" className="form-control" />
                                </div>
                            </div>
                            <br />
                            <button type="button" onClick={this.selectOutlet.bind(this)}  className="btn btn-raised btn-info ">Continue</button>
                            <br />
                            <br />
                        </div>
                        <div className="modal-footer">


                        </div>
                    </div>
                </div>
            </div>
		
		
		</div>
	   ); 
	   }
	   else {
	      return ( <div>{lang.no_products_found} </div>);
	    }
	 }
 }  
 
  
 export default Productsdetails;
