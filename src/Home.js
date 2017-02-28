/* global $, angular, React */
import React from 'react';
import axios from 'axios';
//var Carousel = require('react-responsive-carousel').Carousel;
import {  Link, browserHistory  } from 'react-router'
import DocumentMeta from 'react-document-meta';
import cookie from 'react-cookie';
import './App.css';
import getResult from './Api';
const Loading = require('./loading');
const config = require('./config');
const lang = require('./lang');
const APIURL = config.path.apiUrl; 
const APPID = config.ids.appId;
 
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
 
class Home extends React.Component {
 
  constructor(props) {
  
 
       super(props);
       /* Declare state */
	   this.state = { category: [],common: [],banner:[], bannercom:[],defaultAvilablity:'Delivery',defaultAvilablityImage:lang.deliveryImageWhite,navStatus:"Loading",openNav:'side-l',rewadNav:'collapsed','login':'',searchText:''};
	   
	   /*set default avilablity cookie value */
	   if((typeof cookie.load('defaultAvilablityId') === 'undefined' || cookie.load('defaultAvilablityId') ==="") || (typeof cookie.load('defaultAvilablity') === 'undefined' || cookie.load('defaultAvilablity') ==="")|| (typeof cookie.load('defaultAvilablityImage') === 'undefined' || cookie.load('defaultAvilablityImage') ==="") ){
		     this.savedefaultCookie(config.ids.defaultAvilablityId,lang.delivery,lang.deliveryImageWhite)
	   }
   }

	 componentWillMount() {
		/* API CALL FOR BANNERS
		axios.get(APIURL+'cms/banner?status=A&app_id='+APPID)
		 .then(res => {
		  if(res.data.status === "ok"){
		     this.setState({bannercom: res.data.common});
		    this.setState({banner: res.data.result_set});
		  } 
	  	});   */
	  /* API CALL FOR PRODUCT MENU NAVIGATION */
	        this.loadMenuNavigation(cookie.load('defaultAvilablityId'),cookie.load('defaultAvilablity'),cookie.load('defaultAvilablityImage'),'');
			
			//this.setState({ userId });
          // cookie.save('userId', 'mike', { path: '/' });
		  // console.log(cookie.load('userId'));
	 }
/* product search */	 
 handleChange(event) {
    var query= document.getElementById("searchInput").value;
	
   this.setState({searchText:query});
  }
	
	 /* Menu open and close */
    openNavmenu() {
	//console.log('open');
        document.getElementById("mySidenav").className = "sidenav nav-width";
        document.getElementById("parentDisable").style.display = "block";
		this.setState({openNav:'side-l side-l-tran'}); //rewadNav
		this.setState({rewadNav:'side-l side-l-tran'});
    }
	
	closeNav() {
		//console.log('close');
        document.getElementById("mySidenav").className = "sidenav";
        document.getElementById("parentDisable").style.display = "none";
		this.setState({openNav:'side-l side-l-out'});
		this.setState({rewadNav:'side-l side-l-out'});
    }
	
 
	
	/* change Availability - default delievry  */
  changeAvilablityTemp(avail,availText,availImage) {
	  this.setState({avail : avail});
	  this.setState({availText : availText});
      this.setState({availImage : availImage});
	  
	  if(cookie.load('defaultAvilablityId')!== avail){
		  if(cookie.load('cartValue')==='Yes'){
	 	  $("#SwitchingError").modal("toggle");
		  }else{
		     this.clearCookieValues();
			 this.changeAvilablity(avail,availText,availImage);
		  }
	  } 
  }
  
  
  /* this function used to delte all  cart items */
  destroyCart(){ 
    var postObject = {};
	 postObject = { 'app_id' : config.ids.appId } ;
   if(typeof cookie.load('UserId') === 'undefined'){
         var customerKey = 'reference_id';	
		 var customerVal = getResult('referenceId');
   }else{
        customerKey = 'customer_id';
		customerVal = cookie.load('UserId');
   }
    postObject[customerKey] = customerVal;
	   var qs = require('qs');
 axios.post(APIURL+"cart/destroy",qs.stringify(postObject)).then(res => {
  
		  if(res.data.status === "ok")
		    {
			   cookie.save('cartValue','No');
			   $(".carticon").attr("src","/img/icons/shopping-cart.png");
			   
			   
			}
		  else if(res.data.status === "error"){
				
		   }
      });
}

/* used to delete all cookie values */
clearCookieValues()
{
        cookie.remove('orderOutletId');
		cookie.remove('orderOutletName');
		cookie.remove('orderPostalCode');
		cookie.remove('orderTAT');
		cookie.remove('orderDeliveryAddress');
		cookie.remove('orderHandled');
}


