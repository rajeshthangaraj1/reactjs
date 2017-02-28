import React from 'react'
import StripeCheckout from 'react-stripe-checkout';

export default class TakeMoney extends React.Component {
	
  
  onToken = (token) => {
	 
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });
  }

  // ...

  render() {
    return (
      // ...
     <StripeCheckout
        token={this.onToken}
  stripeKey="pk_test_cJ0x2SqHNoPu1Gh0lXE0Fxry"
   amount={400}
  currency="SGD"
  email="info@vidhub.co"
  image="https://www.vidhub.co/assets/logos/vidhub-icon-2e5c629f64ced5598a56387d4e3d0c7c.png"
  >  
</StripeCheckout>
    )
  }
}