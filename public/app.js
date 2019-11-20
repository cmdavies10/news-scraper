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
			"<textarea id='bodyinput' name='body' cols='50' rows='10'></textarea><br/>" +
			"<button data-id='" + data._id + "' id='savecomment'>Save Comment</button>" +
			"<button data-id='" + data._id + "' id='deletecomment'>Delete Comment</button></span>"
		);

		if (data.comment) {
			$("#bodyinput").val(data.comment.body);
		};
	});
});

$(document).on("click", "#savecomment", function () {
	var thisId = $(this).attr("data-id");

	$.ajax({
		method: "POST",
		url: "/articles/" + thisId,
		data: {
			title: $("#titleinput").val(),
			body: $("#bodyinput").val()
		}
	}).then(function (data) {
		console.log(data);

		$("#comments").empty();
	});

	$("#titleinput").val("");
	$("#bodyinput").val("");
});

$(document).on("click", "#deletecomment", function () {
	var articleId = $(this).attr("data-id");

	console.log(articleId);

	$.ajax({
		method: "POST",
		url: "/articles/" + articleId
	}).then(function (data) {
		console.log(data);
	}).catch(function (err) {
		console.log(err);
	});

	$("#titleinput").val("");
	$("#bodyinput").val("");
});