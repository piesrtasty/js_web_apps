/*

Adding Local Storage to Our ORM

Let us add local storage support to our ORM so that records can be persisted between
page refreshes. To use the localStorage object, we need to serialize our records
into a JSON string. The problem is that, at the moment, serialized object look like
this:

*/

var json = JSON.stringify(Asset.init({name: "foo"}));
json //=> "{"parent":{"parent":{"prototype":{}},"records":[]},"name":"foo"}"

/*

So, we need to override JSONs serialization of our models. First, we need to
determine which properties need to be serialized. Let us ad an attributes array to
the Model object, which individual models can use to specify their attributes:

*/

Model.extend({
	created: function()	{
		this.records = {};
		this.attributes = [];
	}
});

Asset.attributes = ["name", "ext"];

/*

Because every model has different attributes--and thereforce cannot share the same
array reference--the attributes property is not set directly on the Model. Instead
we are creating a new array when a model is first created, similar to what we are
doing with the records object.

Now, let us create an attributes() function, which will return an object of
attributes to values:

*/

Model.include({
	attributes: function()	{
		var result = {};
		for(var i in this.parent.attributes)	{
			var attr = this.parent.attributes[i];
			result[attr] = this[attr];
		}
		result.id = this.id
		return result;
	}
});

// Now, we can set an array of attributes for every model:
Asset.attributes = ["name", "ext"];

// And the attributes() function will return an object with the correct properties
var asset = Asset.init({name: "document", ext: ".txt"});
asset.attributes(); //=> {name: "document", ext: ".txt"};

/*

As for the overriding JSON.stringify(), all that is needed is a toJSON() method
on model instances. The JSON library will use that function to find the object to
serialize, rather than serializing the records object as-is:

*/

Model.include({
	toJSON: function()	{
		return(this.attributes());
	}
});

// Let us try serializing the records again. This time, the resultant JSON will
// contain the correct properties:

var json = JSON.stringify(Asset.records);
json //= "{AB2A9E8D...":"{"name":"document","ext":".txt","id":"7B2A9E8D..."}"}"

/*

Now that we have got JSON serializing working smoothly, adding local storage
support to our models is trivial. We will add two functions onto our Model:
saveLocal() and loadLocal(). When saving, we will convert the Model.records object
into an array, serialize it, and send it to localStorage:

*/

var Model.LocalStorage = {
	saveLocal: function(name)	{
		// Turn records into an array
		var result = [];
		for (var i in this.records)
			result.push(this.records[i])
			
		localStorage[name] = JSON.stringify(result)
	},
	
	loadLocal: function(name)	{
		var result = JSON.parse(localStorage[name]);
		this.populate(result);
	}
};

Asset.extend(Model.LocalStorage)

/*

It is probably a good idea for the records to be read from the local storage when
the page loads and to be saved when the page is closed. That, however, will be left
as an exercise for the read.

*/