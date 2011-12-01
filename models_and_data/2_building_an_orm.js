/*

Building an ORM

Object-relational mappers, or ORMs, are typically used in languages other than
JavaScript. However, they are very useful technique for data management as well as
a great way of using models in your JS applicatiom. With an ORM, for example, you
can tie up a model with a remote server--any changes to model instances will send
background ajax requests to the server. Or, you could tie up a model instance with
an HTML element--any changes to the instance will be reflected in the view. I will
elaborate on those examples later, but for now, let us look at creating a custom
ORM.

Essentially, an ORM is just an object layer wrapping some data. Typically, ORMs are
use to abstract SQL databases, but in our case, the ORM will just be abstracting
JS data types. The advantage of this extra layer is that we can enhance the basic
data with more functionality by adding our own custom functions and properties.
Ths lets us add things like validation, observers, persistence, and server callbacks
while still being able to reuse a lot of code.

*/