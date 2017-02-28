import React from 'react';
import axios from 'axios';
import { Link } from 'react-router'
var getval = require('./Api');

class Aboutus extends React.Component {
     constructor(props) {
	   super(props);
		     var promise = getval('category');
			 promise.then( res => {
				this.setState({category: res.data.result_set});
			  });
		   this.state = { category: []};
		   const categorySlug = this.props.params.categopryId;
		  const categoryValue = this.props.params.productId;
		  if(categorySlug === "main"){
		    console.log('main');
		  }
		  
		  	  /* API CALL FOR PRODUCT MENU NAVIGATION */
		axios.get('http://ezzysales.com/ecommpanel/api/products/products_all_products?app_id=27D8B4AD-170A-4B8E-9852-E48EC5EB42C8&status=A&availability=634E6FA8-8DAF-4046-A494-FFC1FCF8BD11&categoryid='+categoryValue)
		.then(res => {
		  
	      //this.setState({common: res.data.common});
		  this.setState({category: res.data.result_set});
		    
            
      });
	 }
 
  componentWillReceiveProps(){
    console.log("receive");
  }
  
  shouldComponentUpdate(){
    console.log("receiveupdate");
  }
  
  componentWillUpdate(){
	  console.log("receivewillupdate");
  }
  
  
  render() {

    return (
	   <div>  <div className="container-fluid desktop-container">
            <div id="parentDisable"></div>
            <div className="row">
                <div className="col-xs-12 top-nav inner-top-nav">
                    <div className="col-xs-3 nav-head pd-l-20">
                      <Link to="/">  <img  alt="" src="/img/icons/arrow-right.png" className="icon-img-small-3"/></Link>
                    </div>

                    <div className="col-xs-6 nav-head ">
                        <h1 className="main-title">Pasta</h1>
                    </div>
                    <div className="col-xs-3 nopadding">

                        <p className="b-txt text-right ">
                            <img  alt="" src="/img/icons/search.png" className="icon-img-small-4-inner"/>

                            <img  alt="" src="/img/icons/shopping-cart.png" className="icon-img-small-1-inner"/>
                        </p> 

                    </div>


                </div>
            </div>

            <div className="row">
                <img  alt="" src="/img/pasta-1.jpg"  className="img-responsive"/>
            </div>

 

            <div className="row product-holder">
                <h1 className="inner-title"><b>TOMATO BASED</b></h1>

                <div className="col-lg-5 col-md-5 col-sm-5 col-xs-5 thumb-img-div">
                    <img src="/img/pizza-thmb.jpg" alt="" width="100%"/>
                </div>
				
				
                <div className="col-lg-7 col-md-7 col-sm-7 col-xs-7">
                    <h1 className="head1">Ham & Mushroom <p className=" price pull-right"><strike className="strike-txt">9.90</strike>&nbsp;9.90</p></h1> 
                        <p className="text-justify">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the </p>
                        <p className="tags"><span className="label label-success">CHEF RECOMMENDED</span> &nbsp;  <span className="label label-success text-uppercase">vegetarian</span>&nbsp; <span className="label label-success hidden-xs">CHEF RECOMMENDED</span> &nbsp;  </p>

                        <p className="tags nopadding"><span className="label label-success text-uppercase">vegetarian</span></p>
                </div>
                <div className="clearfix"></div>

            </div>
  
            
            {this.props.Menu}
            <br></br>

        </div> </div>
	 ); 
	 }
 }
 export default Aboutus;