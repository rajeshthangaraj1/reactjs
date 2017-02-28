import React from 'react';
import { Link } from 'react-router'
var Menu = React.createClass({
  
  render:function() {
	 var categoryListing = this.props.category.map(function(loaddata, index) {
     return(
             <li key={index}><Link to={'/products/sub/'+loaddata.menu_category_id}  >{loaddata.menu_custom_title}</Link></li>
         );
    });
	
    return (
	  <div className="row ">
                <div className="container">
                    <div className="tigger-menu" id="tigger-menu">
                        <div className="dropup" id="dropup">
                            <a className="dropdown-toggle" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <div className="float-btn"></div>
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
							{categoryListing}
                            </ul>
                        </div>
                        <a href="#"></a>
                    </div>
                </div>
      </div> 
    );
  }
});
export default Menu;