//=require jquery
//=require bootstrap-sprockets


$("#itunes-button").hide();

$("button").click(function(){
  // $('.movieField').reset();
  $("#itunes-button").hide();
  var baseUrl = "http://www.omdbapi.com/?t=";
  var userMovieTitle=$("#movie_title").val();
  var giphyUrl="http://api.giphy.com/v1/gifs/search?q=";
  var itunesUrl="https://itunes.apple.com/search?term=";

  $.ajax({
     url: baseUrl + userMovieTitle,
     method: 'GET',
     success: function(movieData, status){
       var title=movieData.Title;
       var year=movieData.Year;
       var plot=movieData.Plot;
       var error=movieData.Error;

       if ("Error" in movieData) {
         $('#movieTitle').text("");
         $('#movieYear').text("");
         $('#moviePlot').text("");
         $('#movieError').text(error);
         $("#movieGif").attr("src","https://c2.staticflickr.com/8/7198/6861116206_221b8ec12f_b.jpg");
         $("#movieGif").height("40%");
         $("#movieGif").width("40%");
       } else{
         $('#movieTitle').text(title);
         $('#movieYear').text(year);
         $('#moviePlot').text(plot);
         $('#movieError').text("");
         $("#app-description").text("");
         $("#itunes-button").show();
       }
     }
   });

   $.ajax({
     url: giphyUrl+userMovieTitle+"&api_key=dc6zaTOxFJmzC",
     method: 'GET',
     success: function(giphy, status){
       var gif=giphy.data[0].images.fixed_height.url;
       $("#movieGif").attr("src",gif);
     }
   });

   $.ajax({
     url: itunesUrl+userMovieTitle+"&limit=1", dataType: 'JSONP',
     method: 'GET',
     success: function(itunesData, status){
       var itunesLink=itunesData.results[0].trackViewUrl
;
       $("#itunes-link").attr("href",itunesLink);
     }
   });
});
