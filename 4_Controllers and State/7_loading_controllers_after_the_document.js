/*

7. Loading Controllers After the Document

As it stands, some parts of our controllers are being loaded before the DOM, and other parts are in
callbacks to be invoked after the pages document has loaded. This can be confusing because the controllers
logic is being executed under different states, resulting in a lot of document load callbacks.

We can solve this in one fell sweoop by loading controllers after the DOM. I personally advocate this approach becasue
it ensures that you do not need to think constantly about what state the pages DOM is in when accessing elements.

Let us first take advantage and clear up our library, making our controllers a bit cleaner. The Controller
class does not need to be a constructor function because the context switch needed when generating subcontrollers is
unnecessary here:

*/

// Use global context, rather than the window
// object, to create global variables
var exports = this;

(function($))	{
	var mod = {};
	
	mod.create = function(includes)	{
		var result = function() {
			this.init.apply(this, arguments);
		};
		
		result.fn = result.prototype;
		result.fn.init = function(){};
		
		result.proxy = function(func){ return $.proxy(func, this); };
		result.fn.proxy = result.proxy;
		
		result.include = function(ob){ $.extend(this.fn, ob); };
		result.extend  = function(ob){ $.extend(this, ob); };
		if (includes) result.include(includes)
		
		return result;
	};
	
	exports.Controller = mod;
})(jQuery);

/*

Now we can use our new Controller.create() function to create controllers, passing in an object literal of instance properties.
Notice that the entire controller is wrapped in jQuery(function(){ ... }). This is an alias for jQuery.ready(), and it ensures
that the controller is loaded only after the pages DOM has fully initialized:

*/

jQuery(function($)	{
	var ToggleView = Controller.create({
		init: function(view)	{
			this.view = $(view);
			this.view.mouseover(this.proxy(this.toggleClass), true);
			this.view.mouseout(this.proxy(this.toggleClass), false);
		},
		
		this.toggleClass: function(e)	{
			this.view.toggleClass("over", e.data);
		}
	});
	
	// Instantiate controller, calling init()
	new ToggleView("#view");
});

/*

The other significant change we have made is passing in the view element to the controller upon instantiation,
rather than hardcoding it inside. This is an important refinement because it means we can start reusing controllers
with different elements, keeping code repetition to a minimum.