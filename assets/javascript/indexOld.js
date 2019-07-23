//add buttons to screen based off of top ten popular gifs
function renderButtons() {

    $('#buttons').empty();
  
    for (var i = 0; i < buttons.length; i++) {
      closure(i); 
    }
    buttonClick();
    imageClick();
  }
  renderButtons();
  
  function closure(i) {
  
      var buttonHTML = buttons[i].html;
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + buttonHTML +"&api_key=vELYXV2rb8QAFLPq4pDefvHznuthznT9&limit=10&rating";
  
      $.ajax({
        url: queryURL,
        method: 'GET',
      })
      .done(function(response) {
        
        buttons[i].still = response.data[0].images.downsized_still.url;
        buttons[i].active = response.data[0].images.downsized.url;
  
      })
  
      $("#buttons").append("<div class='btn btn-info btn-block'>" + buttons[i].html + "</div>"); 
  }
  
  //add corresponding still Gif image upon click
  function buttonClick() {
    $("#buttons div").click(function() {
  
      var HTML = $(this).html();
  
      for (var i = 0; i < buttons.length; i++) {
        if (buttons[i].html === HTML) {
  
          $('#gifs').append("<img data-status='still' data-html='" + buttons[i].html + "' src='" + buttons[i].still + "' width='200'/>");
        }
      }
      imageClick();
    }); 
  }
  
  //animate or de-animate gif upon click
  function imageClick() {
    $("#gifs img").click(function() {
  
      var IMG = $(this).data("status");
      var HTML = $(this).data("html");
  
      for (var i = 0; i < buttons.length; i++) {
        if (IMG === "still" && HTML === buttons[i].html) {
          $(this).replaceWith("<img data-status='active' data-html='" + buttons[i].html + "' src='" + buttons[i].active + "' width='200'/>");
          imageClick();
        } else if (IMG === "active" && HTML === buttons[i].html) {
          $(this).replaceWith("<img data-status='still' data-html='" + buttons[i].html + "' src='" + buttons[i].still + "' width='200'/>");
          imageClick();
        }
      }
  
    }); 
  }
  
  // create buttons from input form field
  $("#inputButton").click(function(event) {
    event.preventDefault();
  
    var newButton = $("#inputForm").val();
  
    if (newButton !== "") {
      buttons.push({ html: newButton,
                      still: "",
                      active: ""});
      $('#buttons').empty();
      renderButtons();
    }
    newButton = $("#inputForm").val("");
  
  });

  // remove buttons from button div
  $("#removeButtons").click(function() {
      buttons.pop();
      $("#buttons").empty();
      renderButtons();
  });
  
  // empty gif image area
  $('#emptyGifs').click(function() {
    $('#gifs').empty();
  });