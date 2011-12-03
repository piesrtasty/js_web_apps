/*

Persisting Records

We need a way of persisting records--i.e., of saving a reference to created
instances so we can access them later. We will do that using a records object, set
on the Model. When we are saving instance, we will add it to that object; when
deleting instances, we will remove them from the object:

*/

// An object of saved assets
Model.records = {};

Model.include({
	newRecord: true,
	
	create: function()	{
		this.newRecord = false;
		this.parent.records[this.id] = this;
	},
	
	destroy: function()	{
		delete this.parent.records[this.id];
	}
});

// What about updating an existing instance? Easy--just update the object reference:

Model.include({
	update: function()	{
		this.parent.records[this.id] = this;
	}
});

// Let us create a convenience function to save an instance, so we do not have to check to see whether the instance was
// saved previously, or wether it needs to be created:

// Save the object to the records hash, keeping a reference to it

Mode.include({
	save: function()	{
		this.newRecord ? this.create() : this.update();
	}
});

// And what about implementing that find() function, so we can find assets by their ID

Model.extend({
	// Find by ID, or raise an exception
	find: function(id)
})