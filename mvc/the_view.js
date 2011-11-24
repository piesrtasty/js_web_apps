/*

The view layer is whats presented to the user and what he / she interacts with. In a JS app
this would be HTML/CSS/JS. Apart from a few conditionals in js templates the views should
have no logic.

Thats not to say MVC doesnt allow for presentational logic--as long as its not defined inside
views. Presentational logic resides in what are called "helpers": scripts solely for small
utility functions related to the view.

*/

// The example below, which includes logic inside views, is something you should not do

// template.html
<div>
	<script>
		function formatDate(date)	{
			/* ... */
		}
	</script>
</div>
