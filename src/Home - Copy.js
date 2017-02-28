import React from 'react';
import axios from 'axios';
//var Carousel = require('react-responsive-carousel').Carousel;
const config = require('./config');
 //const lang = require('./lang');
const APIURL = config.path.apiUrl;
const APPID = config.ids.appId;
import {  Link  } from 'react-router'
import './App.css';
 
class Home extends React.Component {
  constructor(props) {
       super(props);
       /* Declare state */
	   this.state = { category: [],common: [],banner:[], bannercom:[]};	
   }
     
	 componentWillMount() {
		/* API CALL FOR BANNERS */
		axios.get(APIURL+'cms/banner?status=A&app_id='+APPID)
		 .then(res => {
		  if(res.data.status === "ok"){
		     this.setState({bannercom: res.data.common});
		    this.setState({banner: res.data.result_set});
		  }
	  	});  
	  /* API CALL FOR PRODUCT MENU NAVIGATION */
		axios.get(APIURL+'products/navigation_menu?app_id='+APPID)
		.then(res => {
		    if(res.data.status === "ok"){
			   this.setState({navStatus: res.data.status});
	          this.setState({common: res.data.common});
		      this.setState({category: res.data.result_set});
		  } 
      });
	 }
	 
    openNavmenu() {
        document.getElementById("mySidenav").className = "sidenav nav-width";
        document.getElementById("parentDisable").style.display = "block";
    }
	
	closeNav() {
        document.getElementById("mySidenav").className = "sidenav";
        document.getElementById("parentDisable").style.display = "none";
    }
	 
  __showBanners(){
  
	if(this.state.banner){ 
			return this.state.banner.map((loaddata, index)=>
			 <div key={index}>
				<img src={this.state.bannercom.image_source + loaddata.banner_image}   alt="Loading..." />
					{/* <p className="legend">{loaddata.banner_name}</p> */} 
			 </div>
			);
		}else{ 
		 return ( <div> <img src="img/header-img.jpg"   alt="Loading..." /> </div>);
		}
	}
	
	/* listing navigation  items.. */
  __ProductListing(){
   if(this.state.navStatus === "ok" ){ 
		return this.state.category.map((loaddata, index)=>
	 
				   <div className="col-xs-12 nopadding home-bottom-img" key={index}>
	                    <Link to={'/products/'+this.__navLink(loaddata.menu_type)+'/'+loaddata.menu_category_id} ><img src={this.__navImage(loaddata.menu_type,loaddata.pro_cate_image,loaddata.pro_subcate_image,this.state.common.category_image_url,this.state.common.subcategory_image_url)} alt="" className="img-responsive"/>
						  <p className="text-left font-bold text-uppercase pd-l-20">{loaddata.menu_custom_title}</p>
						</Link>
					</div>
			
		);
	}else {
	// return(<div className="col-xs-12 nopadding home-bottom-img"  >{lang.no_products_found} </div> );
 
	}
}

/* return navigation menu slug */
__navLink(menu_type) {
 return  (menu_type ==="sub")? "sub" : "main";
}

/* return navigation image value.  like no image, category image, sub category image */
__navImage(menuType,cateImgae,subCateImage,cateUrl,subcateUrl) {
  var image = (menuType === "sub")? subCateImage : cateImgae;
   var imageUrl = (menuType === "sub")? subcateUrl : cateUrl;
   return  (image ==="" )? "/img/no-images/products-no-image.jpg" : imageUrl+"/"+image;
}


