
// Adding class funcs to a constructor func is the same as adding a property onto
// any object in JS

Person.find = function(id){ /* ... */ };

var person = Person.find(1);

// To add instance funcs to a constructor func, you need to use the constructors
// prototype

Person.prototype.breath = function(){ /* ... */ };

var person = new Person;
person.breath();

// A common pattern is to alias a class prototype to fn

Person.fn = Person.prototype;

Person.fn.run = function(){ /* ... */ };

// The above patern is common throughout jQuery plug-ins