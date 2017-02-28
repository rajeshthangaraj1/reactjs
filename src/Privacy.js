import React from 'react'; 
import { Link } from 'react-router' 
import DocumentMeta from 'react-document-meta'
const lang = require('./lang');

/* Load meta tags */
  const meta = {
      title: lang.privacy_meta_title + lang.site_title_with_separator,
      description: lang.privacy_meta_title,
      meta: {
        name: {
          keywords: lang.privacy_meta_title
        }
      }
    };
	
class Privacy extends React.Component {
     
  render() {

    return (
	   <div className="container-fluid desktop-container">
	   <DocumentMeta  {...meta} />
            <div className="row">
                <div className="col-xs-12 main-title-bar">
                    <Link to={"/"}> <img src="/img/left-arrow.png" className="pull-left icon-img-small" alt="left-arrow" /> </Link>
                    <h3 className="top-title main-title padding-right-20 text-uppercase">Privacy Policy</h3>
                </div>
            </div>
            <div className="row"><div className="space-10 bg-gray"></div></div>
            <div className="white-outer center-block">
                <div className="col-xs-10 div-center">
                    <div className="space-20"></div>
                    <div className="space-5"></div>
                    <p className="text-left font-bold font-size-18">Welcome to the NinjaOS Privacy Policy</p><br/>
              
						To help f&b outlets save money by optimising processes, manpower and operation and increase sales by enabling business capability to accept orders online.
						<br/><br/><br/>
						 <p className="text-left font-bold font-size-18">Privacy Policy</p><br/>

						We believe restaurants excel in providing great food and awesome customer service. They are simply great offline at their retail store.
						<br/><br/>
						Customers on the other hand have evolved and are discovering F&B outlets on search results instead of walking around, they want it delivered quick, they want to arrive for that pickup just on time, order and pay with no waiting time and be notified on promotions via email instead of flyers. We can simply put, as they are always online.
						<br/><br/>
						NinjaOS was made to bridge this gap. Making it possible for F&B outlets to get their brand and food online and allow customers to take action and place orders. Making it possible for F&B outlets to get customer and business insights to further optimise and think about promotions and marketing. Keeping F&B outlets ahead in a competive landscape and yet allowing them to do what they do best.
						<br/>
                    
                    <div className="space-20"></div>
                </div>
                <div className="clearfix"></div>

            </div>
            <div className="space-30"></div>
            <div className="space-30"></div>
            <div className="space-10"></div>
            <div className="space-30"></div>
            <div className="space-30"></div>
            <div className="space-30"></div>
   
        </div>
	 ); 
	 }
 }
 export default Privacy;
