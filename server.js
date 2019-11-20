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
	db.Article.find({}, function (err, data) {
		if (data.length === 0) {
			res.render("index", {
				message: "Scrape to get data."
			});
		} else {
			res.render("index", {
				articles: data
			});
		}
	})
	// res.render("index");
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

// route to get all comments
app.get("/comments", function (req, res) {
	db.Comment.find({}).then(function (dbComment) {
		res.json(dbComment);
	}).catch(function (err) {
		res.json(err);
	});
});

// grab an article and populate it with it's comments
app.get("/articles/:id", function (req, res) {
	db.Article.findOne({
		_id: req.params.id
	}).populate("comment").then(function (dbArticle) {
		res.json(dbArticle);
	}).catch(function (err) {
		res.json(err);
	});
});

app.post("/articles/:id", function (req, res) {
	db.Comment.create(req.body).then(function (dbComment) {
		return db.Article.findOneAndUpdate({
			_id: req.params.id
		}, {
			comment: dbComment._id
		}, {
			new: true
		});
	}).then(function (dbArticle) {
		res.json(dbArticle);
	}).catch(function (err) {
		res.json(err);
	});
});

app.post("/articles/:id", function (req, res) {
	db.Article.findOneAndUpdate({
		_id: req.params.id
	}, {
		comment: []
	}).then(function (dbArticle) {
		res.json(dbArticle);
	}).catch(function (err) {
		res.json(err);
	});
});

app.delete("/comments/:id", function (req, res) {
	console.log("Params: " + req.params.id);
	// console.log(dbComment._id);

	db.Comment.remove({
		_id: req.params.id
	}).then(function (dbComment) {
		console.log("Deleted Successfully");
	}).catch(function (err) {
		console.log(err);
	});
});

app.delete("/articles/:id", function (req, res) {
	console.log("Params: " + req.params.id);
	console.log(dbComment._id);

	db.Article.remove({
		_id: dbComment._id
	}).then(function (dbArticle) {
		console.log("Deleted Successfully");
	}).catch(function (err) {
		console.log(err);
	});
});