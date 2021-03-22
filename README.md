# Ben Carp Assignment to Optibus

[Visit Repo](https://github.com/carpben/drivers-assignments)

[Visit App](https://optibus-51e7c.web.app/)

## Live Persistent data

Google Firebase was used for data persistency. It allowed me to easily create a live data connection. I took advantage of this feature to allow multiple users to use the app, and at the same time be updated of changes made by others.

**To view experience of multiple users open the app in two separate windows**

This is a json based persistent data manged from the client. Managing data in such a way has the following disadvantages:

1. As far as I know there is no easy way to query the data.
2. Data is managed from the client. No separation of concerns. Also might less safe under certain circumstances.

## Known Issues

-  I use inline css in js in nested components. This is debatable.
-  App is not mobile friendly

## Full discolusre

I consulted another programmer about the firebase database.
