
/*

Event Ordering

Before we go any further, it is important to discuss event ordering. If an element
and one of its ancestors have an event handler for the same event type, which one
should fire first when the event is triggered? Well you will not be surprised to
hear that Netscape and Microsoft had different ideas.

Netscape 4 supported event capturing, which triggers event listeners from the
top-most ancestor to the element in question--i.e. from the outside in.

Microsoft endorsed event bubbling, which triggers event listeners from the element,
propagating up through its ancestors--i.e., from the inside out.

Event bubbling makes more sense to me, and it is likely to be the model used in
day-to-day development. The W3C compromised and stipulated support for both event
models in their specification. Events conforming to the W3C model are first
captured until they reach the target element; then they bubble up again.

You can choose the type of event handler you want to register, capturing or
bubbling, which is where the useCapture argument to addEventListener() comes into
the picture. If the last argument to addEventListener() is true, the event handler
is set for the capturing phase; if it is false, the event handler is set for the
bubbling phase:

*/

// Use bubbling by passing false as the last argument
button.addEventListener("click", function()	{ /* ... */ }, false);

/* The vast majority of the time, you will probably be using event bubbling. If in
doubt, pass false as the last argument to addEventListener().