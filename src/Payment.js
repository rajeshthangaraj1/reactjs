import React from 'react';
//import {  Link  } from 'react-router';
import cookie from 'react-cookie';


class Payment extends React.Component {

   constructor(props) {
	   super(props);
	   if(cookie.load('orderPaymentMode')!=="STRIPE"){
	    window.location="/";
	   }
	 }
	 
	 
/* check stripr payment */	 
placeOrder()
{
  console.log('test entr');
}

render() { 
  
     return ( <div>  
	 
	  <div className="container-fluid desktop-container">
            <div className="row">
                <div className="col-xs-12 main-title-bar"> <a href="11.php"><img src="/img/left-arrow.png" className="icon-img-small  pull-left" alt="left-arrow"/></a>
                    <h3 className="top-title main-title">PAYMENT</h3>
                </div>
            </div>
            <div className="row  ">
                <div className="payment-meth">
                <div className=" ">
                    <div className="space-30"></div>
                    <img src="/img/emony.png" className="img-responsive" alt="payment-methods"/>
                </div>
                </div>
                <div className="space-10"></div>

            </div>

            <div className="row ">
                <form action="#" id="payment-info">




                    <div className="payment-form">


                        <div className="">


                            <div className="form-group label-floating is-empty card-no">
                                <div className="input-group">
                                    <label className="control-label" htmlFor="name">Name</label>
                                    <input type="text" id="name" className="form-control"/>
                                </div>
                            </div>


                            <div className="form-group label-floating is-empty card-no">
                                <div className="input-group">
                                    <label className="control-label" htmlFor="card">Card Number</label>
                                    <input type="text" id="card" className="form-control"/>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-6 ">

                                    <div className="form-group">
                                        <div className="input-group font_bold">
                                            <label className="black" >Expiration Date</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-3 col-xs-6 card-ex  ">

                                    <div className="form-group label-floating is-empty card-month card-no">
                                        <div className="input-group">
                                            <label className="control-label" htmlFor="card">MM</label>
                                            <input type="text" id="card" className="form-control"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3 col-xs-6 ">
                                    <div className="form-group label-floating is-empty card-year card-no">
                                        <div className="input-group">
                                            <label className="control-label" htmlFor="card">YY</label>
                                            <input type="text" id="card" className="form-control"/>
                                        </div>
                                    </div>

                                </div>
                            </div>


                        </div>


                        <div className="form-group label-floating is-empty card-no">
                            <div className="input-group">
                                <label className="control-label" htmlFor="card">CVV</label>
                                <input type="text" id="card" className="form-control"/>
                            </div>
                        </div>
                    </div>



                </form>

            </div>

            <div className="clearfix"></div>

            <div className="space-50 hidden-xs"></div>
            <div className="space-50 "></div>

            <div className="row">
                 
                    <button className="col-lg-12 continue-but desktop-container container-fluid bg-red" onClick={this.placeOrder.bind(this)}>PLACE ORDER</button>
                           </div>
        </div>
	 </div> );

   } 
}
export default Payment;
