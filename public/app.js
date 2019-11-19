$.getJSON("/articles", function (data) {
	// For each one
	for (var i = 0; i < data.length; i++) {
		$("#articles").append(
			// "<div data-id='" + data[i]._id + "'>" +
			"<p><strong>" + data[i].title + "</strong></p><br/>" +
			"<p>" + data[i].summary + " | " +
			"<a href='" + "https://www.nytimes.com" + data[i].link + "'>" + "Full Article</a></p><br/>" +
			// "<p id='comments'></p><br/>" +
			// "<textarea placeholder='Insert comment'></textarea>" +
			"<button data-id='" + data[i]._id + "' id='add-comment'>Comment</button><br/><hr/>");
		// "<p>" + "<a href='/articles/" + data[i]._id + "' id='add-comment'>Comment</a>" + " | " +
		// "<a href='" + data[i]._id + "'>" + "Edit Comment</a>" + " | " +

		// "<form action='/articles/" + data[i]._id + "' method='POST'>" +
		// "<textarea></textarea>" + "<br/>" +
		// "<button data-id='" + data[i]._id + "'>Add Comment</button>" + "</form > " + "<br/><hr/>");
	}
});

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
	}).then(function (data) {
		console.log(data);
		// The title of the article
		$("#comments").append(
			"<div><h5>" + data.title + "</h5><br/>" +
			// "<input id='titleinput' name='title'><br/>" +
			"<textarea id='bodyinput' name='body'></textarea><br/>" +
			"<button data-id='" + data._id + "' id='savecomment'>Save Comment</button></div>"
		);

		// If there's a note in the article
		if (data.comment) {
			// Place the title of the note in the title input
			$("#titleinput").val(data.comment.title);
			// Place the body of the note in the body textarea
			$("#bodyinput").val(data.comment.body);
		}
	});
});

$(document).on("click", "#savecomment", function () {
	// Grab the id associated with the article from the submit button
	var thisId = $(this).attr("data-id");

	// Run a POST request to change the note, using what's entered in the inputs
	$.ajax({
			method: "POST",
			url: "/articles/" + thisId,
			data: {
				// Value taken from title input
				title: $("#titleinput").val(),
				// Value taken from note textarea
				body: $("#bodyinput").val()
			}
		})
		// With that done
		.then(function (data) {
			// Log the response
			console.log(data);
			// Empty the notes section
			$("#comments").empty();
		});

	// Also, remove the values entered in the input and textarea for note entry
	$("#titleinput").val("");
	$("#bodyinput").val("");
});