// $.getJSON("/articles", function (data) {
// 	// For each one
// 	for (var i = 0; i < data.length; i++) {
// 		$("#articles").append(
// 			// "<div data-id='" + data[i]._id + "'>" +
// 			"<br/><img src='" + data[i].img + "' height='400' width='700'><br/><br/>" +
// 			"<h3>" + data[i].title + "</h3><br/>" +
// 			"<p>" + data[i].summary + " | " +
// 			"<a href='" + "https://www.nytimes.com/" + data[i].link + "'>" + "Full Article</a></p><br/>" +
// 			// "<p id='comments'></p><br/>" +
// 			// "<textarea placeholder='Insert comment'></textarea>" +
// 			"<button data-id='" + data[i]._id + "' id='add-comment' class='btn btn-primary'>Comment</button><br/><hr/>");
// 		// "<p>" + "<a href='/articles/" + data[i]._id + "' id='add-comment'>Comment</a>" + " | " +
// 		// "<a href='" + data[i]._id + "'>" + "Edit Comment</a>" + " | " +

// 		// "<form action='/articles/" + data[i]._id + "' method='POST'>" +
// 		// "<textarea></textarea>" + "<br/>" +
// 		// "<button data-id='" + data[i]._id + "'>Add Comment</button>" + "</form > " + "<br/><hr/>");
// 	}
// });

$(document).on("click", "#add-comment", function () {
	$("#comments").empty();

	var thisId = $(this).attr("data-id");
	console.log(thisId);


	$.ajax({
		method: "GET",
		url: "/articles/" + thisId
	}).then(function (data) {
		console.log(data);

		// if (data.comment === null) {
		$("#comments").append(
			"<h5>" + data.title + "</h5><br/>" +
			// "<input id='titleinput' name='title'><br/>" +
			"<textarea id='bodyinput' name='body' cols='50' rows='10'></textarea><br/>" +
			"<button data-id='" + data._id + "' id='savecomment'>Save Comment</button>" +

			// UPDATE data._id vs. data.comment._id ================
			// "<button value='" + data._id + "' data-id='" + data.comment._id + "' id='deletecomment'>Delete Comment</button></span>"
			"<button data-id='" + data._id + "' id='deletecomment'>Delete Comment</button></span>"

		);
		// } else {
		// 	$("#comments").append(
		// 		"<h5>" + data.title + "</h5><br/>" +
		// 		// "<input id='titleinput' name='title'><br/>" +
		// 		"<textarea id='bodyinput' name='body' cols='50' rows='10'></textarea><br/>" +
		// 		"<button data-id='" + data._id + "' id='savecomment'>Save Comment</button>" +

		// 		// UPDATE data._id vs. data.comment._id ================
		// 		"<button value='" + data._id + "' data-id='" + data.comment._id + "' id='deletecomment'>Delete Comment</button></span>"

		// 	);
		// }


		// If there's a comment in the article
		if (data.comment) {
			// Place the title of the note in the title input
			// $("#titleinput").val(data.comment.title); // not using
			// Place the body of the note in the body textarea
			$("#bodyinput").val(data.comment.body);
		};
	});
});

$(document).on("click", "#savecomment", function () {
	// Grab the id associated with the article from the submit button
	var thisId = $(this).attr("data-id");

	// Run a POST request to change the comment, using what's entered in the inputs
	$.ajax({
		method: "POST",
		url: "/articles/" + thisId,
		data: {
			// Value taken from title input
			title: $("#titleinput").val(),
			// Value taken from comment textarea
			body: $("#bodyinput").val()
		}
	}).then(function (data) {
		// Log the response
		console.log(data);

		$("#comments").empty();
	});

	// Also, remove the values entered in the input and textarea for note entry
	$("#titleinput").val("");
	$("#bodyinput").val("");
});

$(document).on("click", "#deletecomment", function () {
	var articleId = $(this).attr("data-id");
	// var articleId = $(this).attr("value");

	// console.log(commentId);
	console.log(articleId);

	$.ajax({
		method: "POST",
		url: "/articles/" + articleId
	}).then(function (data) {
		console.log(data);
	}).catch(function (err) {
		console.log(err);
	});

	// $.ajax({
	// 	method: "DELETE",
	// 	url: "/comments/" + commentId
	// }).then(function (data) {
	// 	console.log(data);
	// 	$("#comments").empty();
	// }).catch(function (err) {
	// 	console.log(err);
	// });

	// $.ajax({
	// 	method: "DELETE",
	// 	url: "/articles/" + articleId
	// }).then(function (data) {
	// 	console.log(data);
	// 	$("#comments").empty();
	// }).catch(function (err) {
	// 	console.log(err);
	// });

	$("#titleinput").val("");
	$("#bodyinput").val("");
});