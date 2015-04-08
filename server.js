var express = require('express')
  , app = express();

// don't forget to set your environment variables on heroku!
var yelp = require("yelp").createClient({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  token: process.env.TOKEN,
  token_secret: process.env.TOKEN_SECRET
});

app.use(function(req, res, next) {
  // Null allows access from "file:///" urls. Set to your own domain to prevent abuse
  res.set('Access-Control-Allow-Origin', 'null');
  next();
});

app.get("/search", function(req, res, next){

  // See http://www.yelp.com/developers/documentation/v2/search_api
  yelp.search(req.query, function(error, data) {
    if(error){ res.status(400).send(error); }
    else { res.status(200).send(data); }
    next();
  });

})

app.get("/business/:id", function(req, res, next){

  // See http://www.yelp.com/developers/documentation/v2/business
  yelp.business(req.params.id, function(error, data) {
    if(error){ res.status(400).send(error); }
    else { res.status(200).send(data); }
    next();
  });

});

app.use("/", function(req, res, next) {
  // Null allows access from "file:///" urls. Set to your own domain to prevent abuse
  res.status(200).send("See <a href='https://github.com/apprend/yelp'>github.com/apprend/yelp</a> for usage instructions.");
});


app.use(function(req, res, next) {
  res.status(404).send("something went wrong");
});

var port = process.env.PORT || 1234;
app.listen(port);

console.log("listening on port " + port);
