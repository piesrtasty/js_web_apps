/*

Loading Data with Ajax

This is probably the first method of loading remote data that springs to mind when
you hear background requests, and for good reason: it is tried, tested, and
supported in all modern browsers. That is not to say that AJAX is without its
drawbacks--its unstandardized history has resulted in an inconsistent API and, due
to browser security, loading data from different domains is tricky.

In all likelihood you will end up using a library like jQuery that abstracts Ajaxs
API, massaging out the differences among browsers. For that reason, we will cover
jQuerys API here, rather than the raw XMLHttpRequest class.

jQuerys Ajax API consists of one low level function, jQuery.ajax(), and several
higher abstractions of it, reducing the amount of code you need to write.
jQuery.ajax() takes a hash of settings for request parameters, content type, and
callbacks, among others. As soon as you call the function, the request is
asynchronously sent in the background.

url - The request url. The default is the current page.

success - A function to be called if the request succeeds. Any data returned from
the server is passed as a parameter.

contentType - Sets the Content-Type header of the request. If the request contains
data, the default is application/x-www-form-urlencoded, which is fine for most
cases.

data - The data to be sent to the server. If it is not already a string, jQuery will
serialize and URL-encode it.

type - The HTTP method to use: GET, POST, or DELETE. THe default is GET.

dataType - The type of data you are expecting back from the server. jQuery needs to
know this so it knows what to do with the result. If you do not specify a dataType,
jQuery will do some intelligent guessing based on the MIME type of the response.
Supported values are:

	test - Plain-text response; no processing is needed.
	
	script - jQuery evaluates the response as JavaScript.
	
	json - jQuery evaluates the response as JSON, using a strict parser.
	
	jsonp - For JSONP requests, which we will cover in detail later.
	
*/

// For example, let us do a simple AJAX request, which alerts whatever data
// returned by the server.

jQuery.ajax({
	url: "/ajax/endpoint",
	type: "GET",
	success: function(data)	{
		alert(data);
	}
});

/*

However, all those options are a big verbose. Luckily, jQuery has a few shortcuts.
jQuery.get() takes a URL and optional data and callback:

*/

jQuery.get("/ajax/endpoint", function(data)	{
	$(".ajaxResult").text(data);
});

// Or, if we want to send a few query parameters with the GET request:

jQuery.get("/ajax/endpoint", {foo: "bar"}, function(data)	{
	/* ... */
});

/*

If we are expecting JSON back from the server, we need to call jQuery.getJSON()
instead, which sets the requests dataType option to "json":

*/

jQuery.getJSON("/json/endpoint", function(json)	{
	/* ... */
});

// Likewise, there is a jQuery.post() function, which also takes a URL, data, and
// callback:

jQuery.post("/users", {first_name: "Alex"}, function(result)	{
	/* Ajax POST was a success */
});

/*
If you want to use other HTTP methods--DELETE, HEAD, and OPTIONS--you will have to
use the lower-level jQuery.ajax() function.

A limitation of Ajax is the same origin policy, which restricts requests to the
same domain, subdomain, and port as the address of the page from which they are
made. There is a good reason for this: whenever an Ajax request is sent, all that
domains cookie information is sent along with the request. Thhat means, to the
remote server, the request appears to be from a logged-in user. Without the same
origin policy, an attacker could potentially fetch all our emails from Gmail,
update your Facebook status, or direct message your followers on Twitter--quite
a security flaw.

However, while the same origin policy is integral to the security of the Web, it
is also somewhat inconvenient for developers trying to access legitimate remote
resources. Other technologies like Adobe Flash and Java have implemented
workarounds to the problem with cross-domain policy files, and now Ajax is catching
up with a standatrd called CORS, or cross-origin resource sharing.

CORS lets you break out of the same origin policy, giving you acess to authorized
remote servers. The spec is well supported by the major browsers, so unless you
are using IE6, you should be fine.

CORS support by browser:

- IE >= 8 (with caveats)
- Firefox >= 3
- Safari: full support
- Chrome: full support
- Opera: no support

Using CORS is trivially easy. If you want to authorize access to your server, just
add a few lines to the HTTP header of the returned responses:

*/

Access-Control-Allow-Origin: example.com
Access-Control-Request-Method: GET, POST

/*

The above header will authorize cross-origin GET and POST requests from
example.com. You should separate multiple values with commas, as with the GET, POST
values above. To allow access from additional domains, just list them
comma-separated in the Access-Control-Allow-Origin header. Or, to give any domain
access, just set the origin header to an asterisk (*).

Some browsers, like Safari, will first make an OPTIONS request to check whether the
request is allowed. Firefox, on the other hand, will make the request and just
raise a security exception if the CORS headers are not set. You will need to take
account of this different behavior server side.

You can authorize custom request headers using the Access-Control-Request-Headers
heder:

*/

Access-Control-Request-Headers: Authorization

/*

This means that clients can add custom domain headers to Ajax requests, such as
signing the request with OAuth:

*/

var req = new XMLHttpRequest();
req.open("POST", "/endpoint", true);
req.setRequestHeader("Authorization", oauth_signature);

/*

Unfortunately, while CORS works with version of IE 8 and higher. Microsoft chose
to ignore the spec and the working group. Microsoft created its own object,
XDomainRequest, which is to be used instead of XMLHttpRequest, it has a number of
restrictions and limitations. For example only GET and POST methods work, no
authentication or custom headers are supported, and finally, the kicker--only the
"ContentType: text/plain" is supported. If you are prepared to work around those
restrictions--with the correct Access-Control headers--you can get CORS working in
IE.

*/