
/* 

Currently, our class lib includes functionality for instantiating and
initializing instances. Adding properties to classes is the same as adding
properties to constructor funcs.

*/

// Properties set directly on the class will be equivalent

var Person = new Class;

// Static functions are added directly on the class
Person.find = function(id){ /* ... */ };

// And now we can call them directly
var person = Person.find(1);

// And properties set on the class prototype are also available on instances:

var Person = new Class;

// Instance functions are on the prototype
Person.prototype.save = function(){ /* ... */ };

// And now we can call them on instances
var person = new Person;
person.save();

/*

However, this syntax is a little convoluted, impractical, and repetitive. Its
difficult to see, at a glance, a list of your classes static and instance
properties. Instead, lets create a different way of adding properties to our classes using two functions extend() and include():

*/

var Class = function()	{
	var klass = function()	{
		this.init.apply(this, arguments);
	};
	
	klass.prototype.init = function(){};
	
	// Shortcut to access prototype
	klass.fn = klass.prototype;
	
	// Shortcut to access class
	klass.fn.parent = klass;
	
	// Adding class properties
	klass.extend = function(obj)	{
		var extended = obj.extended;
		for(var i in obj)	{
			klass[i] = obj[i];
		}
		if (extended) extended(klass)
	};
	
	// Adding instance properties
	klass.include = function(obj)	{
		var included = obj.included;
		for(var i in obj){
			klass.fn[i] = obj[i];
		}
		if (included) included(klass)
	};
	
	return klass;
};

/*

In the improved class library above, were adding an extend function to generated
classes, which accepts an object. The objects properties are iterated through and
copied directly onto the class:

*/

var Person = new Class;

Person.extend({
	find:   function(id)	{ /* ... */ },
	exists: function(id)	{ /* ... */ }
});

var person = Person.find(1);

/*

The include() function works in exactly the same way, except properties are copied
onto the classes prototype, rather than directly onto the class. In other words,
the properties are on the classes instance, rather than statically on the class.

*/

var Person = new Class;

Person.include({
	save:    function(id)	{ /* ... */ };
	destroy: function(id)	{ /* ... */ };
});

var person = new Person;
person.save()

/*

Were also implementing support for extended and included callbacks. If these
properties are present on the passed object, they will be invoked:

*/

Person.extend({
	extended: function(klass)	{
		console.log(klass, " was extended!");
	}
});

/*

If you have used classes in Ruby, this should all look very familiar. The beauty
of this approach is that we have now got support for modules. Modules are reusable
pieces of code, and they can be used as an alternative for sharing common
properties among classes.

*/

var ORMModule = {
	save: function()	{
		// Shared function
	}
};

var Person = new Class;
var Asset = new Class;

Person.include(ORRModule);
Asset.include(ORRModule);