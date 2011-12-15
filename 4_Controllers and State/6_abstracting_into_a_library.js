/*

6. Abstracting into a Library

Let us abstract that library out so we can reuse it with other modules and
controllers. We will include the existing load() function and add new ones like
proxy() and include():

*/

(function($, exports)	{
	var mod = function(includes)	{
		if (includes) this.include(includes)
	};
	mod.fn = mod.prototype;
	
	mod.fn.proxy = function(func)	{
		return $.proxy(func, this);
	};
	
	mod.fn.load = function(func)	{
		$(this.proxy(func));
	}
	
	mod.fn.include = function(ob)	{
		$.extend(this, ob);
	};
	
	exports.Controller = mod;
})(jQuery, window);

/*

proxy() ensures that functions are executed in the local context, which is a useful
pattern for event callbacks. The include() function is just a shortcut for adding
properties onto the controller, saving some typing.

We are adding our library to the exports object, exposing it as the global
Controller variable. Inside the module we can instantiate a Controller object using
its constructor function. Let us go through a simple example that toggles an
elements class depending on whether the mouse is over the element:

*/

(function($, Controller)	{
	
	var mod = new Controller;
	
	mod.toggleClass = function(e){
		this.view.toggleClass("over", e.data);
	};
	
	mod.load(function()	{
		this.view = $("#view");
		this.view.mouseover(this.proxy(this.toggleClass), true);
		this.view.mouseout(this.proxy(this.toggleClass), false);
	})
	
})(jquery, Controller);

/*

When the page loads, we are creating a view variavle and attaching some event listeners.
They in turn call toggleClass() when the mouse moves over the element, toggling the elements
class. 

Granted, using context rather than local variavles means there is probably more code to write,
what with all the usage of this. However, the technique gives us much greater scope for reusing code
and including mixins. For example, we could ass a function onto every Controller instance by setting
a property on its prototype:

*/

Controller.fn.unload = function(func)	{
	jQuery(window).bind("unload", this.proxy(func));
};

// Or, we could extend an individual controller by using the include() function we defined earlier, passing it an object

var mod = new Controller;
mod.include(StateMachine);

/*

The StateMachine object, in this example, could be reused over and over again with our other modules, preventing
us from duplicating code and keeping things DRY (dont repeat yourself.)