/*

Loading in Data

Unless your web application is entirely restricted to the browser, you will need
to load in remote data from a server. Typically, a subset of data is loaded when the
application starts, and more data is loaded after the interaction. Depending on the
type of application and the amount of data, you may be able to load everything you
need on the initial page load. This is ideal, so users never have to wait for more
data to be loaded. However, this is not feasible for a lot of applications because
there is too much data to fit comfortably in a browsers memory.

Preloading data is crucial to making your application feel slick and fast to your users,
keeping any waiting time to a minimum. However, there is a fine line between preloading
data that is actually accessed and loading redundant data that is never used. You need
to predict what sort of data your users will want (or use metrics).

If you are displaying a paginated list, why not preload the next page so transitions are
instant? Or, even better, just display a long list and automatically load and insert data
as the list is scrolled (the infinite scroll pattern). The less latency a user feels
the better.

When you do fetch new data, make sure the UI is not blocked. Display some sort of loading
indicator, but make sure the interface is still usable. There should be very few
scenarios, if any, that require blocking the UI.

Data can be present inline in the initial page or loaded with separate HTTP requests
through AJAX or JSONP. Personally, I would reccomend the latter two technologies, as 
including a lot of data inline increases the page size, whereas parallel requests load
faster. AJAX and JSONP also let you cache the HTML page, rather than dynamically render it
for every request.