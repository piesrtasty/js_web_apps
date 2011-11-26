
/*

The Event Object

As well as the aforementioned functions--stopPropagation() and preventDefault()--the event object contains a lot of useful properties. Most of the properties in the W3C
spec are documented below....full spec => http://www.w3.org/TR/DOM-Level-2-Events/

## Type of event:

bubbles - A boolean indicating whether the event bubbles up through the DOM


## Properties reflecting the environment when the event was executed:

button - A value indicating which, if any, mouse button(s) was pressed

ctrlKey - A boolean indicating whether the Ctrl key was pressed

altKey - A boolean indicating whether the Alt key was pressed

shiftKey - A boolean indicating whether the Shift key was pressed

metaKey - A boolean indicating whether the Meta key was pressed


## Properties specific to keyboard events:

isChar - A boolean indicating whether the event has a key character

charCode - A unicode value of the pressed key (for keypress events only)

keyCode - A unicode value of a noncharacter key

which - A unicode value of the pressed key, regardless of whether its a character


## Where the event happened:

pageX, pageY - The event coordinates relative to the page (i.e., viewport)

screenX, screenY - The event coordinates relative to the screen


## Elements associated with the event:

currentTarget - The current DOM element within the event bubbling phase

target, originalTarget - The original DOM element

relatedTarget - The other DOM element involved in the event, if any


These properties vary in browsers, especially among those that are not
W3C-compliant. Luckily, libraries like jQuery and Prototype will smooth out
any differences.

*/