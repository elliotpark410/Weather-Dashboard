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


        
        var latitude = openWeatherData.coord.lat;
        var longitude = openWeatherData.coord.lon;
        var UVIndexURL = `https://api.openweathermap.org/data/2.5/uvi?lat=${latitude}&lon=${longitude}&appid=${openWeatherAPIkey}`;
         // runs another function
        UVIndexToday(UVIndexURL);
    

    });
}


function   UVIndexToday(UVIndexURL) {
    fetch(UVIndexURL)
    .then(function (openWeatherUVResponse) {
        console.log(openWeatherUVResponse);
        return openWeatherUVResponse.json();

    }) .then (function(openWeatherUVData) {
        console.log(openWeatherUVData);


    var UVIndex = openWeatherUVData.value;
            var UVIndexParagraph = $(`
                <p>UV Index: 
                    <span id="UVIndexColor" class="px-2 py-2 rounded">${UVIndex}</span>
                </p>
            `);

            $("#weather-today").append(UVIndexParagraph);





            

    fiveDayForecast(latitude, longitude);



})
}


// function fiveDayForecast(latitude, longitude) {
//     }
