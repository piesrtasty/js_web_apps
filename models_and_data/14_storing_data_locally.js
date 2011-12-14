/*

Storing Data Locally

In the past, local data storage was a a pain in the neck. The only options available
to use were cookies, and plug-ins like Adobe Flash. Cookies had an antiquated API,
couldnt store much data, and sent all the data back to the server on every request,
adding unncessary overhead. As for Flash, well, let us try and steer clear of
plug-ins if possible.

Fortunately, support for local storage was included in HTML5 and is implemented in
the major browsers. Unlike cookies,data is stored exclusively on the client side and
is never sent to servers. You can also store a great deal more data - the maximum 
amoutn differs per browser (and version number, as listed below), but they all offer
at least 5 MB per domain:

- IE >= 8
- Firefox >= 3.5
- Safari >= 4
Chrome >= 4
Opera => 1-.6

HTML5 storage comes under the HTML5 Web Storage spec., and consists of two typs:
local storage and session storage. Local storage persists after the browser is
closed; session storage persists only for the lifetime of the window. Any data is
scoped by domain and is only accessible to scripts from the domain that originally
stored the data.

You can access and manipulate local storage and session storage using the
localStorage and sessionStorage objects, respectively. The API is very similar to
setting properties on a JavaScript object, and apart from the two objects, is
identical for both local and session storage.

*/

// Setting a value
localStorage["someData"] = "wem";

// There are a few more features to the WebStorage API

// How many items are stored
var itemsStored = localStorage.length;

// Set an item (aliased to a hash syntax)
localStorage.setItem("someData", "wem");

// Get a stord item, returning null if unknown
localStorage.getItem("someData"); //=> "wem";

// Delete an item, returning null if unknown
localStorage.removeItem("someData");

// Clear all items
localStorage.clear();

/*

Data is stored as strings, so if you intend on saving any objects or integers, you
will have to do your own conversion. To do this using JSON, serialize the objects
into JSON before you save them, and deserialize the JSON strings when fetching
them:

*/

var object = {some: "object"};

// Serialize and save an object
localStorage.setItem("seriData", JSON.stringify(object));

// Load and deserialize an object
var result = JSON.parse(localStorage.getItem("seriData"));

// If you go over your storage quota (usually 5 MB per host), a QUOTA_EXCEEDED_ERR
// will be raised when saving additional data.