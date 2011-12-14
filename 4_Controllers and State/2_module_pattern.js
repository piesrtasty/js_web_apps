/*

2. Module Pattern

The module pattern is a great way to encapsulate logic and prevent global namespace
pollution. It is all made possible by anonymous functions, which are arguably the 
single best feature of JavaScript. We will just create an anonymous function and
execute it immediately. All the code residing within the function runs inside a
closure, providing a local and private environment for our applications variavles:

*/

(function()	{
	/* ... */
})();

/* 

We have to surround the anonymous function with braces () before we can execute
it. JavaScript requires this so it can interpret the statement correctly. 

*/