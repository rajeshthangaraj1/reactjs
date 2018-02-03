/* global $, angular, React */
import React from 'react';
import axios from 'axios';
import {  Link  } from 'react-router';
import DocumentMeta from 'react-document-meta';
/*import cookie from 'react-cookie';*/
import './App.css';
/*import getResult from './Api';*/
/*const Loading = require('./loading');*/
const config = require('./config');
const lang = require('./lang');
const APIURL = config.path.apiUrl; 
 
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
 
class Products extends React.Component {
 
  constructor(props) {
  
       super(props);
	   /* Declare state */
	   this.state = { categorylist: [],categoryclass:''};
	   
	   
   }

	 componentWillMount() {
		/* API CALL FOR Category*/
		this.catgory_api();
		var categoryId = this.props.params.categoryId;
			
	 }
  /* catergory list get api*/
   onChange() 
  {
	  var el = document.getElementById("chekcing");	
	  el.click();
	
  }
  catgory_api()
 {
	 axios.get(APIURL+'products/category_list/')
		 .then(res => {
			 if(res.data.status === "ok"){				 
				  this.setState({categorylist: res.data.result_set});
			 }
			 
	  	});
 }


  /* listing navigation  items.. */
  __category_listing(){	
			
			if(this.state.categorylist){ 
			return this.state.categorylist.map((loaddata, index)=>
			 <li key={index}>
				<span className="filter" data-filter={'.'+loaddata.slug} >{loaddata.name}</span>
			 </li>
			);
		}
}
   /* listing navigation  items.. */
  __category__product_list(){	
			
			if(this.state.categorylist){
			return this.state.categorylist.map((loaddata, index)=>
			
			<li className={'portfolio '+loaddata.slug} data-cat={loaddata.slug} key={index}> 
							<div className="top_header">
							<h2>{loaddata.name}</h2>
							<div className="pull-right btn_right">							
							<Link to={"/product/"+loaddata.slug} className="link_btn">View Details</Link>
							</div>
							</div>
							<ul className="products_list">										
							{this.__product_list(loaddata.products)}			
							</ul>
			</li>
			
			
			);
			
		}
}
/* listing navigation  items.. */
  __product_list(productlist){	
			
			return productlist.map((loaddata, index)=> 
			                       <li className="product_detail col-lg-3 col-md-3 col-sm-6" key={index}>			
									<div className="product_main">	
										<figure>
											<a href="#" className="img_cont">
											<img src="images/car_img2.png" alt="" />
											</a>
										</figure>	
										<section>
											<h4><a href="inner.html">{loaddata.product_name}</a></h4>
										<p>{loaddata.product_long_desc}</p>
										<Link to={"/product/"+loaddata.product_slug} className="btn_orange">View Details</Link>
											
										</section>	
										</div>
									</li>	
			);					
}
  render() {
   
    return (

	<div>   	<DocumentMeta  {...meta} />
	<header>
       <div className="header_in">                 
           <div className="header_middle">
              <nav className="navbar navbar-default">
                 <div className="container">          
                     <div className="row">
                        <div className="navbar-header col-xs-5 col-sm-5 col-md-4"> 
                            <a className="navbar-brand logo" href="index.html"><img src="images/logo.png" alt="" /></a> 
                         </div>
                         <div className="hright_sec  col-xs-7 col-sm-7 col-md-8">
                             <div className="htop_right">
                                 <ul className="social_icons">
                                     <li>
                                         <a href="" title="Facebook"> <i className="fa fa-facebook"></i> </a>
                                     </li>
                                     <li>
                                         <a href="" title="Instagram"><i className="fa fa-instagram"></i></a>
                                     </li>
									 <li>
                                         <a href="" title="Twitter"><i className="fa fa-twitter"></i></a>
                                     </li>
                                 </ul>
								 
								 <div className="top_search_form" id="navigation_search">
								<form>
								<input type="text" name="search" placeholder="Search.."/>
								<a href="#"><span className="fa fa-search"></span></a>
								</form></div>
								
								<div id="mySidenav" className="sidenav">
  <a href="#" className="closebtn"><img src="images/close-arrow.png"  alt=""/></a>
  <a href="inner.html">About</a>
  <a href="products.html">Product Details</a>
  <a href="#">Clients</a>
  <a href="#">Contact</a>
</div>
								
	<div className="nav_bar_icon" id="menu_bar_open">

<span>
<strong>Menu</strong><i className="fa fa-bars"></i></span>
							</div>
      </div>  
							
                         </div>
                    </div>
                 </div>
                                                        
              </nav>
           </div>
   </div>
</header>
 <div className="hban_slider hbanner">           
        <div className="ban_slide">    
              <img src="images/banner.jpg" alt=""></img>
              
          </div>
         
                   
 </div>

<div className="container">
<div className="inner-conent">

  <div className="row">
    <div className="col-sm-12">
     <div className="col-sm-8">
	  
	  <div className="det-phone">
	  <h3>Hello World!</h3>
	  <img src="images/tab_img.jpg" ></img>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing eli Lorem ipsum dolor sit amet, consectetur adipisicing eliLorem ipsum dolor sit amet, consectetur adipisicing eliLorem ipsum dolor sit amet, consectetur adipisicing eliLorem ipsum dolor sit amet, consectetur adipisicing eliLorem ipsum dolor sit amet, consectetur adipisicing eliLorem ipsum dolor sit amet, consectetur adipisicing eliLorem ipsum dolor sit amet, consectetur adipisicing eliLorem ipsum dolor sit amet, consectetur adipisicing eliLorem ipsum dolor </p>	
	  <p><a href="inner.html" className="btn_orange ">Read More</a></p>

	  </div>
	  
	 <div className="det-phone">
	  <h3>Hello World!</h3>
	  <img src="images/tab_img.jpg" ></img>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing eli Lorem ipsum dolor sit amet, consectetur adipisicing eliLorem ipsum dolor sit amet, consectetur adipisicing eliLorem ipsum dolor sit amet, consectetur adipisicing eliLorem ipsum dolor sit amet, consectetur adipisicing eliLorem ipsum dolor sit amet, consectetur adipisicing eliLorem ipsum dolor sit amet, consectetur adipisicing eliLorem ipsum dolor sit amet, consectetur adipisicing eliLorem ipsum dolor sit amet, consectetur adipisicing eliLorem ipsum dolor </p>	
	  </div>
	  
	  <div className="det-phone">
	  <h3>Hello World!</h3>
	  <img  src="images/tab_img.jpg" ></img>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing eli Lorem ipsum dolor sit amet, consectetur adipisicing eliLorem ipsum dolor sit amet, consectetur adipisicing eliLorem ipsum dolor sit amet, consectetur adipisicing eliLorem ipsum dolor sit amet, consectetur adipisicing eliLorem ipsum dolor sit amet, consectetur adipisicing eliLorem ipsum dolor sit amet, consectetur adipisicing eliLorem ipsum dolor sit amet, consectetur adipisicing eliLorem ipsum dolor sit amet, consectetur adipisicing eliLorem ipsum dolor </p>	
	  </div>
	  

	

	
	</div>
    <div className="col-sm-4">
     	  <img  src="images/ad_placeholder_vertical.jpg" ></img>

    </div>
  </div>
      </div>

  
  
  
</div>
</div>
  
 
<footer>
		<div className="container">
			<div className="foot-top">
				<div className="quick-link foot-common fl">
					<h5>Support</h5>			
					<ul className="foot-menu">
						<li><a href="#">Customer Service</a></li>
						<li><a href="#">Shipping FAQ</a></li>
						<li><a href="#">Service Centres</a></li>
						<li><a href="#">Warranty</a></li>
						<li><a href="#">Product Authentication</a></li>
					
					</ul>
					
				
					</div>
				<div className="top-location foot-common fl">
				<h5>Shop And Learn</h5>			
				<ul className="foot-menu">
						<li><a href="#">Honeyflix</a></li>
						<li><a href="#">About Products</a></li>
						<li><a href="#">Products Details</a></li>
						<li><a href="#">Honeyflix Cars</a></li>
						<li><a href="#">Honeyflix Power Bank</a></li>

					</ul>
				</div>
				
				<div className="top-location foot-common fl">
				<h5>About Us</h5>			
				<ul className="foot-menu">
						<li><a href="#">Honeyflix</a></li>
						<li><a href="#">Mediakit</a></li>
						<li><a href="#">Culture</a></li>
						<li><a href="#">Privacy Policy</a></li>
	
					</ul>
				</div>
				
				
				<div className="office-hour foot-common fl">
					<h5>Contact Us</h5>			
					<ul className="foot-menu">
						<li><a href="#">Email</a></li>
						<li><a href="#">Careers</a></li>
						<li><a href="#">Contact US</a></li>
					</ul>			
				</div>
					<div className="office-location foot-common fl">
				<p className="phone number">1800 103 0000</p>
				<p className="phone">Services Hours: 22/7 </p>
			<div className="phone chat btn-large">Chat Support</div>

					</div>
					
			</div>
			<div className="foot-middle">
				
				 <ul className="security-part fl">
                     <li className="footer_logo"><span><a href="#">Honey Flix</a></span></li>
					 <li className="footer_list">
					 <ul>
						<li><a href="#">Home</a></li>
						<li><a href="#">Features</a></li>
						<li><a href="#">Reviews</a></li>
						<li><a href="#">Download</a></li>
		
					</ul>
						</li>
						<li className="footer_social">
						 <ul className="foot-social fr">
                           <li><a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
						   <li><a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
						   <li><a href="#"><i className="fa fa-google-plus" aria-hidden="true"></i></a></li>				
						</ul>
						</li>
					</ul>			
					
				<div className="clear"></div>
		
				
				
				<div className="clear"></div>
			</div>
			<div className="foot-bottom">
				<p>Copyright © 2011-2017 Honey Fix Development. </p>
			</div>
		</div>
	</footer>
	</div>
    );
  }
}
export default Products;
