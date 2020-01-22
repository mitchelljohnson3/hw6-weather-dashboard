// =============================================================
let searchButton = document.getElementById("searchButton");

let cityName = document.getElementById("cityName");
let date = document.getElementById("date");
let temp = document.getElementById("temp");
let humidity = document.getElementById("humidity");
let windSpeed = document.getElementById("windSpeed");
let uvIndex = document.getElementById("uvIndex");

const apiKey = 'ad68fad0539c33dd3e4f4af3796550d4';
let cityUrl = 'api.openweathermap.org/data/2.5/weather?q=';

function init() {

    function success(position) {
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;

      const coordUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    
      fetch(coordUrl).then(function(response) {
        return response.json();
      }).then(function(json) {
        cityName.textContent = json.name;
        date.textContent = "(" + moment().format('dddd MMMM Do') + ")";
        temp.textContent = "Temperature: " + kelvinToF(json.main.temp) + "F";
        humidity.textContent = "Humidity: " + json.main.humidity + "%";
        windSpeed.textContent = "Wind Speed: " + json.wind.speed + " MPH";
      })

    }
  
    function error() {
      console.log('Unable to retrieve your location');
    }
  
    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by your browser');
    } else {
      console.log('Locating…');
      navigator.geolocation.getCurrentPosition(success, error);
    }
  
}


// let getCurrentWeather = () => {

// }
// let get5DayForecast = () => {
    
// }

// searchButton.addEventListener("click", () => {
//     fetch()
// })

let kelvinToF = (k) => {
    return Math.round( ( (k - 273.15) * (9/5) ) + 32 );
}
init();