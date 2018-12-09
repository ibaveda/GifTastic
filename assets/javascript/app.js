var sports = ["Basketball", "Baseball", "Football", "Hockey", "Soccer", "Skiing", "Climbing", "Ping-Pong", "Volleyball"];
      
    //Function to create(render) buttons
    function renderButtons() {
      $(".buttons-view").empty();
      for (var i = 0; i < sports.length; i++) {
        var gifButton = $("<button>");
          gifButton.addClass("sport btn btn-default");
          gifButton.attr("data-name", sports[i]);
          gifButton.text(sports[i]);
          $(".buttons-views").append(gifButton);
          console.log(sports[i]);
      }
    };
      

    $("#add-gif").on("click", function(event) {
      event.preventDefault();
      
    
      var gif = $("#gif-input").val().trim();
      var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=9QC38vpbZuKtfCNXGmvxTy1w5afiZrDm&q=" + gif +"gif&limit=10&offset=&rating=PG-13&lang=en";


      //Create AJAX call for the gif
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {

        if (response.data.length == 0) {
            alert("No Gifs found for sport");
        }
        else if (sports.indexOf(gif) != -1) {
            alert("This sport has been entered already");
        }
        else {
        sports.push(gif);
        renderButtons();
            console.log(response);
    }




      });

    
  });

      

      //Function to display gifs
        function displayGifs() {
            var gif = $(this).attr("data-name");
            var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=9QC38vpbZuKtfCNXGmvxTy1w5afiZrDm&q=" + gif +"gif&limit=10&offset=&rating=PG-13&lang=en";

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response){
console.log(response);

                $(".gifs-view").empty();
                for (var i = 0; i < response.data.length; i++) {
                    var gifDiv = $("<div>");
                    gifDiv.addClass("gifDiv");
                    gifDiv.html("<p>Rating" + response.data[i].rating + "</p>");

                    var gifImage = $("<img src='" + response.data[i].images.fixed_height_still.url + "'>");
                    gifImage.addClass("gif");

                    var imageDiv = $("<div>");
                    imageDiv.addClass("play");
                    imageDiv.attr("data-state", "still");
                    imageDiv.attr("data-name", gif);
                    imageDiv.attr("data-still", reponse.data[i].images.fixed_height_still.url);
                    imageDiv.attr("data-animate", response.data[i].images.fixed_height.url)

                    $(imageDiv).append(gifImage);
                }
            });
        }

            //Function to play gifs from still
        
        $(document).on("click", ".sport", displayGifs);
        

     renderButtons();   
    