
/*

Canceling Events

When the event is bubbling up, you can stop its progress with the stopPropagation()
function, located on the event object. Any handlers on ancestor elements will not
be invoked:

*/

button.addEventListener("click", function(e)	{
	e.stopPropagation();
	/* ... */
}, false);

/*

Additionally, some libraries like jQuery support a stopImmediatePropagation()
function, preventing any further handlers from being called at all--even if they
are on the same element.

Browsers also give default actions to events. For example, when you click on a link,
the browsers default action is to load a new page, or when you click on a checkbox,
the browser checks it. This default action happens after all the event propagation
phases and can be canceled during any one of those. You can prevent the default
action with the preventDefault() function on the event object. Alternatively, you
can just return false from the handler:

*/

form.addEventListener("submit", function(e)	{
	/* ... */
	return confirm("Are you super sure?");
}, false);

/*

If the call to confirm() returns false--i.e., the user clicks cancel in the
confirmation dialog--the event callback function will return false, canceling
the event and form submission.

*/