
/*

Let us add inheritance to our custom class library. We will pass through an optional
parent class when creating a new class:

*/

var Class = function(parent)	{
	var klass = function()	{
		this.init.apply(this, arguments);
	};
	
	// Change klasses prototype
	if (parent)	{
		var subclass = function()	{};
		subclass.prototype = parent.prototype;
		klass.prototype = new subclass;
	};
	
	klass.prototype.init = function(){};
	
	// Shortcuts
	klass.fn = klass.prototype;
	klass.fn.parent = klass;
	klass._super = klass.__proto__;
	
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

If a prent is passed to Class constructor, we mkae sure any subclasses share the
same prototype. This little dance around creating a temporary anonymous function
prevents instances from being created when a class is inherited. The caveat here is
that only instance properties, not class properties, are inherited. There is not
yet a cross browser way of setting an objects __proto__; Libraries like Super.js
get around this problem by copying the properties, rather than implementing proper
dynamic inheritance.

*/

// Now, we can perform simple inheritance by passing parent classes to Class:

var Animal = new Class;

Animal.include({
	breath: function()	{
		console.log('breath');
	}
});

var Cat = new Class(Animal)

// Usage
var luke = new Cat;
luke.breath();