/*

9. Delegating Events

We can also take a stab at cleaning up all that event binding and proxying by having
an events object that maps event types and selectors to callbacks. This is going to be
very similar to the elements object, but instead will take the following form:

*/

events: {
	"submit form": "search"
}

/*

Let us go ahead and add that to our SearchView controller. Like refreshElements(), we will have a a delegateEvents()
function that will be called when the controller is instantiated. This will parse the controllers events object, attaching
event callbacks. In our Search View example, we want the search() function to be invoked whenver the views <form/> is submitted:

*/

var exports = this;

jQuery(function($)	{
	exports.searchView = Controller.create({
		// Map all the event names,
		// selectors, and callbacks
		events: {
			"submit form": "search"
		},
		
		init: function()	{
			// ...
			this.delegateEvents();
		},
		
		search: function(e)	{
			/* ... */
		}
		
		// Private
		
		// Split on the first space
		eventSplitter: /^(\w+)\s*(.*)$/,
		
		delegateEvents: function()	{
			for (var key in this.events)	{
				var methodName = this.events[key];
				var method = this.proxy(this[methodName]);
				
				var match = key.match(this.eventSplittet);
				var eventName = match[1], selector = match[2];
				
				if (selector === '')	{
					this.el.bind(eventName, method);
				} else	{
					this.el.delegate(selector, eventName, method)
				}
			}
		}
	});
});

/* 
Notice we are using the deledate() function inside delegateEventS(), as well as the bind() function. If the event selector
is not provideed, the event will be palced straight on el. Otherwise, the event will be delegated, and it wil be triggered if the event
tyoe is fired on a child matching the selector. The advantage of delegation is that it often reduces the amount of event listeners
required--i.e., listeners do not have to be placed on every element selected becaue events are caught dynamically when they bubble up.

We can push all those controller enhance,ents upstream to our Controller library so they can be reused in every controller. Here is the
finished example:

*/

var exports = this;

jQuery(function($)	{
	exports.SearchView = Controller.create({
		elements: {
			"input[type=search]": "searchInput",
			"form": "searchForm"
		},
		
		events: {
			"submit form": "search"
		},
		
		init: function(){
			/* ... */
		},
		
		search: function()	{
			alert("Searching: " + this.searchInput.val());
			return false;
		},
	});
	
	new SeachView({el: "#users"})
});