/*

3. Global Import

Variable definitions inside the module are local, so they cannot be accessed outside
inthe global namespace. However the applications global variables are all still
available, and they can be readily accessed and manipulated inside the module. It is
often not obvious which global variables are being used by a module, especially when
your modules get larger.

In addition, implied globals are slower to resolve because the JS interpreter has
to walk up the scope chain to resolve them. Local variable access will always be
faster and more efficient.

Luckily, our modules provide an easy way to resolve these problems. By passing
globals as parameters to our anonymous function, we can import them into our code,
which is both clearer and faster than implied globals:

*/

(function($)	{
	/* ... */
})(jQuery);

/*

In the example above we are importing the global variable jQuery into our module and
aliasing it to $. It is obvious which global variables are being accessed inside the
module and their lookup is quicker. In fact, this is the recommended practice 
whenever you want to use jQuerys $ shortcut, which ensures that your code wont
conflict with any other libraries.

*/