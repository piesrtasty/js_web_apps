
/*

JS is a prototype-based language and--rather than make distinctions between
classes and instances--it has the notions of a prototypical object: an object used
as a template from which to get the initial properties for a new object. Any object
can be associated as a prototype of another object, sharing its properties. In
practice, you can look at this as a form of inheritance.

When you fetch a property on an object, JS will search the local object for the
property. If it is not found, JS will start searching the objects prototype and
continue up the prototype tree, eventually reaching Object.prototype. If the
property is found, its value is returned; otherwise, undefined will be returned.

In other words, if you start adding properties to Array.prototype, they will be
reflected across every JS array.

To subclass a class and inherit its properties, you need to first define a
constructor function. Then, you need to assign a new instance of the parent class
as the prototype for your constructor function. It looks like this:

*/

var Animal = function(){};

Animal.prototype.breath = function()	{
	console.log('breath');
};

var Dog = function(){};

// Dog inherits from Animal
Dog.prototype = new Animal;

Dog.prototype.wag = function()	{
	console.log('wag tail');
};


// Now, we can check to see whether the inheritance works:

var dog = new Dog;
dog.wag();
dog.breath(); // Inherited property