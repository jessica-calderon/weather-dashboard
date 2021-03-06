var apiKey = "6c6fa74568efdce987aefebf351dfaaa";

/* search logic */
function search(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;
    var weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + apiKey;

    $.ajax({
        url: apiUrl,
        method: 'GET'
    })
    .then(function (response) {
        $("#forecast").empty();
        var date = moment().format('MMMM Do, YYYY');

        // city html section and forecast elements //
        var cityEl = $("<h2 class='card-header city bg-light text-dark'>").html("<i class='fa-solid fa-calendar-days mr-1'></i> " + response.name + " - ");
        var dateEl = cityEl.append(" " + date);
        var temp = $("<p>").text("Temperature: " + response.main.temp);
        var humidity = $("<p>").text("Humidity: " + response.main.humidity);
        var wind = $("<p>").text("Wind Speed: " + response.wind.speed);
        var weather = response.weather[0].main;
        // weather icons // 
        if (weather === "Rain") {
            var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/09d.png");
            icon.attr("style", "width: 60px; height: 60px");
        } else if (weather === "Clouds") {
            var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/03d.png");
            icon.attr("style", "width: 60px; height: 60px");
        } else if (weather === "Scattered Clouds") {
            var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/03d.png");
            icon.attr("style", "width: 60px; height: 60px");
        } else if (weather === "Mist") {
            var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/50d.png");
            icon.attr("style", "width: 60px; height: 60px");
        } else if (weather === "Thunderstorm") {
            var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/1d.png");
            icon.attr("style", "width: 60px; height: 60px");
        } else if (weather === "Few Clouds") {
            var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/02d.png");
            icon.attr("style", "width: 60px; height: 60px");
        } else if (weather === "Drizzle") {
            var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/10d.png");
            icon.attr("style", "width: 60px; height: 60px");
        } else if (weather === "Clear") {
            var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/01d.png");
            icon.attr("style", "width: 60px; height: 60px");
        } else if (weather === "Snow") {
            var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/13d.png");
            icon.attr("style", "width: 60px; height: 60px");
        }
        var newDivEl = $('<div class="forecast-style">')
        newDivEl.append(dateEl, icon, temp, humidity, wind);
        $("#forecast").html(newDivEl);

// lat/lon for searched city //
        var lat = response.coord.lat;
        var lon = response.coord.lon;
        var uvUrl = "https://api.openweathermap.org/data/2.5/uvi?&appid=" + apiKey + "&lat=" + lat + "&lon=" + lon;
// return uv info // 
        $.ajax({
            url: uvUrl,
            method: 'GET'
        })
        .then(function (response) {
            $('#uv-levels').empty();
            var uv = response.value;
            var uvDiv = $('<p id="uv">').html("<h6>UV Index: " + response.value + "</h6>");
    // color code uv index. green under 4            
            $('#uv-levels').html(uvDiv);

                if (response.value < 4 ) {
                    $("#uv").attr("class", "badge badge-success");
                }
                // yellow 5-8
                else if (response.value < 8) {
                    $("#uv").attr("class", "badge badge-warning");
                }
                // all else red
                else {
                    $("#uv").attr("class", "badge badge-danger");
                }
        });
    });




/* weekly forecast logic */
$.ajax({
    url: weatherUrl,
    method: 'GET'
})
.then(function (response) {
    // store forecast to an array list //
    var returnForecast = response.list;
    $("#weekly").empty();
    for (var i = 0; i < returnForecast.length; i += 6) {
        // forecast div element
        var forecastDiv = $("<div class='div-style card text-white bg-secondary m-1 mb-10 p-2 shadow-lg'>");
        // forecast temp, date, and humidtiy variables
        var forecastDate = returnForecast[i].dt_txt;
        var setFcDate = forecastDate.substr(0,10);
        var mainTemp = returnForecast[i].main.temp;
        var hum = returnForecast[i].main.humidity;


        // forecast results html elements 
        var indexDate = $("<h5 class='card-title'>").html('<i class="fa-solid fa-calendar-day mr-1"></i> ' + setFcDate);
        var tempEl = $("<p class='card-text'>").text("Temperature: " + mainTemp);
        var humEl = $("<p class='card-text'>").text("Humidity: " + hum); 

        var forecastWeather = returnForecast[i].weather[0].main 
        // forecast weather icons 
        if (forecastWeather === "Rain") {
            var forecastIcon = $('<img class="center-block">').attr("src", "http://openweathermap.org/img/wn/09d.png");
            forecastIcon.attr("style", "width: 50px; height: 50px");
        } else if (forecastWeather === "Drizzle") {
            var forecastIcon = $('<img class="center-block">').attr("src", "http://openweathermap.org/img/wn/11d.png");
            forecastIcon.attr("style", "width: 50px; height: 50px");
        } else if (forecastWeather === "Mist") {
            var forecastIcon = $('<img class="center-block">').attr("src", "http://openweathermap.org/img/wn/75d.png");
            forecastIcon.attr("style", "width: 50px; height: 50px");
        } else if (forecastWeather === "Scattered Clouds") {
            var forecastIcon = $('<img class="center-block">').attr("src", "http://openweathermap.org/img/wn/03d.png");
            forecastIcon.attr("style", "width: 50px; height: 50px");
        } else if (forecastWeather === "Few Clouds") {
            var forecastIcon = $('<img class="center-block">').attr("src", "http://openweathermap.org/img/wn/02d.png");
            forecastIcon.attr("style", "width: 50px; height: 50px");
        } else if (forecastWeather === "Thunderstorm") {
            var forecastIcon = $('<img class="center-block">').attr("src", "http://openweathermap.org/img/wn/10d.png");
            forecastIcon.attr("style", "width: 50px; height: 50px");
        } else if (forecastWeather === "Clouds") {
            var forecastIcon = $('<img class="center-block">').attr("src", "http://openweathermap.org/img/wn/03d.png");
            forecastIcon.attr("style", "width: 50px; height: 50px");
        } else if (forecastWeather === "Clear") {
            var forecastIcon = $('<img class="center-block">').attr("src", "http://openweathermap.org/img/wn/01d.png");
            forecastIcon.attr("style", "width: 50px; height: 50px");
        } else if (forecastWeather === "Snow") {
            var forecastIcon = $('<img class="center-block">').attr("src", "http://openweathermap.org/img/wn/13d.png");
            forecastIcon.attr("style", "width: 50px; height: 50px");
        }

        // append forecast to index
        forecastDiv.append(indexDate);
        forecastDiv.append(forecastIcon);
        forecastDiv.append(tempEl);
        forecastDiv.append(humEl);
        $("#weekly").append(forecastDiv);
        }
    });

}
loadSaved();

    /* city location logic */

    $("#search-btn").on("click", function (event) {
        event.preventDefault();
        // set and save searched city variable to localstorage //
        var saved = [];
        var savedSearches = JSON.parse(localStorage.getItem('city'));
            if (savedSearches) {
                saved.push(...savedSearches);
            }
            var citySearch = $("#city-search").val().trim();
            //citySearch = citySearch.toLowerCase();
            if (saved.includes(citySearch)) {
                return;
            }
 
            saved.push(citySearch)

            localStorage.setItem('city', JSON.stringify(saved));

            search(citySearch);

        var searchHistory = $("<button class='btn-block my-sm-1 my-2 btn border text-muted mt-1 shadow-sm bg-white rounded'>").text(citySearch);
        var divEl = $("<div>");
        divEl.append(searchHistory)
        $("#local-search").prepend(divEl);
    });
    function loadSaved() {
        var searchedItems = JSON.parse(localStorage.getItem('city'));
            if (searchedItems) {
                for (let index = 0; index < searchedItems.length; index++) {
                    const searchedItem = searchedItems[index];
                    var searchHistory = $("<button class='btn-block my-sm-1 my-2 btn border text-muted mt-1 shadow-sm bg-white rounded'>").text(searchedItem);
                    var divEl = $("<div>");
                    divEl.append(searchHistory)
                    $("#local-search").prepend(divEl);
                }
            }

    }
// clickable location history 
$("#local-search").on('click', '.btn', function(event) {
    event.preventDefault();
    search($(this).text());
});
// clear location history on clear btn click
$("#clear-btn").on("click", function (event) {
    event.preventDefault();
    $("#local-search").html("");
    localStorage.clear();
})
