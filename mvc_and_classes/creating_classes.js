/*

Toward Modularity, Creating Classes

JS object literals are fine for static classes, but it is often useful
to create classical classes with inheritance and instances. Its important
to emphasize that JS is a prototype language, and as such does not include a
native class implementation. However, this can be emulated fairly easily.

Rather than class definitions, JS has constructor funcs and the new operator.
A constructor function can specify an objects initial properties and values
when its instantiated. Any JS func can be used as a constructor. Use the new
operator with a constructor func to create a new instance.

The new operator changes ta functions context, as well as the behavior of the
return statement. In practice, using new and constructors is fairly similar to
languages with native class implementations.

*/

var Person = function(name)	{
	this.name = name;
};

// Instantiate Person
var alice = new Person('alice');

// Check instance
assert( alice instanceof Person);

/* 

By convention, constructor funcs are upper camel-cased to differentiate them from
normal funcs. This is important bc you dont ever want to call a constructor func
w/o the new prefix.

*/

// Dont do this!
Person('bob'); // => undefined

/*

The function will just return undefined, and since the context is the window
(global) object, youve unintentionally created a global variable, name.

When a constructor func is called with the new keyword, the context switches from
global (window) to a new and empty context specific to that instance. So, the this
keyword refers to the current instance.

By default, if you dont return anything from a constructor func, this - the current
context - will be returned. Otherwise, you can return any nonprimitive type. For
example, we could return a func that would set up a new class, the first step in
building our own class emulation lib:

*/

var Class = function()	{
	var klass = function()	{
		this.init.apply(this, arguments);
	};
	klass.prototype.init = function(){};
	return klass;
};

var Person = new Class;

Person.prototype.init = function()	{
	// Called on Person instantiation
};

// Usage:
var person = new Person;

/*

Confusingly, due to a JS 2 spec that was never implemented, class is a reserved
keyword. The common convention is instead to name class variables as _class or
klass.

*/





























