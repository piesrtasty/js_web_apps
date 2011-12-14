/*

Intro

Historically, state was managed server side with session cookies. So, whenever users
navigated to a new page, the previous pages state was lost--only the cookies
persisted. JS apps, however, are confined to a single page, which means we can now
store state on the clients memory.

One of the major advantges to storing state on the client is a really responsive
interface. A user gets immediate feedback when interacting with the page, rather
than waiting a few seconds for the next page to load. Speed greatly improves the
user experience, making many JS apps a real pleasure to use.

However, storing state on the client causes challenges as well. Where exactly
should it be stored? In local variables? Perhaps in the DOM? This is where a lot
of developers get led astray, which is an unfortunate state of affairs because
storing state properly is one of the most critical areas to get right.

First you should avoid storing data or state in the DOM. That is just a slippery
slope leading to an entangled mess and anarchy! In our case--since we are using the
tried and tested MVC architecture--state is stored inside our applications
controllers.

What exactly is a controller? Well, you can think of it as the glue btween the
applications views and models. It is the only component aware of the applications
views and models, tying them together. When the page loads, your controller
attraches event handlers to views and processes callbacks appropriately, interfacing
with models as necessary.

You do not need any libs to create controllers, although they can be useful. The
only essential part is that controllers are modular and independent. Ideally, they
should not be defining and gloal variables, instead functioning as fairly 
decoupled components. An excellect way of ensuring this is with the module pattern.

*/
