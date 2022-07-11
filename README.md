# ScottyLabs Go Links

Dynamically create short `go.scottylabs.org` links using a Google Spreadsheet.

## Usage
Add the name of the route to use on the first column of the spreadsheet. Routes correspond to a route on the `go.scottylabs.org` subdomain
e.g.

`path` => `go.scottylabs.org/path`

Fill in the corresponding redirect location on the second column of the routes spreadsheet.

## Support
When the token expires, use the ScottyLabs email for Google APIs to generate a new token. 
* Set the Heroku environment variable `get_new_token` to `true` and restart the program. 
  * Make sure you are logged into the ScottyLabs email when you do this as you will be prompted to authenticate the app with it on the console. 
* Follow the instructions presented to retrieve the new `refresh_token`. 
* Update the `refresh_token` stored in the Heroku environment variables with the newly retrieved one. 
* Restart the program
