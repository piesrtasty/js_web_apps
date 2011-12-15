/*

Adding a Bit of Context

Using a local context is a useful way of structuring modules, especially when it
comes to registering callbacks to events. As it stands, the context inside our
module is global--this is equal to window:

*/

(function()	{
	assertEqual( this, window );
})();

// If we want to scope the context, we need to start adding functions onto an
// object. For example:

(function()	{
	var mod = {};
	mod.contextFunction = function()	{
		assertEqual( this, mod );
	};
	
	mod.contextFunction();
})();

/*

The context inside contextFunction() is now local to our mod object. We can start
using this without worrying about creating global variables. To give you a better
indication of how it would be used in practice, let us flesh out that example:

*/

(function($)	{
	var mod = {};
	
	mod.load = function(func)	{
		$($.proxy(func, this));
	};
	
	mod.load(function()	{
		this.view = $("#view");
	});
	
	mod.assetsClick = function(e)	{
		// Process click
	};
	
	mod.load(function()	{
		this.view.find(".assets").click(
			$.proxy(this.assetsClick, this)
		);
	});
	
})(jQuery);

/*

We are creating a load() function that takes a callback, executing it when the page
has loaded. Notice that we are using jQuery.proxy() to ensure that the callback is
invoked in the correct context.

Then, when the page loads, we are adding a click handler onto an element, giving it
a local function, assetsClick(), as a callback. Creating a controller doesnt need to
be any more complicated than that. What is important is that all of the controllers
state is kept local and encapsulated cleanly into a module.

*/