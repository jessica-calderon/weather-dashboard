var apiKey = "8146fc372939ba1529f0cee4a074681a";
moment().format('l');

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
        var date = moment().format('l');

        // city html section and forecast elements //
        var cityEl = $("<h2>").text(response.name);
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
        var newDivEl = $('<div>')
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
            var uvDiv = $('<p class="uv">').text("UV Index: " + response.value);
            $('#uv-levels').html(uvDiv);
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
    for (var i = 0; i < returnForecast.length; i += 7) {
        // forecast div element
        var forecastDiv = $("<div class='div-style card text-white bg-primary mx-auto mb-10 p-2 shadow-lg'>");
        // forecast temp, date, and humidty variables
        var forecastDate = returnForecast[i].dt_txt;
        var setFcDate = forecastDate.substr(0,10);
        var mainTemp = returnForecast[i].main.temp;
        var hum = returnForecast[i].main.humidity;


        // forecast results html elements 
        var indexDate = $("<h5 class='card-title'>").text(setFcDate);
        var tempEl = $("<p class='card-text'>").text("Temperature: " + mainTemp);
        var humEl = $("<p class='card-text'>").text("Humidity: " + hum); 

        var forecastWeather = returnForecast[i].weather[0].main 
        // forecast weather icons 
        if (forecastWeather === "Rain") {
            var forecastIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/09d.png");
            forecastIcon.attr("style", "width: 40px; height: 40px");
        } else if (forecastWeather === "Drizzle") {
            var forecastIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/10d.png");
            forecastIcon.attr("style", "width: 40px; height: 40px");
        } else if (forecastWeather === "Clouds") {
            var forecastIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/03d.png");
            forecastIcon.attr("style", "width: 40px; height: 40px");
        } else if (forecastWeather === "Clear") {
            var forecastIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/01d.png");
            forecastIcon.attr("style", "width: 40px; height: 40px");
        } else if (forecastWeather === "Snow") {
            var forecastIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/13d.png");
            forecastIcon.attr("style", "width: 40px; height: 40px");
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
$("#search-btn").on("click", function(event) {
    event.preventDefault();
    // set and save searched city variable to localstorage //
    var citySearch = $("#city-search").val().trim();
    var savedSearch = $(this).siblings("input").val();
    var saved = [];
    saved.push(savedSearch);
    localStorage.setItem('city', JSON.stringify(saved));

    search(citySearch);
    loadSaved();
});

/* load localStorage and display on page */
function loadSaved () {
    var searchedItem = JSON.parse(localStorage.getItem('city'));
    var savedSection = $("<button class='styled-btn btn border text-muted mt-1 shadow-sm bg-white rounded'>").text(searchedItem);
    var divEl = $("<div>");
    divEl.append(savedSection)
    $("#local-search").prepend(divEl);
    
}
$("#local-search").on('click', '.btn', function(event) {
    event.preventDefault();
    search($(this).text());
});