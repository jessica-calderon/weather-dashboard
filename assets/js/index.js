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
// display current and future weather for that city
function currentWeather(data) {
    $("weather-results").addClass("visible");
    // pull and display current weather icon 
    $("#weather-icon")[0].src = "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png";
    // convert current temp to a fixed single value string and display in farenheit in html
    $(".temp")[0].textContent = "Temperature: " data.current.temp.toFixed(1) + "\u2109";
    // pull and display current humidity levels
    $(".humidity")[0].textContent = "Humidity: " + data.current.humidity + "% ";
    // pull current wind speed and convert to single digit string and display
    $(".wind")[0].textContent = "Wind Speed: " + data.current.wind_speed.toFixed(1) + " MPH";
    // pull display current uv index
    $(".uv")[0].textContent = " " + data.current.uvi;

    // moderate, severe, and favorable logic    
  /*   if (data.current.uvi < 3) {
            $(".uv")
        } */
}



// save search history to localstorage

// display city name, date, and icon to represent: weather, 
// temp, humidity, wind speed, and uv index

// view uv index
// color to indicate whether the conditions are: favorable, moderate, or severe

// view future conditions: 5 day forecast that displays:
// date, icon to represent weather, temp, wind speed, and humidity 

// display current and future conditions for that city again 