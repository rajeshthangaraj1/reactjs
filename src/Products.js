/* eslint-disable */ 
import React from 'react';
import axios from 'axios';
import { Link  } from 'react-router'
import getval from './Api';
//import Menu from './Menu';
import cookie from 'react-cookie';
import DocumentMeta from 'react-document-meta';
const config = require('./config');
const lang = require('./lang');
const APIURL = config.path.apiUrl;
//const APIURLPRO = config.path.apiUrlPro;
const APPID = config.ids.appId;
const Loading = require('./loading');
var strp = require('strp');
var ReactDOMServer = require('react-dom/server');
var HtmlToReactParser = require('html-to-react').Parser;

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
	   this.state = { category: [], products: [],products_common: [],urlparams:[],'status':'Loading',navStatus:'',categoryName:'',categoryImSrc:config.noImages.product_listing};
	 }

	componentWillMount() { 
	  /* API CALL FOR PRODUCT MENU NAVIGATION */
		axios.get(APIURL+'products/navigation_menu?app_id='+APPID+"&availability="+cookie.load('defaultAvilablityId'))
		.then(res => {
		 this.setState({navStatus: res.data.status});
		  this.setState({common: res.data.common});
		  this.setState({category: res.data.result_set});
	  });
	   /* load products list */
	    var categoryId = this.props.params.categoryId;
		 var categoryType = this.props.params.categoryType;
	     this.loadData(categoryType,categoryId);
	 }
	

/* return navigation menu slug */
navLinkType(menu_type) {
 return  (menu_type ==="sub")? "subcategory" : "category";
}

/* this function used reload products */
reLoadProducts(menu_type,CateId,subCateId)
{
   var categoryType = (menu_type ==="sub")? 'subcategory' : 'category';
   var categoryId = (menu_type ==="sub")? subCateId : CateId; 
   this.setState({status: 'Loading'});
   this.loadData(categoryType,categoryId);
}
/* return navigation menu slug */
navSlug(menu_type,CateId,subCateId) {
 return  (menu_type ==="sub")? "/products/subcategory/"+subCateId : "/products/category/"+CateId;
}

/* menu listing li  content */	 
  menuListing(){
  	return this.state.category.map((loaddata, index)=>
			 <li key={index}><Link onClick={this.reLoadProducts.bind(this,loaddata.menu_type,loaddata.menu_category_id,loaddata.pro_subcate_id)}  style={{cursor:'pointer'}} >{strp.stripslashes(loaddata.menu_custom_title)}</Link></li>
			);
  }
  
  /*Load cart image */
  loadCartImage()
  {
   return getval('cartImage');
  }
  
  
 /* this function used to menu listing */
 menuList(){
  if(this.state.navStatus === "ok") {
  return (<div className="row ">
                <div className="container">
                    <div className="tigger-menu" id="tigger-menu">
                        <div className="dropup" id="dropup">
                            <a className="dropdown-toggle" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <div className="float-btn"></div>
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenu2"> 
                                 {this.menuListing()}
                            </ul>
                        </div>
                        <a href="#"></a>
                    </div>
                </div>
            </div>);
  }
 }
 
 /* this function used to load all content */
	 loadData( categoryType,categoryId) {
	  
 
        var query_param = (categoryType === "category")? "category_id="+categoryId : "subcategory_id="+categoryId; 
	   var promise = getval('product',query_param);
	   promise.then(res => {
	       if(res.data.status === "ok"){
		    
			if(res.data.common.type === "Category"){
			
			 this.setState({categoryName: res.data.result_set[0].product_list[0][0].catgory_name});
			 if(res.data.result_set[0].product_list[0][0].catgory_image !==null && res.data.result_set[0].product_list[0][0].catgory_image !==""){
			  this.setState({categoryImSrc : config.path.tinThumpUrl+res.data.common.category_image_source+"/" + res.data.result_set[0].product_list[0][0].catgory_image+"&w=768&h=264&q=80"});
			 }else {
			 this.setState({categoryImSrc:config.noImages.product_listing});
			 }

			}else{
		 console.log(res.data.common.subcategory_image_source +"/"+ res.data.result_set[0].product_list[0][0].subcatgory_image);
		 
		  if(res.data.result_set[0].product_list[0][0].subcatgory_image !== null && res.data.result_set[0].product_list[0][0].subcatgory_image !=="" ){
		   this.setState({categoryImSrc : res.data.common.subcategory_image_source +"/"+ res.data.result_set[0].product_list[0][0].subcatgory_image});
		  }else {
			 this.setState({categoryImSrc:config.noImages.product_listing});
			 }
			 this.setState({categoryName: res.data.result_set[0].product_list[0][0].subcatgory_name});
			}
		   
		     this.setState({products_common: res.data.common});
		     this.setState({products: res.data.result_set});
			 this.setState({status: res.data.status})
		   }
		   else {
		    this.setState({status:'error'})
		   } 
	});  
	 }
	 
