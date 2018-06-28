/// <reference path='../typings/globals/jquery/index.d.ts'/>

$(function() {
    var countryName;
    var $countryInput = $('#country_name');
    let dropdown = document.getElementById('request-dropdown');
    dropdown.length = 9;
    let defaultOption = document.createElement('option');
    defaultOption.text = 'Temperature';

    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;

    var setTitle = document.getElementById("title");
    var setResult = document.getElementById("temp");

    var request = require('request');
    var parsedData;




    function getSeletedData(selection) {
        if (selection == "temp") {
            setTitle.textContent = "Temperature is :";
            console.log("temp selected");
            setResult.innerHTML = parsedData['main']['temp'] + " &deg;C";
        } else if (selection == "weather") {
            setTitle.textContent = "Weather is :";
            console.log(parsedData["weather"][0]["description"])
            setResult.innerHTML = parsedData['weather'][0]['description'];
        } else if (selection == "wind") {
            setTitle.textContent = "Wind speed is :";
            setResult.innerHTML = parsedData['wind']['speed'];
        } else if (selection == "clouds") {
            setTitle.textContent = "Clouds will cover :";
            setResult.innerHTML = parsedData['clouds']['all'] + "% Sky";
        } else if (selection == "coord") {
            setTitle.textContent = "Location Cordinates are :";
            setResult.innerHTML = parsedData['coord']['lon'] + " Lon and " + parsedData['coord']['lat'] + " lat";
        } else if (selection == "pressure") {
            setTitle.textContent = "Today Pressure is :";
            setResult.innerHTML = parsedData['main']['pressure'];
        } else if (selection == "humidity") {
            setTitle.textContent = " Humidity :";
            setResult.innerHTML = parsedData['main']['humidity'];
        } else if (selection == "minMaxTemp") {
            setTitle.textContent = "Minimum and Maximum Temp";
            setResult.innerHTML = "Min: " + parsedData['main']['temp_min'] + " &deg;C" + " Max: " + parsedData['main']['temp_max'] + " &deg;C";
        } else if (selection == "visibility") {
            setTitle.textContent = "Visibility :";
            setResult.innerHTML = parsedData['visibility'];
        } else {
            setTitle.textContent = "Work is pending :";
            setResult.innerHTML = "############";
        }
    }

    function getData(isCurrentLocation, callback = function(){}) {
        countryName = document.querySelector("#country_name").value;
        var url = "";
        if (isCurrentLocation) {
            url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&units=metric&appid=8d7071faebf065763f900f514ca03c76';
        } else {
            url = 'http://api.openweathermap.org/data/2.5/weather?q=' + encodeURI(countryName) + '&units=metric&appid=8d7071faebf065763f900f514ca03c76';
        }
        request(url, function (error, response, body) {
            //   console.log('error:', error); // Print the error if one occurred
            //   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            //   console.log('body:', body); // Print the HTML for the Google homepage.
            if (error) {
                console.log("something went wrong");
                document.getElementById("temp").innerHTML = "Connection error";
                console.log(error);
            } else {
                parsedData = JSON.parse(body);
                console.log(parsedData);
                if (parsedData['cod'] == 200) {
                    getSeletedData(dropdown.value);
                    callback();
                } else {
                    document.getElementById("temp").innerHTML = "City not found";
                }
            }
        });
    }

    var latitude = "";
    var longitude = "";
    $('#location_pin').on('click', function () {
        if ("geolocation" in navigator) { //check geolocation available 
            //try to get user current location using getCurrentPosition() method
            navigator.geolocation.getCurrentPosition(function (position) {
                // $("#result").html("Found your location <br />Lat : "+position.coords.latitude+" </br>Lang :"+ position.coords.longitude);
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
                getData(true, function() {
                    $countryInput.val(parsedData['name'] + ", " + parsedData['sys']['country']);
                });
            });
        } else {
            console.log("Browser doesn't support geolocation!");
        }
    });
    // function getCityData(){
    //     cityName = document.querySelector("#country_name").value;
    // }
    document.querySelector("#country_name").onkeyup = function () {
        if (event.keyCode == 13) {
            console.log("Enter pressed!");
            getData(false);
        }
    };
    // document.getElementById("myBtn").onclick = function();
    $('#myBtn').on('click', function () {
        getData(false);
    });

    dropdown.onchange = function () {
        console.log(this.value);
        getSeletedData(this.value);
    };
});