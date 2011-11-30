
/*

The proxy function described earlier is such a useful pattern that we should add
it to our class lib. We will add a proxy function on both classes and instances,
allowing us to keep the classs scope when handing functions off to events handlers
and the like:

*/

var Class = function(parent)	{
	var klass = function()	{
		this.init.apply(this, arguments)
	};
	klass.prototype.init = function(){};
	klass.fn = klass.prototype;
	
	// Adding a proxy function
	klass.proxy = function(func)	{
		var self = this;
		return(function()	{
			return func.apply(self, arguments);
		});
	}
	
	// Add the function on instances too
	klass.fn.proxy = klass.proxy
	
	return klass;
};

// We can now use the proxy() function to wrap up functions, making sure they are
// invoked in the right scope:

var Button = new Class;

Button.include({
	init: function(element)	{
		this.element = jQuery(element);
		
		// Proxy the click function
		this.element.click(this.proxy(this.click));
	},
	
	click:function(){ /* ... */ }
});

/*

If we did not wrap the click() callback with a proxy, it would be called within the
context of this.element, rather than Button, causing all sorts of problems. A new
spec of JS--ECMAScript, 5th ed. (ES5)--has also added support for controlling
invocation scope with the bind() function. bind() is called on a function, making
sure the function is called in the context of the specified this value.
For example:

*/

Button.include({
	init: function(element)	{
		this.element = jQuery(element);
		
		// Bind the click function
		this.element.click(this.click.bind(this));
	},
	
	click: function(){ /* .... */ }
});

/*

This example is equivalent to our proxy() function, and it makes sure the click()
function is called with the correct context. Older browsers do not support bind()
but, luckily, support can be shimmed easily and implemented manually if needed. A
shim basically implements a compatibility layer on legacy browsers, directly
extending the relevant objects prototype, allowing you to use features of ES5
today without worrying about older browsers. For example, a shim that would support
bind() would look like this:

*/

if ( !Function.prototype.bind )	{
	Function.prototype.bind = function( obj )	{
		var slice = [].slice,
				args = slice.call(arguments, 1),
				self = this,
				nop = function () {},
				bound = function ()	{
					return self.apply( this instanceof nop ? this : ( obj || {} ),
															args.concat( slice.call(arguments) ) );
				};
			
		nop.prototype = self.prototype;
		
		bound.prototype = new nop();
		
		return bound;
	};
}

/*

Functions prototype is only overwritten if the feature does not already exist:
newer browsers will continue to use their native implementations. Shimming is
especially useful for arrays, which have had a bunch of new features added in 
recent JS versions.

*/