/*

Addressing References

If you have been observing closely, you might have spotted a bug relating to the
references in our ORM. We are not cloning instances when they are returned by
find() or when we are saving them, so if we change any properties, they are changed
on the original asset. This is a problem because we only want assets to update
when we call the update() function:

*/

var asset = new Asset({name: "foo"});
asset.save();

// Assert passes correctly
assertEqual( Asset.find(asset.id).name, "foo" );

// Let us change a property but not call update()
asset.name = "wem";

// Oh dear! This asset fails, as the assets name is now "wem"
assertEqual( Asset.find(asset.id).name, "foo" );

/*

Let us fix that by creating a new object during the find() operation. We also need
to duplicate the object whenever we create or update the recrod:

*/

Asset.extend({
	find: function(id)	{
		var record = this.record[id];
		if ( !record ) throw("Unknown record");
		return record.dup();
	}
});

Asset.include({
	create: function()	{
		this.newRecord = false;
		this.parent.records[this.id] = this.dup();
	},
	
	update: function()	{
		this.parent.records[this.id] = this.dup();
	},
	
	dup: function()	{
		return jQuery.extend(true, {}, this);
	}
});

// We have another problem--Model.records is an object shared by every model:
assertEqual( Asset.records, Person.records)

// This has the unfortunate side effect of mixing up all the records:
var asset = Asset.init();
asset.save();

assert( asset in Person.records );

/*

The solution is to set a new records object whenever we create a new model.
Model.created() is the callback for new object creation, so we can set any objects
that are specific to the model in there:

*/

Model.extend({
	created: function()	{
		this.records = {};
	}
});