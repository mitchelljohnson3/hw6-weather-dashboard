// =============================================================
let searchButton = document.getElementById("searchButton");

let cityName = document.getElementById("cityName");
let date = document.getElementById("date");
let temp = document.getElementById("temp");
let humidity = document.getElementById("humidity");
let windSpeed = document.getElementById("windSpeed");
let uvIndex = document.getElementById("uvIndex");
let input = document.getElementById("input");

const apiKey = 'ad68fad0539c33dd3e4f4af3796550d4';

function init() {

    function success(position) {
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;

      const coordUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
      const coord5DayUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
      fetch(coordUrl).then(function(response) {
        return response.json();
      }).then(function(json) {
        displayCurrentForecast(json);
      })

      fetch(coord5DayUrl).then(function(response) {
        return response.json();
      }).then(function(json) {
        display5DayForecast(json);
      })

    }
  
    function error() {
      console.log('Unable to retrieve your location');
    }
  
    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by your browser');
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  
}

searchButton.addEventListener("click", () => {
    let city = input.value;
    const cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const city5DayUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
    fetch(cityUrl).then(function(response) {
        return response.json();
      }).then(function(json) {
        displayCurrentForecast(json);
      })

    fetch(city5DayUrl).then(function(response) {
        return response.json();
    }).then(function(json) {
        display5DayForecast(json);
    })
})

let kelvinToF = (k) => {
    return Math.round( ( (k - 273.15) * (9/5) ) + 32 );
}
init();

function displayCurrentForecast(json) {
    cityName.textContent = json.name;
    date.textContent = "(" + moment().format('dddd MMMM Do') + ")";
    temp.textContent = "Temperature: " + kelvinToF(json.main.temp) + "F";
    humidity.textContent = "Humidity: " + json.main.humidity + "%";
    windSpeed.textContent = "Wind Speed: " + json.wind.speed + " MPH";
}
function display5DayForecast(json) {
    let forecast = json.list;
    for(let i = 0; i < 40; i += 8) {
        let index = i + 4;
        let newCard = document.createElement("div");
        newCard.setAttribute("id", "weatherCard");

        let dateHeader = document.createElement("h1");
        let icon = document.createElement("img");
        let tempHeader = document.createElement("p");
        let humidityHeader = document.createElement("p");
        
        
    }
}