var request = require('request');
var parsedData = {};
function getData() {
    $('#resultsDiv').empty();
    request('https://pixabay.com/api/?key=9176852-528521b115002c31dd0c1b967&q=orange&image_type=photo&total=20&page=1&per_page=10', function (error, response, body) {
        // console.log('error:', error); // Print the error if one occurred
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        // console.log('body:', body); // Print the HTML for the Google homepage.
        if(error){
            console.log('Connection Failed');
        } else {
            if (response.statusCode == 200) {
                parsedData = JSON.parse(body);
                console.log("Number of Images - " + parsedData['hits'].length);
                loadResults();
            } else {
                console.log("Nothing found!");
            }
        }
    });
}


function loadResults() {
    console.log("Results loaded with data size - " + parsedData['hits'].length);
    for(let i = 0; i < parsedData['hits'].length; i++) {
        $resultItem = "<div class='col-sm-3'>"
                    +   "<p>asdfa</p>"
                    + "</div>";
        console.log($resultItem);
        $('#resultsDiv').append($resultItem);
    }
}

$(document).ready(function() {
    $("#searchButton").click(function() {
        getData();
    });
});