/*

Security with Cross-Domain Requests

If you are opening up your server to cross-origin requests or JSONP from any
domain you have got to really think about security. Usually the cross-origin
domain policy stops an attacker from calling say, Twitters API, and fetching
your personal data. CORS and JSONP change all of that. As with a normal Ajax
request, all your session cookies are passed with the request, so you will be
loggd into Twitters API. Any potential attackers have full control over your
account; security considerations are therefore paramount.

With this in mind, here are some key points to take into account when using
CORS/JSONP if you are not controlling which domains can access your API:

- do not reveal any sensitive info, such as email addresses.
- do not allow any actions (like a Twitter "Follow")

Or alternatively, to mitigate those security issues, just have a whitelist of
domains that can connect, or you can use OAuth authentication exclusively.

*/