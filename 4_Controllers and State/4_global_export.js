/*

4. Global Export

We can use a similar technique when it comes to exporting global variables. Ideally,
you should be using as few global variables as possible, but there is always the odd
occassion when they are needed. We can import the pages window into our module, 
setting properties on it directly, thereby exposing variables globally:

*/

(function($, exports)	{
	exports.Foo = "wem";
})(jQuery, window);

assertEqual( Foo, "wem");

// The fact that we are using a variable called exports to set any global variables
// means the code is clearer, making it obvious which global variables a module is
// creating.
