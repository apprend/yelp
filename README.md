# Apprend Yelp

This is a simple express app that allows you use the Yelp API (v2) with your web app.

## Installation

1. Clone this repo
2. run `npm install`
3. Setup your environment variables (see `server.js` for expected names)

## Use Locally

### Modify 'Access-Control-Allow-Origin' Header

By default, the 'Access-Control-Allow-Origin' is set to 'null' to only allow connections from `file:///` urls (double click on index.html). You should change this in `server.js` to be "\*" for local testing.

### Start the server

```
$ node server.js
```

### Make a request

You can now access the express server at `http://localhost:1234`, and treat that url as if it were `http://api.yelp.com/v2` when making requests.

```bash
# Fails - you're not authenticated
$ curl http://api.yelp.com/v2/search?location=San+Francisco

# Success - auth negotiated by local server
$ curl http://localhost:1234/search?location=San+Francisco
```

[Yelp Docs]() for full explanation of options. This server only exposes the yelp `/search` and `/business` endpoints.

## Use in Production

### Modify 'Access-Control-Allow-Origin' Header

By default, the 'Access-Control-Allow-Origin' is set to 'null' to only allow connections from `file:///` urls (double click on index.html). You should change this in `server.js` to be the domain of your production app.

### Other notes

Make sure you set heroku environment variables before you deploy there, and remember that this server has not been tested in a production environment. You'll want to experiment with better route error handling and more robust caching before trusting this on a live site - PR's appreciated.
