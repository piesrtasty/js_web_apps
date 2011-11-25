
/*

Events revolve around a function called addEventListener(), which takes three
arguments: type (e.g. click), listener (i.e., callback), and useCapture. Using
the first two arguments, we can attach a function to a DOM element, which is
invoked when that particular event, such as click, is triggerent on the element:

*/

var button = document.getElementById("createButton");

button.addEventListener("click", function()	{ /* ... */ }, false);

/*

We can remove the listener uisng removeEventListener(), passing the same arguments
we gave addEventListener(). If the listener function is anonymous and there is no
reference to it, it cannot removed without destroying the elemnent:

*/

var div = document.getElementById("div");

var listener = function(event)	{ /* ... */ };
div.addEventListener("click", listener, false);
div.removeEventListener("click", listener, false);

/*

As its first argument, the listener function is passed an event object, which you
can use to get information about the event, such as timestamp, coordinates, and
target. It also contains various functions to stop the event propagation and prevent
the default action.

As for event types, the supported ones vary from browser to browser, but all modern
browsers have the following:

- click
- dblclick
- mousemove
- mouseover
- mouseout
- focus
- blur
- change (for form inputs)
- submit (for forms)

*/