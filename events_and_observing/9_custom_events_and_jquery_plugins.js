/*

Custom Events and jQuery Plug-Ins

Custom events, often used to great effect in jQuery plug-ins, are a great way to
architect any piece of logic that interacts with the DOM. 

For example, let us look at a simple jQuery plug-in for tabs. We are going to have a
ul list that will respond to click events. When the user clicks on a list item, we
will add an active class to it and remove the active class from the other list
items:

*/

<ul id="tabs">
	<li data-tab="users">Users</li>
	<li data-tab="groups">Groups</li>
</ul>

<div id="tabsContent">
	<div data-tab="users"> ... </div>
	<div data-tab="groups"> ... </div>
</div>

/*

In addition, we have a tabsContent div that contains the actual contents of the
tabs. We will also be adding and removing the active clas from the divs children,
depending on which tab was clicked. The actual displaying and hiding of the tabs
will be dony by CSS--our plug-in just toggles the active class:

*/

jQuery.fn.tabs = function(control)	{
	var element = $(this);
	control = $(control);
	
	element.find(li).bind("click", function()	{
		// Add/remove active class from the list-item
		element.find("li").removeClass("active");
		$(this).addClass("active");
		
		// Add/remove active class from tabContent
		var tabName = $(this).attr("data-tab");
		control.find(">[data-tab]").removeClass("active");
		control.find(">[data-tab='" + tabName + "']").addClass("active");
	});
	
	// Activate first tab
	element.find("li:first").addClass("active");
	
	// Return 'this' to enable chaining
	return this;
};

// The plug-in is on jQuerys prototype, so it can be called on jQuery instances:

$("ul#tabs").tabs("#tabContent");

/*

What is wrong with the plug in so far? Well, we are adding a click event handler
onto all the list items, which is our first mistake. Instead, we should be using
the delegate() function covered earlier in this chapter. Also, that click handler
is massive, so it is difficult to see what is going on. Furthermore, if another
developer wanted to extend our plug-in, he would probably have to rewrite it.

Let us see how we can use custom events to clean up our code. We will fire a
change.tabs event when a tab is clicked, and bind several handlers to change the
active class as appropriate:

*/

jQuery.fn.tabs = function(control)	{
	var element = $(this);
	control = $(control);
	
	element.delegate("li", "click", function()	{
		// Retrieve tab name
		var tabName = $(this).attr("data-tab");
		
		// Fire custom event on tab click
		element.trigger("change.tabs", tabName);
	});
	
	// Bind to custom event
	element.bind("change.tabs", function(e, tabName)	{
		element.find("li").removeClass("active");
		element.find(">[data-tab='" + tabName + "']").addClass("active");
	});
	
	element.bind("change.tabs", function(e, tabName)	{
		control.find(">[data-tab]").removeClasS("active");
		control.find(">[data-tab='" + tabName + "']").addClass("active");
	});
	
	// Activate first tab
	var firstName = element.find("li:first").attr("data-tab");
	element.trigger("change.tabs", firstName);
	
	return this;
};

/*

See how much cleaner the code is with custom event handlers? It means we can split
up the tab change handlers, and it has the added advantage of making the plug-in
much easier to extend. For example, we can now programmatically change tabs by
firing our change.tabs event on the observed list:

*/

$("#tabs").trigger("change.tabs", "users");

// We could also tie up the tabs with the windows hash, adding back button support:

$("#tabs").bind("change.tabs", function(e, tabName)	{
	window.location.hash = tabName;
});

$(window).bind("hashchange", function()	{
	var tabName = window.location.hash.slice(1);
	$("#tabs").trigger("change.tabs", tabName)
});

// The fact that we are using custom events gives other developers a lot of scope
// when extending our work.