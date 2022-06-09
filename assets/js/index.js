var apiKey = "8146fc372939ba1529f0cee4a074681a";
moment().format('l');
/* search logic */
function search(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;
    var weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + apiKey;
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