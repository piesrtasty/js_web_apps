/*

Controllers are the glue between models and views. They receive events and input from
views, process them (perhaps involving models), and update the views accordingly. The
controller will add event listeners to views when the page loads, such as those detecting
when forms are submitted or buttons are clicked. Then, when the user interacts with your
app, the events trigger actions inside the controllers.

*/

// An simple example using jQuery
(Controller.users = function($)	{
	
	var nameClick = function()	{
		/* ... */
	};
	
	// Attach event listeners on page load
	$(function()	{
		$("#view .name").click(nameClick);
	});
	
})(jQuery);