	/* change Availability - default delievry  */
  changeAvilablity(avail,availText,availImage) {
	  
	  this.savedefaultCookie(avail,availText,availImage);
	  this.setState({defaultAvilablity : availText});
      this.loadMenuNavigation(avail,availText,availImage,'Yes');
  }
  /* this function used to set default cookie values */
  savedefaultCookie(avail,availText,availImage){
      cookie.save('defaultAvilablityId', avail, { });
	  cookie.save('defaultAvilablity', availText, { });
	  cookie.save('defaultAvilablityImage', availImage, { });
  }
  /* this function used to load cart icon image */
  loadCartImage()
  {
   return getResult('cartImage','Yes');
  }
  
  /* this function used to load menu navigation */
 loadMenuNavigation(currentAvi,availText,availImage,loading)
 {
 
   //var availImage = availImage;
      if(loading === "Yes" ){
	   this.setState({navStatus: "Loading"});
	  }
    	axios.get(APIURL+'products/navigation_menu?app_id='+APPID+"&availability="+currentAvi)
		.then(res => {
		 // console.log('banner result loading done');
		    if(res.data.status === "ok"){
			  this.setState({navStatus: res.data.status});
	          this.setState({common: res.data.common});
		      this.setState({category: res.data.result_set});
			  this.setState({defaultAvilablityImage: availImage});
			  this.setState({defaultAvilablity: availText});
			  
			 // this.setstate({defaultAvilablityImage:availImage });
		  }else {
		    this.setState({navStatus: res.data.status});
		  }
      });
 }
 
  __showBanners(){
  
	if(this.state.banner){ 
			return this.state.banner.map((loaddata, index)=>
			 <div key={index}>
				<img  src={this.state.bannercom.image_source + loaddata.banner_image}   alt="Loading..." />
					{/* <p className="legend">{loaddata.banner_name}</p> */} 
			 </div>
			);
		}else{ 		 return ( <div> <img    src="img/header-img.jpg"   alt="Loading..." /> </div>);
		}
	}
	
	/* listing navigation  items.. */
  __ProductListing(){
	 
   if(this.state.navStatus === "ok" ){ 
		return   this.state.category.map((loaddata, index)=>
			<div className="col-xs-12 nopadding home-bottom-img" key={index} >
{(() => {if(loaddata.menu_custom_title.toLowerCase

().indexOf(this.state.searchText)!==-1) {
		

			return( 
	                   
					   <Link key={index} to={this.__navLink(loaddata.menu_type,loaddata.menu_category_id,loaddata.pro_subcate_id)} ><img src={this.__navImage(loaddata.menu_type,loaddata.pro_cate_image,loaddata.pro_subcate_image,this.state.common.category_image_url,this.state.common.subcategory_image_url)} alt="" className="img-responsive" />
						  <p className="text-left font-bold text-uppercase pd-l-20">{loaddata.menu_custom_title}</p>
						</Link>)}})()}
					</div>
		);
		
	}else {
		return(<div className="col-xs-12 nopadding home-bottom-img"  >  <span> {lang.no_products_found}  </span> </div> );
 
	}
}

/* return navigation menu slug */
__navLink(menu_type,CateId,subCateId) {
 return  (menu_type ==="sub")? "/products/subcategory/"+subCateId : "/products/category/"+CateId;
}

/* return navigation image value.  like no image, category image, sub category image */
__navImage(menuType,cateImgae,subCateImage,cateUrl,subcateUrl) {
  var image = (menuType === "sub")? subCateImage : cateImgae;
   var imageUrl = (menuType === "sub")? subcateUrl : cateUrl;
   return  (image === null || image === "" )? "/img/no-images/products-no-image.jpg" : config.path.tinThumpUrl+imageUrl+"/"+image+"&w=768&h=265&q=80";
}

/* this function used to add active class for selected avilablity */
 isActive(value){
     return (value === this.state.defaultAvilablity? 'btn active': 'btn in-active');
  }
  
 /* this function used to show active images  */
 activeImage(value){
     //return (value === this.state.defaultAvilablity? 'btn active': 'btn in-active');
	  if(value === this.state.defaultAvilablity){  
	         return  (value === "Dine in") ?  lang.dineInImageWhite :  "/img/icons/"+this.state.defaultAvilablity+"_white.png";
	   }else {
	     return    (value === "Dine in") ?  lang.dineInImage :  "/img/icons/"+value+".png";
	   }
  }
  
  /* login part */
  loginPart()
  {
	  if( typeof cookie.load('UserId') !== 'undefined' && this.state.login === "" )
	  { 
	     return (<div className="logout-menu" >
                    <Link className={this.state.openNav} onClick={this.logOut.bind(this)} style={{cursor:'pointer'}}  ><img alt=""  src="/img/icons/logout.png"/> {" "}Logout
                        <p className="subb">Signed in as {cookie.load('UserEmail')}</p>
                    </Link>
                </div>);
	  }

  }
  
