// Now, if we add properties to Model, they will be available on all inherited
// models:

// Add object properties
jQuery.extend(Model, {
	find: function()	{}
});

// Add instance properties
jQuery.extend(Model.prototype,	{
	init.function(atts)	{
		if (atts) this.load(atts);
	},
	
	load: function(attributes)	{
		for (var name in attributes)
			this[name] = attributes[name];
	}
})

/*

jQuery.extend() is just a shorthand way of using a for loop to copy over properties
manually, which is similar to what we are doing in the load() function. Now, our
object and instance properties are propagating down to our individual models:

*/

assertEqual( typeof Asset.find, "function");

// In fact, we are going to be adding a lot of properties, so we might as well make
// extend() and include() part of the Model object:

var Model = {
	/* ... snip ...*/
	
	extend: function(o)	{
		var extended = o.extended;
		jQuery.extend(this, o);
		if (extended) extend(this);
	},
	
	include: function(o)	{
		var included = o.included;
		jQuery.extend(this.prototype, o);
		if (included) included(this);
	}
};

// Add object properties
Model.extend({
	find: function()	{}
});

// Add instance properties
Model.include({
	init: function(atts)	{ /* ... */ },
	load: function(attributes)	{ /* ... */ }
});

// Now, we can create new assets and set some attributes:

var asset = Asset.init({name: "foo.