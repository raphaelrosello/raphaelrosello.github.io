(function($){
  $(function(){

    $('.button-collapse').sideNav();
	$('.scrollspy').scrollSpy();
	$('.button-collapse').sideNav({menuWidth: 240, activationWidth: 70});
	$('.parallax').parallax();
  console.log("initialized");
	}); // end of document ready
})(jQuery); // end of jQuery name space