/* this function used  menu navigation  listing */	 
	 __categoryList(){
	 return this.state.products.map((loaddata, index)=>
	 <div className="row product-holder" key={index}>
                <h1 className="inner-title"><b>{strp.stripslashes(loaddata.pro_subcate_name)}</b></h1>
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
                    <h1 className="head1"> <Link to={"/product/"+product.product_slug} >{strp.stripslashes(strp.ucfirst(product.product_name))}</Link> <p className=" price pull-right"> {/*<strike className="strike-txt">9.90</strike>*/} {" "}{product.product_price}</p></h1> 
                        <p className="text-justify">{strp.stripslashes(product.product_short_description)} </p>
                         {this.showTags(product.indicators)}
                </div>
                <div className="clearfix"></div>  </div> );
}
/* this fucntion used to load  product tags  */
showTags(tags)
{
//console.log(tags);
 if( tags !== null){
        var splited = tags.split(",");
		var tagsText = "";
	
		 for (var i = 0, length = splited.length ; i < length; i++) {
		    tagsText+="<span className='label label-success text-uppercase'>"+splited[i]+"</span>";
		   //tagsText+={"<p>"};
		 }
		 tagsText = '<p className="tags">' + tagsText + '</p>';
var htmlToReactParser = new HtmlToReactParser();
var reactElement = htmlToReactParser.parse(tagsText );
//var reactHtml = ReactDOMServer.renderToStaticMarkup(reactElement);
 
return reactElement; //assert.equal(reactHtml, htmlInput);
		 
	 //return tagsText;
 }
}

/*this function used to shoe product thump image */
__productImage(product_thumbnail,imagePath){
   return  (product_thumbnail === "" )? config.noImages.product_thumbnail : config.path.tinThumpUrl+this.state.products_common.image_source+"/"+product_thumbnail+"&w=288&h=144&q=80";
}
 
  render() {
  if(this.state.status === "Loading"){
  return(<div> 
            <DocumentMeta  {...meta} />
	        <Loading/>
		</div>);
  }
  else if(this.state.status === 'ok') { 
    return (
	
	   <div> 
  <DocumentMeta  {...meta} />
	   <div className="container-fluid desktop-container">
            <div id="parentDisable"></div>
             <div className="row">
                <div className="col-xs-12 top-nav inner-top-nav">
                    <div className="col-xs-3 nav-head pd-l-20"> <Link to={"/"}><img src="/img/icons/arrow-right.png" className="icon-img-small-3" alt="left-arrow"/></Link>
                    </div>

                    <div className="col-xs-6 nav-head ">
                        <h1 className="main-title">{strp.stripslashes(this.state.categoryName)}</h1>
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

            <div className="row">
                <img  alt="" src={this.state.categoryImSrc}  className="img-responsive"/>
            </div>

 
              {/* listing part */}
               {this.__categoryList()}
		
		        {this.menuList()}
			
			
			
			
            <br></br>

        </div> </div>
	 ); 
	 
	 }else {
	 
	     return (
	   <div>  
	     <DocumentMeta  {...meta} />
	   <div className="container-fluid desktop-container">
            <div id="parentDisable"></div>
            <div className="row">
                <div className="col-xs-12 top-nav inner-top-nav">
                    <div className="col-xs-3 nav-head pd-l-20">
                      <Link to="/">  <img  alt="" src="/img/icons/arrow-right.png" className="icon-img-small-3"/></Link>
                    </div>

                    <div className="col-xs-6 nav-head ">
                        <h1 className="main-title">{lang.no_products_found} </h1>
                    </div>
                   {/* <div className="col-xs-3 nopadding">

                        <p className="b-txt text-right ">
                            <img  alt="" src="/img/icons/search.png" className="icon-img-small-4-inner"/>

                            <img  alt="" src="/img/icons/shopping-cart.png" className="icon-img-small-1-inner"/>
                        </p> 

                    </div> */}


                </div>
            </div>

       
 
              {/* listing part */}
                {this.menuList()}
		 
            <br></br>

        </div> </div>);
	 }
	 }
 }
 
  
 export default Products;
 