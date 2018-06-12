var request = require('request');
var parsedData = {};
function getData() {
    var query = $('#searchBox').val();
    $('#resultsContainer').empty();
    request('https://pixabay.com/api/?key=9176852-528521b115002c31dd0c1b967&q=' + encodeURI(query) + '&image_type=photo&total=20&page=1&per_page=30', function (error, response, body) {
        // console.log('error:', error); // Print the error if one occurred
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        // console.log('body:', body); // Print the HTML for the Google homepage.
        if(error){
            console.log('Connection Failed');
            $('#resultsContainer').append("<div class='row'><p>Connection error!</p></div>");
        } else {
            if (response.statusCode == 200) {
                parsedData = JSON.parse(body);
                if(parsedData['hits'] == 0) {
                    $('#resultsContainer').append("<p>No Images found!</p>");
                } else {
                    console.log("Number of Images - " + parsedData['hits'].length);
                    console.log("Body", parsedData);
                    loadResults();
                }
            } else {
                console.log("Nothing found!");
                $('#resultsContainer').append("<p>Error!</p>");
            }
        }
    });
}


function loadResults() {
    console.log("Results loaded with data size - " + parsedData['hits'].length);
    for(let i = 0; i < parsedData['hits'].length; i++) {
        $resultItem = "<div class='shadow'>"
                    +   "<div class='imgDiv'>"
                    +       "<a href='"+ parsedData['hits'][i]['largeImageURL'] + "' target='_blank'><img class='image' src='"+ parsedData['hits'][i]['webformatURL'] +"'></a>"
                    +   "</div></div>";
        console.log($resultItem);
        $('#resultsContainer').append($resultItem);
        
        var image = $(".image");
        var container = $(".imgDiv");
        function getAspectRatio(element) {
            var width = element.width();
            var height = element.height();
            return width / height;
        }       
        function centerImage() {
            if (getAspectRatio(image) > getAspectRatio(container)) {
                image.height("100%");
                image.width("auto");
            } else {
                image.height("auto");
                image.width("100%");
            }
        }
        centerImage();
    }
}

$(document).ready(function() {
    $("#searchButton").click(function() {
        getData();
    });
});