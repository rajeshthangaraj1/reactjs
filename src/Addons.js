import React from 'react';
import axios from 'axios';
import { Link  } from 'react-router'
import getResult from './Api';
const config = require('./config');
const lang = require('./lang');
const APIURL = config.path.apiUrl;
const APPID = config.ids.appId;
var strp = require('strp');
import cookie from 'react-cookie';

class Addons extends React.Component {
	 constructor(props) {
	  super(props);
	    	this.state = {  products: [],products_common: [],status:'Loading'};
	}

	componentWillMount() {

		axios.get(APIURL+'products/products_list?status=A&app_id='+APPID+"&availability="+config.ids.deliveryId+"&apply_addon=Yes")
		 .then(res => {
		  this.setState({status: res.data.status});
		  if(res.data.status === "ok"){
		     this.setState({status: res.data.status});
		     this.setState({products_common: res.data.common});
		     this.setState({products: res.data.result_set});
	
		  } else {
		      this.setState({status: res.data.status});
		  }
	  	});  
	 }
	 
	 
/* load product Image*/	
__productImage(product_thumbnail,imagePath){
   return  (product_thumbnail ==="" )? "/img/no-images/productthump-no-image.jpg" : this.state.products_common.image_source+"/"+product_thumbnail;
} 
/* this function used to load  products */	 
showProducts(){
 return this.state.products.map((product, index)=> <div className="row product-holder" key={index}>
          <div className="col-lg-5 col-md-5 col-sm-5 col-xs-5 thumb-img-div">  <Link to={"/product/"+product.product_slug} > <img src={this.__productImage(product.product_thumbnail)}  alt="pizza-thumbnail" width="100%" /></Link>
          </div>
          <div className="col-lg-7 col-md-7 col-sm-7 col-xs-7">
            <h1 className="head1"> <Link to={"/product/"+product.product_slug} >{strp.stripslashes(product.product_name)}</Link> <p className=" price pull-right"> {/*<strike className="strike-txt">9.90</strike>*/} {" "}{config.ids.currency+product.product_price}</p></h1> 
           <p className="text-justify">{product.product_short_description} </p>
           {/*   <p className="tags"><span className="label label-success">CHEF RECOMMENDED</span> &nbsp;  <span className="label label-success text-uppercase">vegetarian</span>&nbsp; <span className="label label-success hidden-xs">CHEF RECOMMENDED</span> &nbsp;</p> 
            <p className="tags nopadding"><span className="label label-success text-uppercase">vegetarian</span></p>*/}
          </div>
          <div className="clearfix" />
        </div>);
}
 
 /* show next page link */
 nextpage ()
 {
 //console.log(cookie.load('UserId'));
   if( (typeof cookie.load('UserId') === "undefined")  || (cookie.load('UserId') && cookie.load('UserId') === "")){
      console.log(3);
      return "sign-in";
   }else {
	      //console.log(1);
	     if(cookie.load('defaultAvilablityId') === config.ids.dineinId){  
	      //  console.log(2);
	        return "book-a-table";
	    }
       else if(cookie.load('defaultAvilablityId') === config.ids.deliveryId){  
	        return "delivery-date";
	     }
		else {
		alert(lang.availability_disabled);
		}
   }
 
 }
 
