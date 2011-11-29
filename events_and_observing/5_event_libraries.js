/*

Event Libraries

In all likelihood you will end up using a JS library for event management; 
otherwise, there are just too many browser inconsistencies. I am going to show you
how to use jQuerys event mangement API.

jQuerys API has a bind() function for adding cross-browser event listeners. Call
this function on jQuery instances, passing in an event name and handler:

*/

jQuery("#element").bind(eventName, handler);

// For example, you can register a click handler on an element like so:

jQuery("#element").bind("click", function(event)	{
	// ...
});

// jQuery has some shortcuts for event types like click, submit, and mouseover. It
// it looks this:

$("#myDiv").click(function()	{
	// ...
});

/*

Its important to note that the element must exist before you start adding events to
it--i.e., you should do so after the page has loaded. All you need to do is listen
for the windows load event, and then start adding listeners:

*/

jQuery(window).bind("load", function()	{
	$("signinForm").submit(checkForm);
});

/*

Howevewr, there is a better event to listen for than the windows load, and that is
DOMContentLoaded. It fires when the DOM is ready, but before the pages images and
stylesheets have downloaded.. This means the event will always fire before users
can interact with the page.

The DOMContentLoaded event is not supported in every browser, so jQuery abstracts it
with a ready() function that has cross-browser support:

*/

jQuery.ready(function($)	{
	$("myForm").bind("submit", function(){ /*...*/});
});

// In fact, you can skip the ready() function and pass the handler straight to the
// jQuery object