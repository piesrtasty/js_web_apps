/*

Non-DOM Events

Event-based programming is very powerful because it decouples your apps
architecture, leading to better self-containment and maintainability. Events are not
restricted to the DOM though, so you can easily write your own event handler
library. The pattern is called Publish/Subscribe, and it is a good one to be
familiar with.

Publish/Subscribe, or Pub/Sub, is a messaging pattern with two actors, publishers,
and subscribers. Publishers publish messages to a particular channel, and
subscribers subscribe to channels, receiving notifications when new messages are
published. The key here is that publishers and subscribers are completely
decoupled-- they have no idea of each others existence. The only thing the two
share is the channel name.

The decoupling of publishers and subscribers allows your application to grow without
introducing a lot of interdependency and coupling, improving the ease of
maintenance, as well as adding extra features.

So, how do you actually go about using Pub/Sub in an application? All you need to
do is record handlers associated with an event name and then have a way of invoking
them. Here is an example of a PubSub object, which we can use for adding and
triggering event listeners:

*/

var PubSub = {
	subscribe: function(ev, callback)	{
		// Create _callbacks object, unless it already exists
		var calls = this._callbacks || (this._callbacks = {});
		
		// Create an array for the given event key, unless it exists, then
		// append the callback to the array
		(this._callbacks[ev] || (this._callbacks[ev] = [])).push(callback);
		return this;
	},
	
	publish: function()	{
		// Turn arguments object into a real array
		var args = Array.prototype.slice.call(arguments, 0);
		
		// Extract the first argument, the event name
		var ev = args.shift();
		
		// Return if there is not a _callbacks object, or
		// if it does not contain an array for the given event
		var list, calls, i, l
		if (!(calls = this._callbacks)) return this;
		if (!(list = this._callbacks[ev])) return this;
		
		// Invoke the callbacks
		for (i = 0, l = list.length; i < l; i++)
			list[i].apply(this, args);
		return this;
	}
};

// Example usage
PubSub.subscribe("wem", function()	{
	alert("Wem!");
});

PubSub.publish("wem");

// You can namespace events by using a separator, such as a colon (:).

PubSub.subscribe("user:create", function(){ /* ... */ });

// If you are using jQuery there is an even easier lib by Ben Alman.

/*!
 *
 * jQuery Tiny Pub/Sub - v0.3 - 11/4/2010
 * http://benalman.com/
 *
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */

(function($)	{
	var o = $({});
	
	$.subscribe = function()	{
		o.bind.apply( o, arguments );
	};
	
	$.unsubscribe = function()	{
		o.unbind.apply( o, arguments );
	};
	
	$.publish = function()	{
		o.trigger.apply( o, arguments );
	};
	
})(jQuery);

/*

The API takes the same arguments as jQuerys bind() and trigger() functions. The
only difference is that the functions reside directly on the jQuery object, and
they are called publish() and subscribe():

*/

$.subscribe( "/some/topic", function( event, a, b, c )	{
	console.log( event.type, a + b + c );
});

$.publish( "/some/topic", "a", "b", "c" );

/*

We have been using Pub/Sub for global events, but it is just as easy to scope it.
Let us take the PubSub object we created previously and scope it to an object:

*/

var Asset = {};

// Add PubSub
jQuery.extend(Asset, PubSub);

// We now have publish/subscribe functions
Asset.subscribe("create", function()	{
	// ...
});

/*

We are using jQuerys extend to copy PubSubs properties onto our Asset object.
Now, all calls to publish() and subscribe() are scoped by Asset. This is useful
in lots of scenarios, including events in an object-relational mapping (ORM),
changes in a state machine, or callbacks once an Ajax request has finished.

*/