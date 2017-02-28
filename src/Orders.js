import React from 'react'; 
import { Link, hashHistory} from 'react-router' 
import cookie from 'react-cookie';
import axios from 'axios'; 
import DocumentMeta from 'react-document-meta';
import getResult from './Api';
const config = require('./config');
const lang = require('./lang');
const Loading = require('./loading');
const APIURL = config.path.apiUrl;
const APIURLPRO = config.path.apiUrlPro
const APPID = config.ids.appId;

/* Load meta tags */
const meta = {
  title: lang.orders_meta_title,
  description: lang.orders_meta_title,
  meta: {
	name: {
	  keywords: lang.orders_meta_title
	}
  }
};

class Orders extends React.Component {
	
	constructor(props) {
	   super(props);
	   this.state = { orders: [] , pastorders: [],orderscount:0,pastorderscount:0 };
	   
	    /* check Authentication */
	    if(getResult('Auth') === false ){
		hashHistory.push("/sign-in");
		}
	 }
	 
	 componentWillMount() {  
		this.setState({status: "Loading"});
		/* API CALL FOR CUSTOMER DETAIL cookie.load('UserId')*/
		axios.get(APIURLPRO+'reports/order_history?app_id='+APPID+"&customer_id="+cookie.load('UserId'))
		 .then(res => {
		  if(res.data.status === "ok"){
			  this.setState({orders:res.data.result_set,orderscount:1});  
			  
		  } else { 
			  this.setState({orderscount:1});
		  }
		}); 
		axios.get(APIURL+'reports/order_history?app_id='+APPID+"&customer_id="+cookie.load('UserId'))
		 .then(res => {
		  if(res.data.status === "ok"){ 
			  this.setState({pastorders:res.data.result_set,pastorderscount:1});
		  } else { 
			  this.setState({pastorderscount:1});
		  }
		  
		});
	 } 
	 componentDidMount() {  
		this.setState({status: "ok"});
	 }
	 __ordersList(orders,paramStr,pmCount){
		 if(pmCount !== 0){
		 if( orders.length === 0 ){
				return <div className="col-lg-12 calender-area"><div className="col-xs-12 calender-area-sub-2"><h1 className="sub-heading" style={{textAlign: 'center'}}>No Order found.</h1></div><div className="space-30"></div></div>
			} else {
				var htmlStr = orders.map(
				function(order, index) { 
				if(index === 0){
				  return <div className="topp"  key={index}>
					<img src="/img/orders.jpg" className="img-responsive" alt=""/>       
					<div className="col-xs-12 padd1 main-outer2 bg-white">
						<div className="col-xs-12 price-list">
							<div className="row">
								<div className="col-sm-3 ">
									<a href="#" className="btn btn-raised my2-btn btn-success">{order.order_availability_name}</a>
								</div>
								<div className="col-sm-7">
									<p className="order-date">{order.order_date}</p> 
								</div>
								<div className="col-sm-2">
									<p className="order-date">VIEW MENU</p> 
								</div>
								<div className="clearfix"></div>
								<div className="col-xs-12"><hr/></div> 
							</div>
							<p className="text-left span-txt1"><b>{order.outlet_name}</b> </p>
							{this.__orderItemsList(order.items)} 
							<div className="clearfix"></div>
							<hr/>
							<p className="text-left span-txt1"><b>Total : {order.order_sub_total}$</b></p>
							<div className="row tab">
								<div className="col-sm-3">
									<a href="#" data-toggle="modal" data-target={"#"+paramStr+"DeliverySucess"+index}><p className="order-date">VIEW RECEIPT</p></a>
								</div>
								<div className="col-sm-9 tabs">
									<div className="btn-group btn-group-justified btn-group-raised tab-group">
										<a href="#" className="btn "> 
											<span className="span-txt22">{order.status_name}</span>
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
					
					<div className="modal" id={paramStr+"DeliverySucess"+index}>
				<div className="modal-dialog PopupWidth2">
				<div className="modal-content ">
					<div className="modal-header">
						<button type="button" className="close" data-dismiss="modal" aria-hidden="true">
							<img src="/img/icons/modal-close.png" className="img-responsive" alt="close" />
						</button>
						<div className="center-block">
							<h4 className="modal-title"> Order Receipt</h4>
							<p className="span-size">Order No - {order.order_id}</p>
							<hr width="80%"/>
							<div className="clearfix"></div>
						</div>
					</div>
					<div className="modal-body text-center">
						<div>
							<div className="order-r">
								<p className="span-txt1">{order.outlet_name}</p>
								<br/>
								<span className="span-size2">{order.order_availability_name} - {order.order_date}</span>
							</div>
							<div className="row">
								{this.__ordersubItemsList(order.items)} 
								<div className="col-xs-12"><hr/></div>
								<div className="col-xs-8 ">
									<p className="span-tot text-left">Total</p>
								</div>
								<div className="col-xs-4">
									<p className="span-tot">{order.order_sub_total}$</p>
								</div>
							</div>
							<div className="modal-footer">
								<br/><br/>
							</div>
						</div>
					</div>
				</div>
			</div> 
		</div>
				</div>
				;        
        } else {
          return  <div className="order-b"  key={index}>
					<img src="/img/orders.jpg" className="img-responsive" alt=""/>       
					<div className="col-xs-12  main-outer2 bg-white">
						<div className="col-xs-12  padd1 price-list">
							<div className="row">
								<div className="col-sm-3">
									<a href="#" className="btn btn-raised my2-btn btn-success">{order.order_availability_name}</a>
								</div>
								<div className="col-sm-7">
									<p className="order-date">{order.order_date}</p> 
								</div>
								<div className="col-sm-2">
									<p className="order-date">VIEW MENU</p> 
								</div>
								<div className="clearfix"></div>
								<div className="col-xs-12"><hr/></div> 
							</div>
							<p className="text-left span-txt1"><b>{order.outlet_name}</b></p>
							{this.__orderItemsList(order.items)}
							<div className="clearfix"></div>
							<hr/>
							<p className="text-left span-txt1"><b>Total : {order.order_sub_total}$</b></p>
							<div className="row tab">
								<div className="col-sm-3">
									<a href="#" data-toggle="modal" data-target={"#DeliverySucess"+index}><p className="order-date">VIEW RECEIPT</p></a>
								</div>
								<div className="col-sm-9 tabs">
									<div className="btn-group btn-group-justified btn-group-raised tab-group">
										<a href="#" className="btn"> 
											<span className="span-txt22">{order.status_name}</span>
										</a> 
									</div>
								</div>
							</div>
						</div>
					</div>
					
					<div className="modal" id={"DeliverySucess"+index}>
				<div className="modal-dialog PopupWidth2">
				<div className="modal-content ">
					<div className="modal-header">
						<button type="button" className="close" data-dismiss="modal" aria-hidden="true">
							<img src="/img/icons/modal-close.png" className="img-responsive" alt="close" />
						</button>
						<div className="center-block">
							<h4 className="modal-title"> Order Receipt</h4>
							<p className="span-size">Order No - {order.order_id}</p>
							<hr width="80%"/>
							<div className="clearfix"></div>
						</div>
					</div>
					<div className="modal-body text-center">
						<div>
							<div className="order-r">
								<p className="span-txt1">{order.outlet_name}</p>
								<br/>
								<span className="span-size2">{order.order_availability_name} - {order.order_date}</span>
							</div>
							<div className="row">
								{this.__ordersubItemsList(order.items)} 
								<div className="col-xs-12"><hr/></div>
								<div className="col-xs-8 ">
									<p className="span-tot text-left">Total</p>
								</div>
								<div className="col-xs-4">
									<p className="span-tot">{order.order_sub_total}$</p>
								</div>
							</div>
							<div className="modal-footer">
								<br/><br/>
							</div>
						</div>
					</div>
				</div>
			</div> 
		</div>
				</div>;
        }  

		}.bind(this));
		return htmlStr;
	}
	 }
 }
	 
	 
	 
