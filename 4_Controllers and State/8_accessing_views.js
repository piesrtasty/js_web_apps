/*

Accessing Views

A common pattern is to have one controller per view. The view has an ID, so it can be passed
to controllers easily. Elements inside the view then use classes, rather than IDs, so they do not
conflict with elements in other views. This pattern provides a good structure for a general practice,
but it should not be conformed to rigidly.

So far in this  chapter we have been accessing views by using the jQuery() selector, storing a local
reference to the view inside the controller. Subsequent searches for elements inside the veew are then
scoped by that view reference, speeding up their lookup:

*/

// ...
init: function(view)	{
	this.view = $(view);
	this.form = this.view.find("form");
}

/*

However, it does mean that controllers fill up with a lot of selectors, requiring us to query the DOM
constantly. We can clean this up somewhat by having one place in the controller where selectors are mapped
to variable names, like so:

*/
elements: {
	"form.searchForm": "searchForm"
	"form input[type=text]": "searchInput"
}

/*

This ensures that the variables this.searchFor, and this.searchInput will be created on the controller when
it is instantiated, set to their respective elements. These are normal jQuery objects, so we can manipulate them
as usual, setting event handlers and fetching attributes.

Let us implement support for that elements mapping inside our controllers, iterating over all the selectors and setting local
variables. We will do this inside our init() function, which is called when our controller is instantiated:

*/

var exports = this;

jQuery(function($){
	exports.searchView = Controller.create({
		// Map of selectors to local variable names
		elements: {
			"input[type=search]": "searchInput",
			"form": "searchForm"
		},
		
		
		// Called upon instantiation
		init: function(element)	{
			this.el = $(element);
			this.searchForm.submit(this.proxy(this.search));
		},
		
		search: function()	{
			console.log("Searching:", this.searchInput.val());
		},
		
		// Private
		
		$: function(selector)	{
			// An 'el' property os required, and scopes the query
			return $(selector, this.el);
		},
		
		// Set up the local variables
		refreshElements: function()	{
			for (var key in this.elements)	{
				this[this.elements[key]] = this.$(key);
			}
		}
	});
	
	new SearchView("#users");
});

/*

refreshElements() expects every controller to have a current element property, el, which will
scope any selectors. Once refreshElements() is called, the this.searchForm and this.searchInput
properties will be set on the controller and are subsequently available for event binding and DOM
manipulation.

*/