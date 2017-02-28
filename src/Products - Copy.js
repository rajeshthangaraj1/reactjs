import React from 'react';
import axios from 'axios';
import { Link  } from 'react-router'
const config = require('./config');
const APIURL = config.path.apiUrl;
const APPID = config.ids.appId;
import getval from './Api';
import Menu from './Menu';

class Products extends React.Component {
     
	 constructor(props) {
	   super(props);
	   this.loadData();
	  // $('body').addClass('touchMode');
	 }
	 
	 componentWillReceiveProps() {
	   //console.log(this.props.params.categoryId);
	   
	 this.loadData();
	 }
	  
	componentDidMount() {
	   //	console.log(this.props.params.categoryId)
		 
	 this.loadData();
	 }
	 
 
     
	 
	 loadData() {
		 
		
		 
		
		this.state = { category: [], products: [],products_common: [],urlparams:[]};
		
		/* browserHistory.listen( location =>  {
			 
			 
			  this.setState({urlparams: location});
			});  */
					
					//console.log(this.props.params.categoryId);
		/* console.log(this.props.urlparams); */
		 var categoryId = this.props.params.categoryId;
		 var categoryType = this.props.params.categoryType;
		
	    const query_param = (categoryType === "category")? "category_id="+categoryId : "subcategory_id="+categoryId;
	 
	  var promise = getval('product',query_param);
	  promise.then(res => {
		  this.setState({products_common: res.data.common});
		  this.setState({products: res.data.result_set});
		  
	});  
			
		  /* API CALL FOR PRODUCT MENU NAVIGATION */
		axios.get(APIURL+'products/navigation_menu?app_id='+APPID)
		.then(res => {
		  this.setState({common: res.data.common});
		  this.setState({category: res.data.result_set});
	  });
	 }
	 
	 __categoryList(){
	 
	 return this.state.products.map((loaddata, index)=>
	 <div className="row product-holder" key={index}>
                <h1 className="inner-title"><b>{loaddata.pro_subcate_name}</b></h1>
			{this.__productListing(loaddata.product_list[0])}
                

            </div>
			);
	 }
	 
	 
/* product Listing */	 
__productListing(proList){

 return proList.map((product, index)=> <div key={index} > <div className="col-lg-5 col-md-5 col-sm-5 col-xs-5 thumb-img-div" >
                  <Link to={"/product/"+product.product_slug} >  <img src={this.__productImage(product.product_thumbnail)} alt="" width="100%"/> </Link>
                </div>

                <div className="col-lg-7 col-md-7 col-sm-7 col-xs-7">
                    <h1 className="head1"> <Link to={"/product/"+product.product_slug} >{product.product_name}</Link> <p className=" price pull-right"> {/*<strike className="strike-txt">9.90</strike>*/} {" "}{config.ids.currency+product.product_price}</p></h1> 
                        <p className="text-justify">{product.product_short_description} </p>
                        <p className="tags"><span className="label label-success">CHEF RECOMMENDED</span> &nbsp;  <span className="label label-success text-uppercase">vegetarian</span>&nbsp; <span className="label label-success hidden-xs">CHEF RECOMMENDED</span> &nbsp;  </p>
                        <p className="tags nopadding"><span className="label label-success text-uppercase">vegetarian</span></p>
                </div>
                <div className="clearfix"></div>  </div> );
}

__productImage(product_thumbnail,imagePath){
 //return "/img/pizza-thmb.jpg";
   return  (product_thumbnail ==="" )? "/img/no-images/productthump-no-image.jpg" : this.state.products_common.image_source+"/"+product_thumbnail;
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

 
              {/* listing part */}
               {this.__categoryList()}
			{  <Menu category={this.state.category} />   }
            <br></br>

        </div> </div>
	 ); 
	 }
 }
 
  
 export default Products;
 