	 __orderItemsList(orderItems){ 
		 return orderItems.map((orderItem, index)=> <p key={index} className="text-left spantxt3"><b>{orderItem.item_qty}x </b>{orderItem.item_name}</p>);
		}
		__ordersubItemsList(orderItems){ 
		 return orderItems.map((orderItem, index)=> <div  key={index} className="col-xs-12"><div className="col-xs-8">
									<p className="span-txt1 text-left ">{orderItem.item_qty} <small>x</small> &nbsp; {orderItem.item_name}</p>
								</div>
								<div className="col-xs-4">
									<p className="span-txt1">{orderItem.item_total_amount}$</p>
								</div></div>);
		}
		
		
	  
  render() {
	  
	if(this.state.status === "Loading"){
	
	 return (
			<div>
			<DocumentMeta  {...meta} />
			<Loading/>
			</div>
			);
	} else { 
	  
    return (
			<div>
			<DocumentMeta  {...meta} />
			<div className="container-fluid desktop-container">
			<div className="row">
			  <div className="col-xs-12 top-nav inner-top-nav">
				<div className="col-xs-3 nav-head pd-l-20"> <Link to={"/my-account"}><img src="/img/icons/arrow-right.png" alt="left-arrow" className="icon-img-small-3" /></Link>
				</div>
				<div className="col-xs-6 nav-head ">
				  <h1 className="main-title">MY ORDERS</h1>
				</div>
				<div className="col-xs-3 nopadding">
				  <p className="b-txt text-right ">
					<Link to={"/cart"} > <img src={getResult('cartImage')}className="icon-img-small-1-inner" alt="shopping-cart" />  </Link>
				  </p> 
				</div>
			  </div>
			</div>
			<div className="space-10"></div> 
			<div className="row">
				<div className="line">
					<div className="item-add5">
						<ul className="orders-tabs ">
							<li className="active">
								<div className="col-xs-6 order-m-l">
									<a href="#current_orders" data-toggle="tab">
										<span className="text-1-b">CURRENT ORDERS</span>
									</a>
								</div>
							</li>
							<li>
								<div className="col-xs-6 order-m-r">
									<a href="#past_orders" data-toggle="tab">
										<span className="text-1-b">PAST ORDERS</span>
									</a>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<br/>
			<div className="tab-content clearfix">
				<div className="tab-pane active" id="current_orders">
					<div className="row  map-loc" > 
						{this.__ordersList(this.state.orders,'current',this.state.orderscount)} 
					</div>
				</div>

				<div className="tab-pane" id="past_orders">
					<div className="row map-loc" > 
						{this.__ordersList(this.state.pastorders,'past',this.state.pastorderscount)} 
					</div>
				</div>
				<div className="space-50"></div>
				
			</div>
		</div></div>
			 ); 
		 }
	 }
 }
 export default Orders;
