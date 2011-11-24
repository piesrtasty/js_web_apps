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

/*

Were creating a users Controllers that is namespaced under the Controller variable. Then
were using an anonymous func to encapsulate scope, preventing variable pollution of the 
global scope. When the page loads, were adding a click event listener to a view element.

*/