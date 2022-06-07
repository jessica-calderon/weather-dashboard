// apiKey = "8146fc372939ba1529f0cee4a074681a";

// search button logic
function cityLocator() {
    var city = $("#city-search")[0].value.trim();
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=8146fc372939ba1529f0cee4a074681a"; 

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json()
            .then(function (data) {
                $("#city-search")[0].textContent = city + " (" + moment().format('MMM Do YYY, h:mm:ss a') + ")";
                $("#results").append("cityName");

                var lon = data.coord.lon;
                var lat = data.coord.lat;

                var location = lat.toString() + " " + lon.toString();

                localStorage.setItem(city, location);

                // update api url to lat/lon position
                apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&units=imperial&appid=8146fc372939ba1529f0cee4a074681a";

                fetch(apiUrl)
                .then(function (newResponse) {
                    if (newResponse.ok) {
                        newResponse.json()
                        .then(function (newData) {
                            currentWeather(newData)
                        })
                    }
                })
            })
        } else {
            alert("Can't find city. Try again!");
        }
    })
}

function currentWeather(data) {
    
}


// display current and future weather for that city

// save search history to localstorage

// display city name, date, and icon to represent: weather, 
// temp, humidity, wind speed, and uv index

// view uv index
// color to indicate whether the conditions are: favorable, moderate, or severe

// view future conditions: 5 day forecast that displays:
// date, icon to represent weather, temp, wind speed, and humidity 

// display current and future conditions for that city again 