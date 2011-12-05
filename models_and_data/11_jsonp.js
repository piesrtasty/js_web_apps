/*

JSONP

JSONP, or JSON with padding, was created before CORS was standardized, and is another
way of fetching data from remote servers. The idea is that you have a script tag that
points to a JSON endpoint where returned data is wrapped in a function invocation.
Script tags are not subject to any cross-domain limitations, and this technique is
supported in practically every browser.

So, here we have a script tag that points to our remote server:

*/

<script src="http://example.com/data.json"> </script>

// Then the endpoint, data.json, returns a JSON object wrapped in a function invocation
jsonCallback({"data": "foo"})

// We then dfine a globally accessible function. Once the script has loaded, this
// function will be called:
window.jsonCallback = function(result)	{
	// Do stuff with the result
}

// As it is, this is a fairly convoluted process. Luckily, jQuery wraps it in an API
jQuery.getJSON("http://example.com/data.json?callback=?", function(result)	{
	// Do stuff with the result
});

/*

jQuery replaces the last question mark in the above URL with a random name of a temp
function it creates. Your server needs to read the callback parametor and use that
as the name of the returned wrapping function.