  closeSwitcher(){
	 $("#SwitchingError").modal("toggle") 
  }
  
  switchAvailability(){
	    var avail = this.state.avail;
		var availText = this.state.availText;
		var availImage = this.state.availImage;
	    this.changeAvilablity(avail,availText,availImage);
		this.destroyCart();
		
		/* remove default cokkie values */
		cookie.remove('orderOutletId');
		cookie.remove('orderOutletName');
		cookie.remove('orderPostalCode');
		cookie.remove('orderTAT');
		cookie.remove('orderDeliveryAddress');
		cookie.remove('orderHandled');
		
	    $("#SwitchingError").modal("toggle") 
  }
  
  
  logOut()
  {
    //console.log('logout');
     cookie.remove("UserId");
	 cookie.remove("UserFname");
	 cookie.remove("UserLname");
     cookie.remove("UserMobile");
	 cookie.remove("UserEmail");
	// this.closeNav();
	 this.setState({login:'No'});
	   browserHistory.push("/sign-in");
  }
  
  
  render() {
  
    if(this.state.navStatus === "Loading"){
	
	 return (
	 <div> <DocumentMeta  {...meta} />
	 <Loading/> </div>
	 );
	}else { 
    return (

	<div>   	<DocumentMeta  {...meta} />
        <div className="container-fluid desktop-container position-rel">
            <div id="parentDisable"></div>
            <div className="row">
                <div className="col-xs-12 head-dropdwn nopadding">
                    <div className="dropdown center-block">
                        <button type="button" className="btn home-modal-button" data-toggle="modal" data-target="#onload-screen" data-keyboard="false" data-backdrop="static">
                            <p className="text-center dine-in-text">
                                <img alt=""  src={this.state.defaultAvilablityImage} className="icon-img-small"/>
                                { " " }<span  style={{fontSize: '16px'}}>{this.state.defaultAvilablity}</span>{ " " }
                                <img alt=""  src="/img/icons/arrow-down.png" className="icon-img-small"/>
                            </p>
                        </button>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12 top-nav padding-0">
                    <div className="col-xs-3">
                        <span  className="cursor-pointer side-l1" onClick={this.openNavmenu.bind(this)} >
                            <img alt=""  src="/img/menu.png" className="icon-img-small5"/></span>
                    </div>

                    <div className="col-xs-6">
                        <img alt=""  src="/img/logo.png" className="img-responsive logo-main center-block"/>
                    </div>

                    <div className="col-xs-3 nopadding">
                        <p className="b-txt text-right pd-tr-12-20">
						                         <Link data-toggle="collapse" to={"#SearchBAR"} aria-expanded="false" aria-controls="collapseExample"><img alt=""  src="/img/icons/search.png" className="icon-img-small4"/></Link>
                            
                            {"  "}
                          <Link to={"/cart"} >  <img alt=""  src={getResult('cartImage')} className="icon-img-small-1 carticon"/> </Link>
                        </p> 

                    </div>
    <div className="collapse" id="SearchBAR">
			                      <div className="">
			                        <div className="form-group SearchBAR">
			                            <div className="input-group">
			                                <input type="text" id="searchInput" onChange={this.handleChange.bind(this)} ref="searchInput"  className="form-control" placeholder="Go ahead search for a dish..."/>
			                            </div>
			                            </div>
			                      </div>
			                    </div>

                </div>
            </div>

            <div id="mySidenav" className="sidenav">
             <br /> <br />
                <div className="side-nav-header">
				 <div className={this.state.openNav}>
                    <img className="logo " alt="" src="/img/logo.png"  />
					   </div>
                    <a  style={{cursor:'pointer'}} className="closebtn" onClick={this.closeNav.bind(this)}  >
                        <img alt="" src="/img/icons/menu2.png" id="close-btn-nav"/>
                    </a>
                </div>
               <Link to="/"  onClick={this.closeNav.bind(this)} className={this.state.openNav}><img alt="" src="/img/icons/home.png"/>{" "}{lang.navigation.home}</Link>
               <Link to="/my-account" className={this.state.openNav}><img alt="" src="/img/icons/user.png"/> {" "}{lang.navigation.myaccount}</Link>
                <Link to="/orders" className={this.state.openNav}><img alt="" src="/img/icons/orders.png"/> {" "}{lang.navigation.vieworders}</Link>
                <Link to="/myrewards" data-toggle="collapse" data-target="#toggleDemo" data-parent="#sidenav01" className={this.state.rewadNav}>
                    <img alt=""  src="/img/icons/rewards.png"/> {" "}{lang.navigation.viewrewards}</Link>

                <div className="grey-seperater"></div>

                  <Link to="/about-us" className={this.state.openNav}><img alt="" src="/img/icons/info.png"/> &nbsp;{lang.navigation.about}</Link>
                <Link to="/privacy-policy" className={this.state.openNav}><img alt="" src="/img/icons/lock.png"/> &nbsp;{lang.navigation.privacy}</Link>
                <Link to="/contact-us" className={this.state.openNav}><img alt="" src="/img/icons/phone.png"/> &nbsp;{lang.navigation.contact}</Link>

                      {this.loginPart()}
            </div>

            <div className="row">
                <img alt=""  src="/img/header-img.jpg" className="img-responsive banner-img"/>
                <div className="col-lg-12 nopadding">
                    <div className="bottom-nav">
                        <div className="col-xs-5 nopadding">
                            <p className="b-txt pd-l-20">
                              <Link  >  <img alt=""  src="/img/icons/compass.png" className="icon-img-small-2"/> {" "}Direction</Link>
							  <Link  ><img alt=""  src="/img/icons/phone-reciver.png" className="icon-img-small-2"/>Call</Link></p> 
                        </div>

                        <div className="col-xs-7 nopadding">

                            <p className="b-txt text-right pd-r-20"> Operations: 11:00 AM - 10:30 PM</p> 
                        </div>

                        <div className="clearfix"></div>
                    </div>
                </div>
                <div className="col-xs-12 heading-div ">
                    <div className="col-xs-6 pd-l-20"><h1 className="heading pull-left" style={{fontWeight: 'bold'}}  > Our Menu</h1></div>
                    <div className="col-xs-6 pd-r-20">
                        <button type="button" className="btn pull-right food-type-btn">Halal</button> 
                        <button type="button" className="btn pull-right food-type-btn">Vegetarian</button>
                    </div>
                </div>

               {/* <div className="col-xs-12 nopadding home-bottom-img"> <a href=""><img alt=""  src="/img/pasta.jpg" className="img-responsive" /></a>
                    <p className="text-left font-bold text-uppercase pd-l-20">pasta</p>
                </div>
                <div className="col-xs-12 nopadding home-bottom-img"> <a href=""><img alt=""  src="/img/pizza.jpg" className="img-responsive" /></a>
                    <p className="text-left font-bold text-uppercase pd-l-20">pizza</p>
                </div> */}
                   { this.__ProductListing() }

            </div>


        </div>
		
		
		<div className="modal" id="SwitchingError">
                <div className="modal-dialog PopupWidth">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                                <img src="/img/icons/modal-close.png" className="img-responsive" alt="" />
                            </button>
                            <h4 className="modal-title">
                                <img src="/img/icons/SwitchingError.png" className="img-responsive" alt="" />
                                Wait a second !</h4>
                        </div>
                        <div className="modal-body">
                            <p>By switching you are about to clear your cart. <br />
                                Do you wish to proceed ?</p>
                            <br />
                            <div className="col-sm-6">
                            <button type="button" onClick={this.closeSwitcher.bind(this)} className="btn btn-raised btn-info fullwidth" >Cancel</button>
                            </div>
                            <div className="col-sm-6">
                            <button type="button" className="col-lg-6 btn btn-raised btn-info fullwidth " onClick={this.switchAvailability.bind(this)}>Yes Proceed</button>
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
        <div className="modal fade" id="onload-screen">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title ">How will you be enjoying <br/>your food today?</h3>
                    </div>
                    <div className="modal-body">
                        <div className="col-xs-12 modal-button">
                            
                            <button className={this.isActive(lang.delivery)}   type="button" id="delivery" name="delivery" onClick={this.changeAvilablityTemp.bind(this,config.ids.deliveryId,lang.delivery,lang.deliveryImageWhite)}> <img alt=""  src={this.activeImage(lang.delivery)} className="icon-img-small1"/> {" "} Delivery </button>
                            <button className={this.isActive(lang.takeaWay)} type="button" id="takeaway" name="takeaway" onClick={this.changeAvilablityTemp.bind(this,config.ids.pickupId,lang.takeaWay,lang.takeaWayImageWhite)} > <img alt=""  src={this.activeImage(lang.takeaWay)} className="icon-img-small1"/> Takeaway </button>
<button className={this.isActive(lang.dineIn)}  type="button" id="dine-in" name="dine-in" onClick={this.changeAvilablityTemp.bind(this,config.ids.dineinId,lang.dineIn,lang.dineInImageWhite)}> <img alt=""  src={this.activeImage(lang.dineIn)} className="icon-img-small1"/> {" "} Dine in</button>
							</div>
                        <div className="col-xs-12 nopadding">
                            <img alt=""  src="/img/modal-window-botom-image.png" className="img-responsive"/>
                        </div>
                    </div>

                </div>
            </div>
        </div>
		
	</div>
    );}
  }
}
export default Home;
