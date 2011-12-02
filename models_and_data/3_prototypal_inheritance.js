/*

Prototypal Inheritance

We are going to use Object.create() to construct our ORM, which is a little
different from the class-based examples covered in ch. 1. This will allow us to use
prototype-based inheritance, rather than using constructor functions and the new
keyword.

Object.create() takes one argument, a prototype object, and returns a new object
with the specified prototype object. In other works, you give it an object, and it
returns a new one, inheriting from the one you specified.

Object.create() was recently added to ECMAScript, 5th ed., so it is not implemented
in some browsers, such as IE. However this does not pose a problem since we can
easily add support if needed:

*/

if (typeof Object.create !== "function")	{
	Object.create = function(o)	{
		function F()	{}
		F.prototype = o;
		return new F();
	};
}

/*

The example above was taken from Douglas Crockfords article on Prototypal
Inheritance. We are going to create a Model object, which will be in charge of
creating new models and instances:

*/

var Model = {
	inherited: function()	{},
	created: function()	{},
	
	prototype: {
		init: function()	{}
	},
	
	create : function()	{
		var object = Object.create(this);
		object.parent = this;
		object.prototype = object.fn = Object.create(this.prototype);
		
		object.created();
		this.inherited(object);
		return object;
	},
	
	init: function()	{
		var instance = Object.create(this.prottype);
		instance.parent = this;
		instance.init.apply(instance, arguments);
		return instance;
	}
};

/*

If you are unfamiliar Object.create(), this may look daunting, so let us break it
down. The create() function returns a new object, inheriting from the Model object;
we will use this for creating new models. The init() function returns a new object,
inheriting from Model.prototpe--i.e., an instance of the Model object:

*/

var Asset = Model.create();
var User = Model.create();

var user = User.init();