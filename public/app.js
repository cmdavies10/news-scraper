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
		$("#articles").append("<div data-id='" + data[i]._id + "'>" + "<p>" + data[i].title + "</p>" + "<br />" + "<p>" + data[i].summary + "</p>" + "<br/>" + "<p>" + "<a href='#' id='add-comment' data-id='" + data[i]._id + "'>" + "Comment" + "</a>" + " | " + "<a href='" + "https://www.nytimes.com" + data[i].link + "'>" + "Read Full Article" + "</a>" + "</p>" + "<br/>" + "<hr/>" + "</div>");
	}
});

$(document).on("click", "#add-comment", function () {
	$("#comments").empty();
	var thisId = $(this).attr("data-id")
})