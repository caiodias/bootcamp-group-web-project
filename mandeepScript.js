var countryName;
var request = require('request');
function getData() {
    countryName = document.querySelector("#country_name").value;
    request('http://api.openweathermap.org/data/2.5/weather?q='+encodeURI(countryName)+'&units=metric&appid=8d7071faebf065763f900f514ca03c76', function (error, response, body) {
    //   console.log('error:', error); // Print the error if one occurred
    //   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    //   console.log('body:', body); // Print the HTML for the Google homepage.
    if (error) {
        console.log("something went wrong");
        document.getElementById("temp").innerHTML = "Connection error";
        console.log(error);
    } else {
        var parsedData = JSON.parse(body);
        console.log(parsedData);
        if (parsedData['cod'] == 200) {
            document.getElementById("temp").innerHTML = parsedData['main']['temp'] + " &deg;C";
        } else {
            document.getElementById("temp").innerHTML = "City not found";
        }
        //window.alert(parsedData);
    }
    });
}
document.querySelector("#country_name").onkeyup = function() {
    if (event.keyCode == 13) {
        console.log("Enter pressed!");
        getData();
    }
};
document.getElementById("myBtn").onclick = getData;
