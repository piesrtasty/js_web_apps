/*

Custom Events

Beyong events that are native to the browser, you can trigger and bind them to your
own custom events. Indeed it is a great way of architecting libs--a pattern a lot of
jQuery plug-ins use. The W3C spec for custom events has been largely ignored by the
browser vendors; you will have to use libraries like jQuery or Prototype for this
feature.

jQuery lets you fire custom events using the trigger() function. You can namespace
event names, but namespaces are separated by full stops and reversed. For example:

*/

// Bind custom event
$(".class").bind("refresh.widget", function()	{});

// Trigger custom event
$(".class").trigger("refresh.widget");

/*

And to pass data to the event handler, just padd it as an extra parameter to
trigger(). The data will be sent to callbacks as extra arguments:

*/

$(".class").bind("frob.widget", function(event, dataNumber)	{
	console.log(dataNumber);
});

$(".class").trigger("frob.widget", 5);

// Like native events, custom events will propagate up the DOM tree.