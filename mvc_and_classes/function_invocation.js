
/*

## 
# Function Invocation

Like everything else in JS, functions are just objects. However, unlike other
objects, they can be invoked. The context inside the function-- i.e., the value of
this--depends on where and how its invoked.

Apart from using brackets, there are two other ways to invoke a function: apply()
and call(). The difference between them has to do with the arguments you want to
pass to the function.

The apply() function takes two parameters: a context and an array of arguments. If
the context is null, the global context is used. For example:

*/

function.apply(this, [1, 2, 3]);

/*

The call() function has exactly the same behavior, yet it is used differently. The
first argument is the context, while each subsequent argument is delegated to the
invocation. In other words, you use multiple arguments--rather than an array like
with apply()--to pass arguments to the funcction.

*/

function.call(this, 1, 2, 3);

/*

Why would you want to change the context? This is a valid quetion bc other languages
get on fine without allowing explicit context changes. JS uses context changes to
share state, especially during event callbacks.

jQuery takes advantage of apply() and call() throughout its API to change context.
For example, when using event handlers or iterating using each().

*/

$('.clicky').click(function()	{
	// 'this' refers to the element
	$(this).hide();
});

$('p').each(function()	{
	// 'this' refers to the current iteration
	$(this).remove();
});

// To access the original context, a common pattern stores the value of this in a
// local variable. For example:

var clicky = {
	wasClicked: function()	{
		/* ... */
	},
	
	addListeners: function()	{
		var self = this;
		$('.clicky').click(function()	{
			self.wasClicked()
		});
	}
};

clicky.addListeners();

// However, we can use apply to make this much cleaner, wrapping the callback
// within another anonymous function, which preserves the original context:

var proxy = function(func, thisObject)	{
	return(function()	{
		return func.apply(thisObject, arguments);
	});
};

var clicky = {
	wasClicked: function()	{
		/* ... */
	},
	
	addListeners: function()	{
		var self = this;
		$('.clicky').click(proxy(this.wasClicked, this));
	}
};

/*

So, in the above example, we specify the context to be used inside the click
callback; the context jQuery invokes the function in is ignored. In fact, jQuerys
API includes something to do just this, jQuery.proxy();

*/

$('.clicky').click($.proxy(function(){ /* ... */ }, this));

// There are other useful reasons to use apply() and call(), such as delegating.
// We can delegate calls from one func to another, and even alter the passed args:

var app = {
	log: function()	{
		if (typeof console == "undefined") return;
		
		// Turn arguments into a proper array
		var args = jQuery.makeArray(arguments);
		
		// Insert a new argument
		args.unshift("(App)");
		
		// Delegate to the console
		console.log.apply(console, args);
	}
};

/*

Above we are making an array of arguments and then adding our own. Finally, the
call is delegated to console.log(). If you are not familiar with the arguments
variable, it is set by the interpreter and contains an array of arguments with
which the current scope was called. It is not a true array though--for example,
it is not mutable--so we have to convert it to something useable with
jQuery.makeArray().

*/