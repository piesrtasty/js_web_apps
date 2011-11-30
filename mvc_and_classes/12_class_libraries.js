
/* 

jQuery does not include class support natively, but it can easily be added with
a plug-in like HJS. HJS lets you define classes by passing a set of properties to
$.Class.create:

*/

var Person = $.Class.create({
	// constructor
	initialize: function(name)	{
		this.name = name;
	}
});

// To inherit classes, pass their parent as an argument when creating them:

var Student = $.Class.create(Person, {
	price: function()	{ /* ... */ }
});

var alex = new Student("Alex");
alex.pay();

// To add class properties, set them directly on the class:

Person.find = function(id)	{ /* ... */ };

// HJSs API also include a few utility functions, such as clone() and equal():

var alex = new Student("Alex");
var bill = alex.clone();

assert( alex.equal(bill) );

// HJS is not your only option; Spine also has a class implementation. To use it,
// just include spine.js in the page:

// <script src="http://maccman.github.com/spine/spine.js"> </script>
// <script>

var Person = Spine.Class.create();

Person.extend({
	find: function()	{ /* ... */ }
});

Person.include({
	init: function(atts)	{
		this.attributes = atts || {};
	}
});

var person = Person.init();

// </script>

/*

Spines class library has a similar API to the library we have been building 
throughout this chapter. Use extend() to add class properties and include() to
add instance properties. To inherit from them, pass parent classes to the
Spine.Class. instantiator.

*/