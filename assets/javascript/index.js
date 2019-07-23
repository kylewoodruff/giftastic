$(document).ready(function () {
    const movies = ["Terminator", "Rocky", "RoboCop", "Ferris Buller", "ET", "Back to the Future"];

    function renderButtons() {
        $("#preload-buttons").empty();
        movies.forEach(element => {
            $("#preload-buttons").append("<button class='btn btn-secondary ml-3' data-movie='" + element + "'>" + element + "</button>");
        });
    }
    renderButtons();

    $("#add-movie").on("click", function () {
        event.preventDefault();
        var movie = $("#user-entry").val().trim();
        movies.push(movie);
        renderButtons();
        return;
    });
    $("#user-entry").keypress(function (e) {
        //Enter key pressed
        if (e.which == 13) {
            //Trigger search button click event
            $('#add-movie').click();
        }
    });

    $("button").on("click", function () {
        let movie = $(this).attr("data-movie");
        let queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            movie + "&api_key=vELYXV2rb8QAFLPq4pDefvHznuthznT9&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            let results = response.data;
            $("#gifs").empty();
            results.forEach(i => {
                let newDiv = $("<div>");
                let p = $("<p>").text("Rating: " + i.rating);
                let img = $("<img>");
                img.attr("src", i.images.original_still.url);
                img.attr("data-still", i.images.original_still.url);
                img.attr("data-animate", i.images.original.url);
                img.attr("data-state", "still");
                img.attr("class", "gif");
                newDiv.append(img);
                newDiv.append(p);
                $("#gifs").append(newDiv);
            });
        });

        function changeState(){
            var state = $(this).attr("data-state");
            var animateImage = $(this).attr("data-animate");
            var stillImage = $(this).attr("data-still");
    
            if (state == "still") {
                $(this).attr("src", animateImage);
                $(this).attr("data-state", "animate");
            }
    
            else if (state == "animate") {
                $(this).attr("src", stillImage);
                $(this).attr("data-state", "still");
            }
        }
        $(document).on("click", ".gif", changeState);
    });
});