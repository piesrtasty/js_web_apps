/* 

The model is where all the applications data objects are stored. For example a User Model
would contain a list of users, their attributes, and any logic associated specifically with
that  model.

A model doesnt kow about controllers / views. It should only contain its data and the logic
directly associated with that data. ( i.e. Any event handling code, view templates, or logic
not specific to that model should not be a part of it. ).

When controllers fetch data from servers or create new records, they wrap them in model
instances. This means that our data is OO, and any funcs or logic defined on the model can
be called directly on the data.

/*

// So rather than this:

var user = users["foo"];
destroyUser(user);

// We can do something like this:

var user = User.find("foo");
user.destroy();

/*

The first example is not namespaced or OO. If we have another destroy User() function
defined in our application, the two will conflict. Global variables and functions should
always be kept to an absolute min. In the second example, the destroy() func is namespaced
behind User intances, as are all the stored records. This scenario is ideal as we are keeping
global bars to a minimum, exposing fewer areas to potential conflicts. The code is cleaner
and can take advantage of inheritance so funcs like destroy() dont have to be defined
separately on every model.

*/

