/*

Adding ID Support

At the moment, every time we save a record we have to specify an ID manually. This
sucks, but fortunately, it is something we can automate. First, we need a way of
generating IDs, which we can do with a Globally Unique Identifier(GUID) generator.
Well, technically, JS cannot generate offical 128-bit GUIDs for API reasons--ut can
only generate pseduorandom numbers. Generating truly random GUIDs is a notoriously
difficult problem, and operating systems calculate them using the MAC address,
mouse position, and BIOS checksums, or by measuring electrical noise or radioactive
decay--and even lava lamps! However JSs native Math.random(), although
pseudorandom, will be enough for our needs.

Robbert Kieffer has written an easy and succinct GUID generator that uses
Math.random() to generate pseudorandom GUIDs:

*/

Math.guid = function()	{
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
		return v.toString(16);
	}).toUpperCase();
};

/*

Now that we have a funtion to generate GUIDs, integrating that into our ORM is
simple; all we need to change is the create() function:

*/

Model.extend({
	create: function()	{
		if ( !this.id ) this.id = Math.guid();
		this.newRecord = false;
		this.parent.records[this.id] = this;
	}
});

Now, any newly created records have random GUIDs as their ID:

var asset = Asset.init();
asset.save();

asset.id // => 'CC4C5E36-D943-4CF9-BDE8-FE73B93797F6'