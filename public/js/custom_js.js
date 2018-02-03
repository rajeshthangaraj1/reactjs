/* Sticky header start */
$(document).ready(function() {

    if( $(window).scrollTop() > 0 ){

    $('header').addClass('sticky');    

    } else if ($(window).scrollTop() == 0){

    $('header').removeClass('sticky');    

    }
});

$(window).scroll(function () {		

    if( $(window).scrollTop() > 0 ){

    $('header').addClass('sticky');    

    } else if ($(window).scrollTop() == 0){

    $('header').removeClass('sticky');    

    }       

});

/* Sticky header end */

/* Visibility element in window start */
jQuery.fn.isOnScreen = function(){    
    var win = jQuery(window);    
    var viewport = {
        top : win.scrollTop(),
        left : win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();    
    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();   
    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));    
};
/* Window scroll function start */
jQuery( window ).scroll(function() {
    /* Visibility element active */
   jQuery('.toanimate').each(function(){
       if(jQuery(this).isOnScreen()){
            jQuery(this).addClass('cus_animate');
        }
   });
});
/* Window scroll function end*/
/* Document ready function start */
jQuery( document ).ready(function() {
    /* Visibility element active */
   jQuery('.toanimate').each(function(){
       if(jQuery(this).isOnScreen()){
            jQuery(this).addClass('cus_animate');
        }
   });
});
/* Document ready function end*/
/* Visibility element in window end */

/* Mobile menu start */
$(document).ready(function() {
    //$('body').append('<div class="mmenu_after"></div>');
    $('#mmenu_toggle').click( function(){
        $('body').toggleClass('push_left');
        $('.mmenu').toggleClass('active');          
    });
    $('.mmenu_after').click(function() {
        if($('body').hasClass('push_left'))
        { $('#mmenu_toggle').trigger("click"); }      
    });
	
	$(".submit_btn").after('');
});
/* Mobile menu end */

/* slider start */
$(document).ready(function() {   
    /* Banner slider */
	   $('.bxslider').bxSlider({
        mode: 'horizontal',
          captions: true,
        auto: true,
        pause: 4000
      });

});
/* slider end */

/* soption drop down start */
$(document).ready(function() {
     $('.soption_dd').click(function(e){
         e.preventDefault();         
        $('.soption_ddown').slideToggle();
     });
});
/* soption drop down end */

/* Choosen select start 
$(document).ready(function() {
    $('select').chosen({
      "disable_search": true
    });
}); */

/*
$(document).ready(function() {
$('#menu_bar_open').click(function(){
$('#responsive_navigation').toggleClass('visible');
});

$('#fipersonal_responsive_close').click(function(s){
$('#responsive_navigation').toggleClass('visible');

});
}); */

$(document).ready(function(){

	$('#navigation_search a').click(function()
	{
	
		var input=$(this).parent().find('input');
		if(input.css('visibility')=='hidden'){
		input.css({width:'250px',visibility:'visible'});
	}
	else
		{input.css({width:'0',visibility:'hidden'});
		}
return false;
});
});


$('#navigation_search').each(function(){

var $block=$(this);$(this).find('a').click(function(){

var input=$(this).parent().find('input');if(input.css('visibility')=='hidden'){

input.css({width:'250px',visibility:'visible'});
    $('#navigation_search').addClass('search_class');  

}

else{input.css({width:'0',visibility:'hidden'});

}
return false;});

});

$(function () {
		var filterList = {		
			init: function () {
				$('#portfoliolist').mixItUp({
  				selectors: {
    			  target: '.portfolio',
    			  filter: '.filter'	
    		  },
    		  load: {
      		  filter: '.all'  
      		}     
				});								
			
			}
		};

		filterList.init();	
	});	
/* */
function openNav() {
	console.log('sdsdf');
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

