/*

Delegating Events

It may have occurred to you that since events bubble up, we could just add a
listener on a parent element, checking for events on its children. This is
exactly the technique that frameworks like SproutCore use to reduce the number of
event listeners in the application:

*/

// Delegating events on a ul list
list.addEventListener("click", function(e)	{
	if (e.currentTarget.tagName == "li")	{
		/* ... */
		return false;
	}
}, false);

/*

jQuery has a great way of doing this; simply pass the delegate() function a child
selector, event type, and handler. The alternative to this approach would be to add
a click event to every li element. However, by using delegate(), you are reducing
the number of event listeners, improving performance:

*/

// Do not do this! It adds a listener to every 'li' element (expensive)
$("ul li").click(function()	{ /* ... */ });

// This only adds one event listener
$("ul").delegate("li", "click", /* ... */);

/*

Another advantage to event delegation is that any children added dynamically to the
element would still have the event listener. So, in the above example, any li
elements added to the list after the page loaded would still invoke the click
handler.

*/