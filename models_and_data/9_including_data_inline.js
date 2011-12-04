/*

I do not really advocate this approach for the reasons I outlined in the previous section,
but it can be useful in specific situations, especially for loading in a very small amount
of data. This technique has the advantage of being really simple to implement.

All you need to do is render a JSON object directly into the page. For example, here is
how you would do it with Ruby on Rails:

*/

var User = {};
User.records = <%= raw @users.to_json %>;

/*

We are using ERB tags to output a JSON interpretation of the user data. The raw method is
simply to stop the JSON from being escaped. When the page is rendered, the resulting HTML
looks like this:

*/

var User = {};
User.records = [{"first_name": "Alex"}];

// JavaScript can just evaluate the JSON as-is because it has the same structure as a JS
// object.