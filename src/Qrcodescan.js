import React from 'react';
import {  Link, hashHistory  } from 'react-router';
import axios from 'axios';
const lang = require('./lang');
import getResult from './Api';
const config = require('./config');
const APIURL = config.path.apiUrl;
const APPID = config.ids.appId;
import DocumentMeta from 'react-document-meta';
import cookie from 'react-cookie';
var qs = require('qs');
 
 /* Load meta tags */
  const meta = {
      title: lang.scan_qr_code_page,
      description: lang.scan_qr_code_page,
      meta: {
        name: {
          keywords: lang.scan_qr_code_page
        }
      }
    };
	
	
class Qrcodescan extends React.Component {

constructor(props) {
     super(props);
	    /* check Authentication */
	    if(getResult('Auth') === false ){
		hashHistory.push("/sign-in");
		}	
		/* validate cart details */
	
	 	axios.get(APIURL+'cart/contents?app_id='+APPID+"&customer_id="+cookie.load('UserId'))
		 .then(res => {
		  if(res.data.status === "ok"){
			  console.log('success');
		  } else{
		  alert('something went wrong');
	         hashHistory.push("/");
		  }
	  	});
		
 }		
	


 /* this function used to validate table no*/
 checkTablNo(){
 var tableNo =  document.getElementById("tableNo").value;
  if(tableNo !==""){
  document.getElementById("loadIcon").style.display = "block";
  document.getElementById("SubBtn").style.display = "none"
  
   var postObject = {};
   postObject = { 'app_id' : APPID, 'tm_table_number' : tableNo } 
   
   axios.post(APIURL+"tablemanagement/find_table",qs.stringify(postObject) ).then(res => {
  document.getElementById("loadIcon").style.display = "none";
  document.getElementById("SubBtn").style.display = "block"
		  if(res.data.status === "ok")
		    {
			   cookie.save('orderOutletId',res.data.result_set[0].outlet_id);
			   cookie.save('orderOutletName',res.data.result_set[0].outlet_name);
			   cookie.save('orderTableNo',tableNo);
			  // window.location = "/checkout";
			hashHistory.push("/checkout");
			}
		  else if(res.data.status === "error"){
		        document.getElementById("tableNo").value="";
	    	    alert(res.data.result_set);
		   }
      });
	  
  }else {
  alert('Please fill table No');
  }
 }
   
render() { 
  
     return ( <div>  
	 
	 <DocumentMeta  {...meta} />
	 <div className="container-fluid desktop-container">
            <div className="row">
                <div className="col-xs-12 main-title-bar">
                 <Link to="/add-on"><img src="/img/left-arrow.png" className="pull-left icon-img-small" alt="left-arrow"/></Link>
                    <h3 className="top-title main-title padding-right-20">DINE IN</h3>
                </div>
            </div>
            <div className="row"><div className="space-10 bg-gray"></div></div>
            <div className="white-outer center-block">
                <div className="col-sm-4 col-xs-12 div-center">
                    <div className="space-30"></div>
                    <p className="text-center font-bold font-size-18">SCAN YOUR QR CODE</p>
                    <div className="space-15"></div>
                    <p className="text-center">
                        <Link to="/qrcode-scan"><img src="/img/qr-code.jpg" alt="qr-code"/></Link>
                    </p>
                    <div className="space-10"></div>
                    <p className="text-center font-size-18 color-gray">Or</p>
                    <div className="space-10"></div>
                    <p className="text-center font-bold text-uppercase font-size-18">enter table number</p>
                    <div className="space-5"></div>
                    <div className="form-group label-floating is-empty card-no table-no">
                        <div className="input-group">
                            <label className="control-label" htmlFor="tableNo">Table Number</label>
                            <input type="text" id="tableNo" className="form-control"/>
                        </div>
                    </div>
                </div>
                <div className="clearfix">

                    <div className="space-50"></div>
                    <div className="space-50"></div>
                    <div className="space-50"></div>
                </div>

                <div className="row">   <img  style={{display : 'none' }} src="/img/loader.gif" alt="Loading" id="loadIcon"  />
                   <Link onClick={this.checkTablNo.bind(this)} id="SubBtn"> <button className="col-lg-12 continue-but desktop-container container-fluid" >Submit</button>  </Link>
				
                </div>     </div>
            </div>
	 </div> );

   } 
  

}
export default Qrcodescan;
