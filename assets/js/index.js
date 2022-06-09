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

        // city html section
        var cityEl = $("<h2>").text(response.name);
        var dateEl = cityEl.append(" " + date);
        var temp = $("<p>").text("Temperature: " + response.main.temp);
        var humidity = $("<p>").text("Humidity: " + response.main.humidity);
        var wind = $("<p>").text("Wind Speed: " + response.wind.speed);
        var weather = response.weather[0].main;

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
    })
}

/* city location logic */
$("#search-btn").on("click", function(event) {
    event.preventDefault();
    // set and save searched city variable to localstorage
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
    var searchedItem = json.parse(localStorage.getItem('city'));
    var savedSection = $("<button class='styled-btn btn border text-muted mt-1 shadow-sm bg-white rounded'>").text(searchedItem);
    var divEl = $("<div>");
    divEl.append(savedSection)
    $("#local-search").prepend(divEl);
    
}
$("#local-search").on('click', '.btn', function(event) {
    event.preventDefault();
    search($(this).text());
});