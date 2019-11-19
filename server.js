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
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scrapeData";

mongoose.connect(MONGODB_URI);

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
	// db.articles.remove();

	axios.get("https://www.nytimes.com/section/world").then(function (response) {
		var $ = cheerio.load(response.data);

		$("article").each(function (i, element) {
			var result = {};

			result.title = $(this).find("h2").children("a").text();
			result.link = $(this).find("h2").children("a").attr("href");
			result.img = $(this).find("figure").find("img").attr("src");
			result.summary = $(this).find("p").text();

			db.Article.create(result).then(function (dbArticle) {
				console.log(dbArticle);
			}).catch(function (err) {
				console.log(err);
			});

		});

		console.log("Scrape Complete");
		res.redirect("/");
	});

});

// route for getting all articles
app.get("/articles", function (req, res) {
	db.Article.find({}).then(function (dbArticle) {
		res.json(dbArticle);
	}).catch(function (err) {
		res.json(err);
	});
});