  render() {
    return (
	  <div>
           
		   <div className="container-fluid desktop-container position-rel">
            <div id="parentDisable"></div>
            <div className="row">
                <div className="col-xs-12 head-dropdwn nopadding">
                    <div className="dropdown center-block">
                        <button type="button" className="btn home-modal-button" data-toggle="modal" data-target="#onload-screen" data-keyboard="false" data-backdrop="static">
                            <p className="text-center dine-in-text">
                                <img alt="" src="/img/icons/restaurant.png" className="icon-img-small"/>
                                &nbsp;Dine in&nbsp;
                                <img alt="" src="/img/icons/arrow-down.png" className="icon-img-small"/>
                            </p>
                        </button>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12 top-nav padding-0">


                    <div className="col-xs-2">
                        <span  onClick={this.openNavmenu}  >
                            <img alt="" src="/img/menu.png" className="icon-img-small5"/></span>
                    </div>

                    <div className="col-xs-8">
                        <img alt="" src="/img/logo.jpg" className="img-responsive logo-main center-block"/>
                    </div>

                    <div className="col-xs-2 nopadding">
                        <p className="b-txt text-right pd-tr-12-20">
                            <img alt="" src="/img/icons/search.png" className="icon-img-small4"/>

                            <img alt="" src="/img/icons/shopping-cart.png" className="icon-img-small-1"/>
                        </p> 

                    </div>


                </div>
            </div>
            <div id="mySidenav" className="sidenav">
                <div className="side-nav-header">
                    <img className="logo" alt="" src="/img/logo.jpg" />
                    <a href="#" className="closebtn" onClick={this.closeNav} >
                        <img alt="" src="/img/icons/menu2.png" id="close-btn-nav"/>
                    </a>
                </div>
				 
				
               <Link to="/"  onClick={this.closeNav}><img alt="" src="/img/icons/home.png"/> &nbsp; {config.navigation.home}</Link>
                <Link to="/myaccount"><img alt="" src="/img/icons/user.png"/> &nbsp;{config.navigation.myaccount}</Link>
                <Link to="/orders"><img alt="" src="/img/icons/orders.png"/> &nbsp;{config.navigation.vieworders}</Link>
                <Link to="/myrewards" data-toggle="collapse" data-target="#toggleDemo" data-parent="#sidenav01" className="collapsed">
                    <img alt="" src="/img/icons/rewards.png"/> &nbsp;{config.navigation.viewrewards}</Link>
                
                <div className="grey-seperater"></div>
                
                <Link to="/about-us"><img alt="" src="/img/icons/info.png"/> &nbsp;{config.navigation.about}</Link>
                <Link to="/privacy-policy"><img alt="" src="/img/icons/lock.png"/> &nbsp;{config.navigation.privacy}</Link>
                <Link to="/contact-us"><img alt="" src="/img/icons/phone.png"/> &nbsp;{config.navigation.contact}</Link>

                  <div className="logout-menu" >
                    <a href="#"><img alt="" src="/img/icons/logout.png"/> &nbsp;Logout
                        <p className="subb">Signed in as thanujamudith@gmail.com</p>
                    </a>
                </div>   
            </div>

            <div className="row"> 
				<img  className="img-responsive banner-img" src="/img/header-img.jpg"  alt="Loading..." />
			
		{/*	<Carousel axis="horizontal" showThumbs={false} showArrows={true} >

               {this.__showBanners()}
                
            </Carousel> */}
			
			 
                <div className="col-lg-12 nopadding">
                    <div className="bottom-nav">
                        <div className="col-xs-2 nopadding">
                            <p className="b-txt pd-l-20">
                                <img alt="" src="/img/icons/compass.png" className="icon-img-small-2"/> 

                                Get Direction  </p> 
                        </div>

                        <div className="col-xs-2 nopadding">
                            <p className="b-txt pd-l-20">
                                <img alt="" src="/img/icons/phone-reciver.png" className="icon-img-small-2"/>Call</p> 
                        </div>
                        <div className="col-xs-8 nopadding">

                            <p className="b-txt text-right pd-r-20"> Operating Time : 11:00 AM - 10:30 PM</p> 
                        </div>

                        <div className="clearfix"></div>
                    </div>
                </div>
                <div className="col-xs-12 heading-div ">
                    <div className="col-xs-6 pd-l-20"><h1 className="heading pull-left"> Our Menu</h1></div>
                    <div className="col-xs-6 pd-r-20">
                        <button type="button" className="btn pull-right food-type-btn">Halal</button> 
                        <button type="button" className="btn pull-right food-type-btn">Vegetarian</button>
                    </div>
                </div>

               {this.__ProductListing()}


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
                            <button className="btn active" type="button" id="dine-in" name="dine-in"> <img alt="" src="/img/icons/restaurant.png" className="icon-img-small1"/> &nbsp; Dine in</button>
                            <button className="btn in-active" type="button" id="delivery" name="delivery"> <img alt="" src="/img/icons/del.png" className="icon-img-small1"/> &nbsp; Delivery </button>
                            <button className="btn in-active" type="button" id="takeaway" name="takeaway"> <img alt="" src="/img/icons/takeaway.png" className="icon-img-small1"/> Takeaway </button>
                        </div>
                        <div className="col-xs-12 nopadding">
                            <img alt="" src="/img/modal-window-botom-image.png" className="img-responsive"/>
                        </div>
                    </div>

                </div>
            </div>
        </div>
		
	  </div>
    );
  }
}
export default Home;