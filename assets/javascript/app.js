$(document).ready(function() {

// array of fun things 
var topics = ["money", "vacation", "love", "shopping", "reactions"];
//console.log(topics);

// displays array of buttons on html page
function displayGifButtons() {
    $("#gifButtons").empty();
    for (var i = 0; i < topics.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("giphyButton");
        newButton.attr("data-name", topics[i]);
        newButton.text(topics[i]);
        $("#gifButtons").append(newButton);
    }
}

displayGifButtons();

// Adding movie from the textbox to our array & adding to html page
    $("#addGif").on("click", function(event) {
        event.preventDefault();
        var gifSearch = $("#gifInput").val().trim();
        //console.log(gifSearch);
        topics.push(gifSearch);
        //console.log(topics);
        displayGifButtons();
    })

// function to display all of the gifs 
    $(document).on("click", ".giphyButton", displayGifs);

function displayGifs() {
    var action = $(this).attr("data-name");
    //console.log(action);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + action + "&api_key=nBE0Erl0kd1FstNZ9qX958MTeqmw5Cvr&limit=10";
    //console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .done(function(response) {
    //console.log(response);
        $("#viewGifs").empty();
    var results = response.data;
    //console.log(results);
    for (var i = 0; i < results.length; i++) {
    var topicDiv = $("<div>");
    var gifRating = $("<p>").text("Rated " + results[i].rating);
    topicDiv.append(gifRating);
    // console.log(gifRating)
    var showImage = $("<img>");
    showImage.attr("src", results[i].images.fixed_height.url);
    showImage.attr("data-still", results[i].images.fixed_height_still.url);
    topicDiv.append(showImage);
        $("#viewGifs").prepend(topicDiv);   
    }

// function to play & pause gifs
// function not working correctly
    $(showImage).on("click", function(event) {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
        });
});
}
})