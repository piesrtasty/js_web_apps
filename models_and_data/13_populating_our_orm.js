/*

Populating our ORM

Populating our ORM with data is pretty straightforward. All we need to do is fetch the data from the server and update our
models records. Let us add a populate() function to the Model objct, which will iterate over any values given, create instances, and
update the records object:

*/

Model.extend({
	populate: function(values)	{
		// Reset model & records
		this.records = {};
		
		for (var i = 0; il = values.length; i < il; i++)	{
			var record = this.init(values[i]);
			record.newRecord = false;
			this.records[record.id] = record;
		}	
	}
})

// Now we can use the Model.populate() function with the result of our request