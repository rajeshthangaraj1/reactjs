import axios from 'axios';
const config = require('./config');
const APIURL = config.path.apiUrl;
const APIURLPRO = config.path.apiUrlPro;
const APPID = config.ids.appId;
import cookie from 'react-cookie';
module.exports = function(type,param) {    
 
    if(type==='category'){   /* API CALL FOR PRODUCT MENU NAVIGATION */
 	  return axios.get(APIURL+'products/navigation_menu?app_id='+APPID+"&availability="+cookie.load('defaultAvilablityId'));
	}
	else    if(type==='settings'){   /* get all settings  */
 	  return axios.get(APIURL+'settings/get_common_settings?app_id='+APPID+"&postal_code="+cookie.load('orderPostalCode'));
	}
	else if(type==='product'){ 
	   return axios.get(APIURLPRO+'products/products_all_products?app_id='+APPID+'&status=A&availability='+cookie.load('defaultAvilablityId')+'&'+param);
	}else if(type==="cartImage"){ /* used to load cart image */
	 return (cookie.load('cartValue') === "Yes"?  "/img/icons/shopping-cart-black.png" : "/img/icons/shopping-cart.png" );
	}else if(type==="referenceId") /* get referenceId */
	{
	  if( typeof cookie.load('referenceId') === 'undefined' ){ 
	         var randomKey =  randomId();
		     cookie.save('referenceId',randomKey);
			 return randomKey;
	    }
	  else {
	     return cookie.load('referenceId');
	   }
	}
	else if(type==="Auth") 
	{	 /* this function used to cyheck user login */
	
	   if(typeof cookie.load('UserId') === 'undefined'){
			return false;
		} 
	}else if(type==="fillAllData")  /* this function used to fill all customer information  */
	{
	   if(typeof cookie.load('UserId') === 'undefined' || typeof cookie.load('UserId') === 'undefined' || typeof cookie.load('UserId') === 'undefined' || typeof cookie.load('UserId') === 'undefined'){
			return false;
		} 
	}
	else if(type==="minCartAmount")  /* this function used to validate minimum cart amount  */
	{
	
	}
	else if(type==="UserDetails") 
	{	 /* this function used to cyheck user login */
	
	   if((typeof cookie.load('UserId') === 'undefined' || cookie.load('UserId') ==="") || (typeof cookie.load('UserFname') === 'undefined' || cookie.load('UserFname') ==="") || (typeof cookie.load('UserEmail') === 'undefined' || cookie.load('UserEmail') ==="") || (typeof cookie.load('UserMobile') === 'undefined' || cookie.load('UserMobile') ==="")  ){
			return false;
		} 
	}
		else if(type==="DeliveryDetails") 
	{	 /* this function used to cyheck user login */
	
	   if( (typeof cookie.load('DeliveryDate') === 'undefined' || cookie.load('DeliveryDate') ==="") || (typeof cookie.load('DeliveryTime') === 'undefined' || cookie.load('DeliveryTime') ==="")  ){
			return false;
		} 
	}

/* this function used to create random string*/	
function randomId()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 50; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
}

