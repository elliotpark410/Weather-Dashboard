var openWeatherAPIkey = "80da45c172168bca58bf9a25737c188f";

// Create an event listener on click that retrieves user input (city name)
$("#city-button").on("click", function(event) {
    event.preventDefault();

    var city = $("#city-input").val().trim();

    // Create a variable for openWeatherURL and use jQuery to enter variables like city (user input) and openweather API Key
    var openWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${openWeatherAPIkey}`;

    // Call weatherToday function with argument openWeatherURL
    weatherToday(openWeatherURL);
 
});

// Create key press event listener function so user can either click button or press enter to run function
$('#city-button').keypress(function(event){
    if(event.which == 13){  // 13 is the "Enter" key code
        $('#city-button').click(); //Triggers search button click event
    }
});

// Create a function to fetch specific data from openWeatherAPI like cityName, cityWeatherIcon, temperature, humidity, and windspeed
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
        var cityWeatherIcon = $(`<img src="${iconURL}" alt="${openWeatherData.weather[0].description}"/>`)
        $("#city-name").append(cityWeatherIcon);


        var cityWeather = $(`
            <p>Temperature: ${openWeatherData.main.temp} °F</p>
            <p>Humidity: ${openWeatherData.main.humidity}\%</p>
            <p>Wind Speed: ${openWeatherData.wind.speed} mph</p>
        `)
        $("#weather-today").append(cityWeather);


        // Create variables for latitude and longitude because we will need them for the fiveDayForecast function
        var latitude = openWeatherData.coord.lat;
        var longitude = openWeatherData.coord.lon;

        // Create a variable for UVIndexURL and use jQuery to enter variables like latitude and longitude
        var UVIndexURL = `https://api.openweathermap.org/data/2.5/uvi?lat=${latitude}&lon=${longitude}&appid=${openWeatherAPIkey}`;

    
        // Call UVIndexToday function with argument UVIndexURL
        UVIndexToday(UVIndexURL);

        // Call fiveDayForecast function with arguments latitude and longitude
        fiveDayForecast(latitude, longitude);
     

    });
}


// Create a function to fetch specific UV Index data 
function UVIndexToday(UVIndexURL) {
    fetch(UVIndexURL)
    .then(function (openWeatherUVResponse) {
        console.log(openWeatherUVResponse);
        return openWeatherUVResponse.json();

    }) .then (function(openWeatherUVData) {
        console.log(openWeatherUVData);


    var UVIndex = openWeatherUVData.value;
    console.log(UVIndex);
        var UVIndexParagraph = $(`
            <p>UV Index: 
                <span class="p-2 rounded">${UVIndex}</span>
            </p>
        `);

        $("#weather-today").append(UVIndexParagraph);


    if (UVIndex >= 0 && UVIndex <= 2) {
        $("span").attr("id", "uv-index-low")
    } else if (UVIndex >= 3 && UVIndex <= 5) {
        $("span").attr("id", "uv-index-moderate")
    } else if (UVIndex >= 6 && UVIndex <= 7) {
        $("span").attr("id", "uv-index-high")
    } else if (UVIndex >= 8 && UVIndex <= 10) {
        $("span").attr("id", "uv-index-very-high")
    } else {
        $("span").attr("id", "uv-index-not-available")
    };  

    })


}

// Create a fiveDayForecast function to fetch specific data from openWeatherAPI like date, icon, temperature and humidity
function fiveDayForecast(latitude, longitude) {

    var openWeatherFiveDayForecastURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&exclude=current,minutely,hourly,alerts&appid=${openWeatherAPIkey}`;

    fetch(openWeatherFiveDayForecastURL)
    .then(function (openWeatherFiveDayResponse) {
        console.log(openWeatherFiveDayResponse);
        return openWeatherFiveDayResponse.json();

    }) .then (function(openWeatherFiveDayData) {
        console.log(openWeatherFiveDayData);
        $("#five-day-forecast").empty();

        for (let i=1; i < 6; i++) {
            var cityWeatherFiveDayForecast = {
                date: openWeatherFiveDayData.daily[i].dt,
                icon: openWeatherFiveDayData.daily[i].weather[0].icon,
                temperature: openWeatherFiveDayData.daily[i].temp.day,
                humidity: openWeatherFiveDayData.daily[i].humidity
            }

            var dateFiveDayForecast = moment.unix(cityWeatherFiveDayForecast.date).format("MM/DD/YYYY");

            var iconURLFiveDayForecast = `<img src="https://openweathermap.org/img/w/${cityWeatherFiveDayForecast.icon}.png" alt="${openWeatherFiveDayData.daily[i].weather[0].main}" />`;

            var fiveDayForecastCard = $(`
                <div class="pl-3">
                    <div class="card pl-3 pt-3 mb-3 bg-primary text-light" style="width: 12rem;>
                        <div class="card-body">
                            <h5>${dateFiveDayForecast}</h5>
                            <p>${iconURLFiveDayForecast}</p>
                            <p>Temp: ${cityWeatherFiveDayForecast.temperature} °F</p>
                            <p>Humidity: ${cityWeatherFiveDayForecast.humidity}\%</p>
                        </div>
                    </div>
                <div>
            `);

            $("#five-day-forecast").append(fiveDayForecastCard);

        }

    })

}