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
 
class Home extends React.Component {
 
  constructor(props) {
  
 
       super(props);
	   /* Declare state */
	   this.state = { categorylist: [],categoryclass:''};
	   
	   
   }

	 componentWillMount() {
		/* API CALL FOR Category*/
		this.catgory_api();
		
		
		this.handleChange = this.handleChange.bind(this);
			
			
	 }
	  componentDidMount() {
		  alert(document.getElementById("filters"));
		  var section = document.getElementById("category-listing");
		  console.log(section);
		  console.log(section.click());
	  }
  /* catergory list get api*/
   handleChange() 
  {
	  alert('1');
	  var el = document.getElementById("chekcing");	
	  el.click();
	
  }
  
  handleClicks(){
	this.setState({categorylist: 'all'});
	alert('ye');
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
				<span className="filter" onChange={this.handleChange} data-filter={'.'+loaddata.slug} >{loaddata.name}</span>
			 </li>
			);
		}
}
   /* listing navigation  items.. */
  __category__product_list(){	
			
			if(this.state.categorylist){
			return this.state.categorylist.map((loaddata, index)=>
			
			<li className={'portfolio all '+loaddata.slug} data-cat={loaddata.slug} key={index}> 
							<div className="top_header">
							<h2>{loaddata.name}</h2>
							<div className="pull-right btn_right">							
							<Link to={"/products/"+loaddata.slug} className="link_btn">View Details</Link>
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
 <div className="main_slider">
	  <ul className="bxslider" >
              <li className="content_slider_slide">
                <div className="featured_img">
                  <img src="images/banner.jpg"  alt=""/>
                </div>
                <div className="featured_img_overlay">
                  <div className="slide_desktop slide_tablet slide_mobile">
                    <table width="100%">
                      <tbody>
                        <tr>
                          <td>
                          
						    <h2>Welcome To Honey flix </h2>
				  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
				  Lorem Ipsum has been. </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </li>
              <li className="content_slider_slide">
                <div className="featured_img">
                  <img src="images/banner.jpg"  alt=""/>
				                 </div>
                <div className="featured_img_overlay">
                  <div className="slide_desktop slide_tablet slide_mobile">
                    <table width="100%">
                      <tbody>
                        <tr>
                          <td>

						    <h2>Welcome To Honey flix </h2>
				  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
				  Lorem Ipsum has been. </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </li>
            </ul>
</div>

 
<div className="products_home_main">
<div className="main_filters">
<div className="container">
 <ul id="filters" className="clearfix portfolio-sorting list-inline ">
			<li id="category-listings" onClick={this.handleClicks} ><span id="category-listing" onClick={this.handleClicks} className="filter active category-listing" data-filter=".all">ALL</span></li>
			{this.__category_listing()}
		</ul>
</div>
</div>
		
<div className="container">
	  <div className="row">
<div className="prdouct_wrapper_main">			
			<ul className="portfolio-items list-unstyled"  id="portfoliolist">
			{this.__category__product_list()}					   
			</ul>
		</div>
		</div>
  </div>
</div>


<div className="subscribe_section">
<div className="container">
<h3>Subscribe our newsletter to get the latest trends &amp; news</h3>
<form>
<input type="text" className="btn" placeholder="Name"/> 
<input type="email" className="btn" placeholder="Email"/> 
<button type="submit"  className="btn_orange  newsletter_submit btn submit_btn" value="Submit">Subscribe</button>
</form>
	</div>   
</div>
<div className="our_features">
  <div className="container">
    <ul className="our_features_list">
	  <li>
		 <img src="images/alarm_icon.png"  alt=""/>
<h4><a href="#">Hassle-free replacement</a></h4>
<p>It is a long established fact that a reader will be distracted by the readable content of a page when 
looking at its layout.</p>
 
	</li>
	 <li> 
	  <img src="images/secure.png"  alt=""/>
<h4><a href="#">100% Secure Payments</a> </h4>
<p>It is a long established fact that a reader will be distracted by the readable content of a page
 when looking at its layout.</p>
	 </li>
	  <li> 
	  <img src="images/vast.png" alt=""/>
<h4><a href="#">Vast Service Network</a></h4>
<p>It is a long established fact that a reader will be distracted by the readable 
content of a page when looking at its layout.
 </p>
	 </li>
	</ul>
	
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
export default Home;
