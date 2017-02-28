/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route,  IndexRoute,hashHistory   } from 'react-router'
import {App} from './App';
import './index.css';
import Home from './Home';
import Aboutus from './Aboutus';
import Privacy from './Privacy';
import Contactus from './Contactus';
import Products from './Products';
import Productsdetails from './Productsdetails';
import Cart from './Cart';
import Login from './Signin';
import Signup from './Signup';
import Forgotpassword from './Forgotpassword';
import Resetpassword from './Resetpassword';
import Myaccount from './Myaccount';
import Addons from './Addons';
import Qrcodescan from './Qrcodescan';
import QrCodeReader from './QrCodeReader';
import Chekout from './Chekout';
import Payment from './Payment';
import Ordersuccess from './Ordersuccess';
import StripeCheckout from './StripeCheckout';
import Orders from './Orders';
import DeliveryDatePicker from './DeliveryDatePicker';
import NotFound from './NotFound';
//import createBrowserHistory from 'history/lib/createBrowserHistory';
//let history = createBrowserHistory();
 ReactDOM.render((
   <Router history={hashHistory } >
     {/*  <Route path="*" component={App}>  </Route> */}
    <Route path="/" component={App}>
         <IndexRoute component={Home} />
         <Route path="/home" component={Home} />
		 <Route path="/about-us" component={Aboutus} />
		 <Route path="/privacy-policy" component={Privacy} />
         <Route path="/contact-us" component={Contactus} />
         <Route path="/products/:categoryType/:categoryId"   component={Products}/>
		 <Route path="/product/:productSlug"   component={Productsdetails}/>
		 <Route path="/cart" component={Cart} />
		 <Route path="/add-on" component={Addons} />
		 <Route path="/sign-in"   component={Login}/>
		 <Route path="/sign-up"   component={Signup}/>
		 <Route path="/forgot-password"   component={Forgotpassword}/>
		 <Route path="/book-a-table" component={Qrcodescan} />
		 <Route path="/qrcode-scan" component={QrCodeReader} />
		 <Route path="/checkout" component={Chekout} />
		  <Route path="/order-success/:orderId"   component={Ordersuccess}/>
		 <Route path="/StripeCheckout" component={StripeCheckout} />
		 <Route path="/reset-password"   component={Resetpassword}/>
		 <Route path="/my-account"   component={Myaccount}/>
		 <Route path="/orders"   component={Orders}/>
		 <Route path="/dashboard/:UserId"   component={Myaccount}/>
		 <Route path="/pay-now" component={Payment} />
		 <Route path="/delivery-date"   component={DeliveryDatePicker}/>
		  <Route path="*" component={NotFound} />
      </Route>
   </Router>
	
), document.getElementById('root'))

 
