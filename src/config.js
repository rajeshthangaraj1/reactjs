module.exports = {

/* all path values */
     path: {
       baseUrl: 'http://localhost:3000/',
       apiUrl: 'http://ccpl.ninjaos.com/api/',
	   apiUrlPro: 'http://ccpl.ninjaos.com/ninjapro/',
	   tinThumpUrl: 'http://ccpl.ninjaos.com/timthumb.php?src='
      },


/* All avilablity Id */	
   ids:{ 
       appId: '6C9AEE37-BC05-4FB8-A351-D51458B83F26', /*6C9AEE37-BC05-4FB8-A351-D51458B83F26*/
       deliveryId : '634E6FA8-8DAF-4046-A494-FFC1FCF8BD11',
	   pickupId: '718B1A92-5EBB-4F25-B24D-3067606F67F0',
	   dineinId: 'EF9FB350-4FD4-4894-9381-3E859AB74019',
	   currency: '$',
	   defaultAvilablityId : '634E6FA8-8DAF-4046-A494-FFC1FCF8BD11',
	   fbAppId : '581472588696883'
   },
   
   /* stripe details */
     stripe:{
	   stripeCompany: 'Ninja Pro',
	   stripeImage:"http://blooming-wildwood-72989.herokuapp.com/img/logo.png",
	   stripeKey: 'pk_test_cJ0x2SqHNoPu1Gh0lXE0Fxry',
	   stripeEmail: 'dev@jankosoft.com',
	   stripeReference: 'ninjapro',
	   stripeDesc: 'My Checkout',
	   stripeCurrency: 'SGD'
	 },
	 
	 /*No images */
	 noImages:{
	    product_thumbnail : "/img/no-images/productthump-no-image.jpg",
		product_listing : "/img/no-images/products-no-image.jpg",
	 },
};
