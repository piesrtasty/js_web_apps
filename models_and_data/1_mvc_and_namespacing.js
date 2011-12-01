/*

MVC and Namespacing

Ensuring that there is a clear separation between your applications views, state, and data is crucial
to keeping its architecture uncluttered and sustainable. With the MVC pattern, data management happens
in models. Models should be decoupled from views and controllers. Any logic associated with data
manipulation and behavior should reside in models and be namespaced properly.

In JS, you can namespace functions and variables by making them properties of an object. I.E.:

*/

var User = {
	records: [ /* ... */ ];
};

/*

The array of users is namespaced properly under User.records. Functions associated with users can also
be namespaced under User model. For example, we can have a fetchRemote() function for fetching user
data from a server:

*/

var User = {
	records: [],
	fetchRemote: function(){ /* ... */ }
};

/*

Keeping all of a models properties under a namespace ensures that you do not get any conflicts and that
it is MVC-compliant. It also prevents your code from spiraling down into a tangled mess of functions
and callbacks.

You can take namespacing a step further and keep any functions specific to user instances on the actual
user objects. Let us say we had a destroy() function for user records; it refers to specific users, so
it should be on User instances:

*/

var user = new User;
user.destroy()

// To acheive that, we need to make User a class, rather than a plain object:

var User = function(atts)	{
	this.attributes = atts || {};
};

User.prototype.destroy = function()	{
	/* ... */
};

// Any functions and variables that do not relate to specific users can be properties directly on the
// User object

User.fetchRemote = function()	{
	/* ... */
};