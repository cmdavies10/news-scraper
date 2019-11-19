// $.getJSON("/articles", function (data) {
// 	for (var i = 0; i < data.length; i++) {
// 		$("#title").append(data[i].title);
// 		$(".card").attr("data-id", data[i]._id);
// 		$(".card-header").text(data[i].title);
// 	}
// });

$.getJSON("/articles", function (data) {
	// For each one
	for (var i = 0; i < data.length; i++) {
		$("#articles").append(
			// "<div data-id='" + data[i]._id + "'>" +
			"<p><strong>" + data[i].title + "</strong></p><br/>" +
			"<p>" + data[i].summary + " | " +
			"<a href='" + "https://www.nytimes.com" + data[i].link + "'>" + "Full Article</a></p><br/>" +
			"<button data-id='" + data[i]._id + "' id='add-comment'>Comment</button><br/><hr/>");
		// "<p>" + "<a href='/articles/" + data[i]._id + "' id='add-comment'>Comment</a>" + " | " +
		// "<a href='" + data[i]._id + "'>" + "Edit Comment</a>" + " | " +

		// "<form action='/articles/" + data[i]._id + "' method='POST'>" +
		// "<textarea></textarea>" + "<br/>" +
		// "<button data-id='" + data[i]._id + "'>Add Comment</button>" + "</form > " + "<br/><hr/>");
	}
});

// $(".add-comment").on("click", function () {
// 	console.log("working");
// 	alert("working");
// })

$(document).on("click", "#add-comment", function () {
	// Empty the notes from the note section
	$("#comments").empty();
	// Save the id from the p tag
	var thisId = $(this).attr("data-id");
	console.log(thisId);

	// Now make an ajax call for the Article
	$.ajax({
			method: "GET",
			url: "/articles/" + thisId
		})
		// With that done, add the note information to the page
		.then(function (data) {
			console.log(data);
			// The title of the article
			$("#comments").append("<h2>" + data.title + "</h2>");
			// An input to enter a new title
			$("#comments").append("<input id='titleinput' name='title' >");
			// A textarea to add a new note body
			$("#comments").append("<textarea id='bodyinput' name='body'></textarea>");
			// A button to submit a new note, with the id of the article saved to it
			$("#comments").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

			// If there's a note in the article
			if (data.comment) {
				// Place the title of the note in the title input
				$("#titleinput").val(data.comment.title);
				// Place the body of the note in the body textarea
				$("#bodyinput").val(data.comment.body);
			}
		});
});

// $(document).on("click", "#add-comment", function () {
// 	console.log("working");
// 	$("#comments").empty();
// 	var thisId = $(this).attr("data-id");

// 	$.ajax({
// 		method: "GET",
// 		url: "/articles/" + thisId
// 	}).then(function (data) {
// 		console.log(data);
// 		// The title of the article
// 		$("#comments").append("<h2>" + data.title + "</h2>");
// 		// An input to enter a new title
// 		$("#comments").append("<input id='titleinput' name='title' >");
// 		// A textarea to add a new note body
// 		$("#comments").append("<textarea id='bodyinput' name='body'></textarea>");
// 		// A button to submit a new note, with the id of the article saved to it
// 		$("#comments").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

// 		if (data.note) {
// 			// Place the title of the note in the title input
// 			$("#titleinput").val(data.note.title);
// 			// Place the body of the note in the body textarea
// 			$("#bodyinput").val(data.note.body);
// 		}
// 	});
// });

// $(document).on("click", "#savenote", function () {
// 	// Grab the id associated with the article from the submit button
// 	var thisId = $(this).attr("data-id");

// 	// Run a POST request to change the note, using what's entered in the inputs
// 	$.ajax({
// 			method: "POST",
// 			url: "/articles/" + thisId,
// 			data: {
// 				// Value taken from title input
// 				title: $("#titleinput").val(),
// 				// Value taken from note textarea
// 				body: $("#bodyinput").val()
// 			}
// 		})
// 		// With that done
// 		.then(function (data) {
// 			// Log the response
// 			console.log(data);
// 			// Empty the notes section
// 			$("#comments").empty();
// 		});

// 	// Also, remove the values entered in the input and textarea for note entry
// 	$("#titleinput").val("");
// 	$("#bodyinput").val("");
// });


// app.post("/articles/:id", function (req, res) {
// 	db.Comment.create(req.body).then(function (dbComment) {
// 		return db.Article.findOneAndUpdate({
// 			_id: req.params.id
// 		}, {
// 			comment: dbComment._id
// 		}, {
// 			new: true
// 		});
// 	}).then(function (dbArticle) {
// 		res.json(dbArticle);
// 	}).catch(function (err) {
// 		res.json(err);
// 	});
// });