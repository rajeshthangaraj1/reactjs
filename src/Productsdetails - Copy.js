import React from 'react';
import axios from 'axios';
import { Link } from 'react-router'
 
//var strp = require('strp');
const config = require('./config');
const lang = require('./lang');
const APIURL = config.path.apiUrl;
const APPID = config.ids.appId;

//var Loading = require('react-loading');
class Productsdetails extends React.Component {

	 constructor(props) {
	   super(props);
	  this.state = { details: [],details_common: [],cartCount:1,status:'Loading'}; 
	 }
	 
	 componentWillMount() {
		/* API CALL FOR BANNERS */
			 const productSlug = this.props.params.productSlug;
		axios.get(APIURL+'products/products_list?status=A&app_id='+APPID+"&availability="+config.ids.deliveryId+"&product_slug="+productSlug)
		 .then(res => {
		  if(res.data.status === "ok"){
		   this.setState({status: res.data.status});
		     this.setState({details_common: res.data.common});
		     this.setState({details: res.data.result_set[0]});
		  } 
	  	});  
	 }
	 
/* show product thump image */	 
__productImage(product_thumbnail){
   return  (product_thumbnail ==="" )? "/img/no-images/productthump-no-image.jpg" : this.state.details_common.image_source+"/"+product_thumbnail;
}

/* show modifiers values */
showModifiers(modval){
 
 if( modval ){

   return <div className="container-fluid desktop-container">
            <div className="row ">
                <div className="col-lg-12 col-md-12 col-sm-12 nopadding ">
                    <div className="fancy-collapse-panel">
                        <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">

                            <div className="panel panel-default">
                                <div className="panel-heading" role="tab" id="headingTwo">
                                    <h4 className="panel-title">
                                        <Link className="collapsed" data-toggle="collapse" data-parent="#accordion" to={"#collapseTwo"} aria-expanded="true" aria-controls="collapseTwo">PIZZA SIZE
                                        </Link>
                                    </h4>
                                </div>
                                <div id="collapseTwo" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
                                    <div className="panel-body">
                                        <div className="acrow">
                                            <h1 className="bb-txt2 margin-15">Small 
                                                <div className="checkbox pull-right">
                                                    <label><input type="checkbox" value=""/></label>
                                                </div>
                                            </h1>
                                        </div>
                                        <div >
                                            <h1 className="bb-txt2 margin-15">Regular
                                                <div className="checkbox pull-right">
                                                    <label><input type="checkbox" value=""/></label>
                                                </div>
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
							
							
                            <div className="panel panel-default">
                                <div className="panel-heading" role="tab" id="headingTwo">
                                    <h4 className="panel-title">
                                        <Link className="collapsed" data-toggle="collapse"  data-parent="#accordion" to={"#collapse3"} aria-expanded="false" aria-controls="collapseTwo">PIZZA TYPE
                                        </Link>
                                    </h4>
                                </div>
                                <div id="collapse3" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
                                    <div className="panel-body">
                                        <div className="acrow">
                                            <h1 className="bb-txt2 margin-15">Small 
                                                <div className="checkbox pull-right">
                                                    <label><input type="checkbox" value=""/></label>
                                                </div>
                                            </h1>
                                        </div>
                                        <div>
                                            <h1 className="bb-txt2 margin-15">Regular
                                                <div className="checkbox pull-right">
                                                    <label><input type="checkbox" value=""/></label>
                                                </div>
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                   
                </div>
            </div>
        </div>;
  } 
}

/* increase cart qty */
iQty(){
   this.setState({cartCount: this.state.cartCount + 1 });
}

/* decrease cart qty */
dQty(){
if(this.state.cartCount !== 1 ){
 this.setState({cartCount: this.state.cartCount - 1 });
} 
}

/* add to cart */
addToCart(sku,price,name) {
 
  var productId = this;

   
  
  axios.post(APIURL+"cart/insert", {
    app_id: config.ids.appId,
	product_id : productId,
    reference_id: '12345',
	product_name : 'kids meal',
	product_sku : sku,
	product_qty : 4, 
	availability_id : config.ids.deliveryId,
	product_unit_price : price,
	product_total_price : price
  })   
	 
}
	 
  render() {
 
  if(this.state.status === "Loading"){
  
    return (  <div> {/* <div className="container-fluid desktop-container"> <div className="row no-bar-image"><Loading type='spin' color='#000' />  </div> </div> */} Loading... </div>);
  }else if(this.state.status === "ok") {
    return ( 
	 <div> <div className="container-fluid desktop-container">

            <div className="row no-bar-image">
                <Link to={"/"}><img src="/img/icons/arrow-right.png" className="icon-img-small-3" alt="left-arrow"/></Link>
                <img src={this.__productImage(this.state.details.product_thumbnail)} alt="banner" className="img-responsive"/>
            </div>


            <div className="row ">

                <div className="col-lg-12 col-md-12 col-sm-12 ">
                    <h1 className="head2 ">{this.state.details.product_name} </h1> 
                    <p className="subh" > {this.state.details.product_short_description} </p>


                </div>

            </div>
            <div className="row ">

                <div className="col-lg-12 col-md-12 col-sm-12 ">
                    <div className="" > 
                        <div className="btn-div">
                            <Link  className="btn btn-group-mini"  ><i className="material-icons" onClick={this.dQty.bind(this)}> remove</i></Link> 
                            &nbsp; {this.state.cartCount} &nbsp; 
                            <Link  className="btn btn-group-sm "  > <i className="material-icons" onClick={this.iQty.bind(this)}>add</i></Link>  
                            <div className="clearfix"></div>
                        </div>
                    </div>
                </div>

            </div>
        <br/>
        </div>
        {this.showModifiers()}

        <div className="container-fluid ">
 
            <div className="space-30"></div>
            <div className="row ">
                <Link >
                <button className="col-xs-12 continue-but desktop-container container-fluid bg-red "  onClick={this.addToCart.bind(this.state.details.product_id,this.state.details.product_sku,this.state.details.product_sku,this.state.details.product_price)}>{lang.add_to_cart}( {this.state.cartCount} )
                <p className="bb-txt pull-right no-margin pd-r-25">{config.ids.currency+this.state.details.product_price}</p>
                </button>
                </Link>
            </div>
            <div className="clearfix"></div>
        </div> </div>
	   ); 
	   }
	   else {
	      return ( <div>{lang.no_products_found} </div>);
	    }
	 }
 }  
 
  
 export default Productsdetails;
