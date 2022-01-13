var openWeatherAPIkey = "80da45c172168bca58bf9a25737c188f";


$("#city-button").on("click", function(event) {
    event.preventDefault();

    var city = $("#city-input").val().trim();
    console.log(city);

    var openWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${openWeatherAPIkey}`;

    // runs another function
    weatherToday(openWeatherURL);


    // if (!searchHistoryList.includes(city)) {
    //     searchHistoryList.push(city);
    //     var searchedCity = $(`
    //         <li class="list-group-item">${city}</li>
    //         `);
    //     $("#searchHistory").append(searchedCity);
    // };
    
    // localStorage.setItem("city", JSON.stringify(searchHistoryList));
    // console.log(searchHistoryList);
});

$('#city-button').keypress(function(event){
    if(event.which == 13){  // 13 is the "Enter" key code
        $('#city-button').click(); //Triggers search button click event
    }
});


function weatherToday(openWeatherURL) {
    fetch(openWeatherURL)
    .then(function (openWeatherResponse) {
        console.log(openWeatherResponse);
        return openWeatherResponse.json();

    }) .then (function(openWeatherData) {
        console.log(openWeatherData);



        var cityName = openWeatherData.name;         
        console.log(cityName);
        $("#city-name").text(cityName);

        
        var iconLocation = openWeatherData.weather[0].icon;
        var iconURL = `https://openweathermap.org/img/w/${iconLocation}.png`;
        var cityIcon = $(`<img src="${iconURL}" alt="${openWeatherData.weather[0].description}"/>`)
        $("#city-name").append(cityIcon);

        var cityWeather = $(`
            <p>Temperature: ${openWeatherData.main.temp} °F</p>
            <p>Humidity: ${openWeatherData.main.humidity}\%</p>
            <p>Wind Speed: ${openWeatherData.wind.speed} MPH</p>
        `)
        $("#weather-today").append(cityWeather);






    });



 

}
