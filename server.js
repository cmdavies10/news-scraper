var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
var exphbs = require("express-handlebars");

var db = require("./models");

var port = process.env.PORT || 3000;

var app = express();

// Configure middleware
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({
	extended: true
}));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// handlebars
app.engine("handlebars", exphbs({
	defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// connect to db
mongoose.connect("mongodb://localhost/scrapeData", {
	useNewUrlParser: true
});

// listen
app.listen(port, function () {
	console.log("Listening on port " + port);
});

// ROUTES ===
// main route -- render index page
app.get("/", function (req, res) {
	res.render("index");
});

// get route for scraping site
app.get("/scrape", function (req, res) {
	axios.get("https://www.nytimes.com/section/world").then(function (response) {
		var $ = cheerio.load(response.data);

		$("article h2").each(function (i, element) {
			var result = {};

			result.title = $(this).children("a").text();
			result.link = $(this).children("a").attr("href");

			console.log(result);

		});

		res.send("Scrape Complete");
	});

});