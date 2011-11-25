
/*

So far, any property we have added to our classes has been open to the world and
can be changed at any time. Let us now explore how to add private properties to
our classes.

A lot of developers end up prefixing private properties with an underscore(_).
Although these can still be changed, it makes it obvious that they are part of a
private API.

JS does have support for immutable properties; however, this is not implemented
across the main browsers, so we will have to wait before using this method. Instead
we will use JS anonymous functions to create a private scope, which can only be
accessed internally:

*/

var Person = function(){};

(function()	{
	
	var findById = function(){ /* ... */ };
	
	Person.find = function(id)	{
		if (typeof id == "integer")
			return findById(id);
	};
	
})();

/*

We are wrapping our classes properties in an anonymous function, then creating local
variables(findById), which can only be accessed in the current scope. The Person
variable is defined inthe global scope, so it can be accessed from anywhere.

Never define a variable without using the var operator, since it always creates a
global variable. If you need to define a global variable, do so in the global scope
or as a property of window:

*/

(function(exports)	{
	var foo = "bar";
	
	// Expose variable
	exports.foo = foo;
})(window);

assertEqual(foo, "bar");