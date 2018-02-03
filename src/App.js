import React from 'react';
/* var Loader = require('react-loader'); */

class App extends React.Component {
 
  render() {
    return (
	   <div> {this.props.children}  </div>
	 ); 
	 }
}
    
export default App;