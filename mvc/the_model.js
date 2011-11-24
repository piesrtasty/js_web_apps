/* 

The model is where all the application's data objects are stored. For example a User Model would contain a list of users, their attributes, and any logic associated specifically with that  model.

A model doesn't kow about controllers / views. It should only contain its data and the logic
directly associated with that data. ( i.e. Any event handling code, view templates, or logic
not specific to that model should not be a part of it. ).

When controllers fetch data from servers or create new records, they wrap them in model
instances.
