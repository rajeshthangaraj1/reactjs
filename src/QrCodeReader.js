import React from 'react'
import QrReader from 'react-qr-reader'
import {  Link } from 'react-router';
class QrCodeReader extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      delay: 100,
      result: 'No result',
    } 
    this.handleScan = this.handleScan.bind(this)
  }
  handleScan(data){
    this.setState({
      result: data,
    })
  }
  handleError(err){
    console.error(err)
  }
  render(){
    const previewStyle = {
      height: 240,
      width: 320,
    }
 
    return(
		<div className="container-fluid desktop-container" id="qr-scan">
		<div className="row">
			<div className="col-xs-12 main-title-bar">
			 <Link to="/book-a-table"><img src="/img/left-arrow.png" className="pull-left icon-img-small" alt="left-arrow"/></Link>
				<h3 className="top-title main-title padding-right-20">SCAN YOUR QR CODE</h3>
			</div>
		</div>
		<div className="row"><div className="space-10 bg-gray"></div></div>
		<QrReader
		  delay={this.state.delay}
		  previewStyle={previewStyle}
		  onError={this.handleError}
		  onScan={this.handleScan}
		  legacyMode={true}
		  />
		<p>{this.state.result}</p>
		</div>
    )
  }
}
export default QrCodeReader;
