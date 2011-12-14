/*

Submitting New Records to the Server

Eearlier, we covered how to use jQuerys post() function to send data to the server.
The function takes three aguments: the endpoint URL, request data, and a callback:

*/

jQuery.post("/users", {first_name: "Alex"}, function(result)	{
	/* Ajax POST was a success */
});

// Now that we have an attributes() function, creating records to the server is
// simple--just POST the records attributes:

jQuery.post("/assets", asset.attributes(), function(result)	{
	/* Ajax POST was a success */
});

/*

If we are following REST conventions, we will want to do an HTTP POST when creating
a record and a PUT request when updating the record. Let us add two functions to
Model instances--createRemote() and updateRemote()--which will send the correct HTTP
request type to our server:

*/

Model.include({
	createRemote: function(url, callback)	{
		$.post(url, this.attributes(), callback);
	},
	
	updateRemote: function(url, callback)	{
		$.ajax({
			url: url,
			data: this.attributes(),
			success: callback,
			type: "PUT"
		});
	}
});

// Now if we call createRemote() on an Asset instance, its attributes will be POSTed
// to the server

// Useage:
Asset.init({name: "jason.txt"}).createRemote("/assets");