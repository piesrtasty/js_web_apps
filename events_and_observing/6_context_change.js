/*

Context Change

One thing that is often confusing about events is how the context changes when the
handler is invoked. When using the browsers native addEventListener(), the context
is changed from the local one to the targeted HTML element:

*/

new function()	{
	this.appName = "wem";
	
	document.body.addEventListener("click", function(e)	{
		// Context has changed, so appName will be undefined
		alert(this.appName);
	}, false);
};

/*

To preserve the original context, wrap the handler in an anonymous function, keeping
a reference to it. We covered this pattern in chapter 1, where we used a proxy
function to maintain the current context. It is such a common pattern that jQuery
includes a proxy() function--just pass in the function and context in which you
want it to be invoked:

*/

$("#signinForm").submit($.proxy(function(){ /* ... */, this}));