   /* this function used to load cart icon image */
  loadCartImage()
  {
   return getResult('cartImage','Yes');
  }
  render() {
  if(this.state.status === "Loading"){
    return (<div style={{bottom : 0, left: 0, position: 'fixed', right : 0,  top : 0, margin :'auto'}}> <img src="/img/loader.gif" alt="Loading"  style={{bottom : 0, left: 0, position: 'fixed', right : 0,  top : 0, margin :'auto'}} /> </div>); 
  }else if(this.state.status === "ok"){
    return (
	   <div>   
	    <div className="container-fluid desktop-container">
        <div id="parentDisable" />
        <div className="row">
          <div className="col-xs-12 top-nav inner-top-nav">
            <div className="col-xs-3 nav-head pd-l-20"> <Link to={"/cart"}><img src="/img/icons/arrow-right.png" alt="left-arrow" className="icon-img-small-3" /></Link>
            </div>
            <div className="col-xs-6 nav-head ">
              <h1 className="main-title">Complete Your Meal</h1>
            </div>
            <div className="col-xs-3 nopadding">
              <p className="b-txt text-right ">
                            <Link data-toggle="collapse" to={"#SearchBAR"} aria-expanded="false" aria-controls="collapseExample"><img alt=""  src="/img/icons/search.png" className="icon-img-small4"/></Link>
                           <Link to={"/cart"} >  <img alt=""  src={this.loadCartImage()}className="icon-img-small-1"/> </Link>
                        </p> 
            </div>
			     <div className="collapse" id="SearchBAR">
			                      <div className="">
			                        <div className="form-group SearchBAR">
			                            <div className="input-group">
			                                <input type="text" id="card" className="form-control" placeholder="Go ahead search for a dish..."/>
			                            </div>
			                            </div>
			                      </div>
			                    </div>
          </div>
        </div>
        {/*Inner page slider start*/}
        <div className="row">
          <img src="/img/pasta-1.jpg" alt="pasta" className="img-responsive" />
        </div>
        {/*Inner page slider end*/}
        {/*Products start*/}    
		  {this.showProducts()}
        {/*Products End*/}
        <div className="row ">
          <div className="container">
          {/*  <div className="tigger-menu" id="tigger-menu">
              <div className="dropup" id="dropup">
                <a className="dropdown-toggle" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <div className="float-btn" />
                </a>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                  <li><a href="#">Pasta</a></li>
                  <li><a href="#">Appetiser</a></li>
                  <li><a href="#">Pizza</a></li>
                  <li><a href="#">Appetiser</a></li>
                  <li><a href="#">Drinks</a></li>
                  <li><a href="#">Kids Meal</a></li>
                  <li><a href="#">Pasta</a></li>
                  <li><a href="#">Appetiser</a></li>
                  <li><a href="#">Pizza</a></li>
                  <li><a href="#">Kids MealPasta</a></li>
                  <li><a href="#">Appetiser</a></li>
                  <li><a href="#">pizza</a></li>
                </ul>
              </div>
              <a href="#" />
            </div> */}
            <div className="row">
              <Link  to={this.nextpage()}>
                <button className="col-lg-12 continue-but desktop-container container-fluid">Continue</button>
              </Link>                  </div>
          </div>
        </div>
        <br />
      </div>

		
       </div>
	 ); 
	 }else {
	  
	   return (<div><div className="container-fluid desktop-container">
        <div id="parentDisable" />
        <div className="row">
          <div className="col-xs-12 top-nav inner-top-nav">
            <div className="col-xs-3 nav-head pd-l-20"> <Link to={"/"}><img src="/img/icons/arrow-right.png" alt="left-arrow" className="icon-img-small-3" /></Link>
            </div>
            <div className="col-xs-6 nav-head ">
              <h1 className="main-title">Complete Your Meal</h1>
            </div>
            <div className="col-xs-3 nopadding">
              <p className="b-txt text-right ">
                
                              <Link to={"/cart"} >   <img src={this.loadCartImage()} className="icon-img-small-1-inner" alt="shopping-cart" /> </Link>
              </p> 
            </div>
          </div>
        </div>
         
        {/*Products start*/}
        <div className="row product-holder">
		<br/><br/>
         <p> {lang.no_products_found} </p>
          <div className="clearfix" />
        </div> 
        {/*Products End*/}
        <div className="row ">
          <div className="container">
           
            <div className="row">
               <Link  to={this.nextpage()}>
                <button className="col-lg-12 continue-but desktop-container container-fluid">Continue</button>
              </Link>                  </div>
          </div>
        </div>
        <br />
      </div> </div>);
	 }
	 }
 }
 
  
 export default Addons;
 