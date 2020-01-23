// =============================================================

// mass amounts of element gathering - note to self, find a better way to do this
let searchButton = document.getElementById("searchButton");
let clearButton = document.getElementById("clearList");

let cityName = document.getElementById("cityName");
let date = document.getElementById("date");
let temp = document.getElementById("temp");
let humidity = document.getElementById("humidity");
let windSpeed = document.getElementById("windSpeed");
let uvIndex = document.getElementById("uvIndex");
let input = document.getElementById("input");
let forecastDiv = document.getElementById("forecast");
let iconDiv = document.getElementById("icon");
let cityStorage = document.getElementById("city-storage");
let uvDiv = document.getElementById("uvIndex");

// api key
const apiKey = 'ad68fad0539c33dd3e4f4af3796550d4';

// fills local storage if not already there
let localStorage = window.localStorage;
if(localStorage.getItem("cityList") === null || localStorage.getItem("cityList") === undefined || localStorage.getItem("cityList") === ""){
  let arr = [];
  console.log("here");
  setCityList(arr);
}

// reset button function
function resetLocalStorage() {
  let arr = [];
  setCityList(arr);
}
// getter
function getCityList() {
  try{
    return JSON.parse(localStorage.getItem("cityList"));
  } catch {
    SyntaxError;
  }
}
// setter
function setCityList(newArr) {
  localStorage.setItem("cityList", JSON.stringify(newArr));
}
//adds city to local storage list and then updates the list
function addCity(cityName) {
  let arr = getCityList();
  if(arr.includes(cityName)){

  } else {
    arr[arr.length] = cityName;
    setCityList(arr);
    updateCityList();
  }
}
//updates the city list 
function updateCityList() {
  cityStorage.innerHTML = "";
  let cityList = getCityList();
  for(let i = 0; i < cityList.length; i++){
    // adds city history buttons to list
    let newCityCard = document.createElement("button");
    newCityCard.setAttribute("id", "cityCard")
    newCityCard.textContent = cityList[i];
    // adds event listeners to each button
    newCityCard.addEventListener("click", function() {
      let city = newCityCard.textContent;
      const uvUrl = `https://api.openweathermap.org/data/2.5/uvi/forecast?q=${city}&appid=${apiKey}`;
      const cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
      const city5DayUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
      fetch(cityUrl).then(function(response) {
          return response.json();
        }).then(function(json) {
          displayCurrentForecast(json);
        })

        fetch(uvUrl).then(function(response) {
          return response.json();
        }).then(function(json) {
          uvDiv.textContent = "UV Index: " + json[0].value;
        })

      fetch(city5DayUrl).then(function(response) {
          return response.json();
      }).then(function(json) {
          display5DayForecast(json);
      })
    });

    cityStorage.appendChild(newCityCard);
  }
}
//initialization of code
function init() {
  let temp = getCityList();
  let index = temp.length;
  // if there are no cities in the list, add the users current location as a city card and then display that cities weather forecast
  if(index == 0) {
    function success(position) {
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;

      const uvUrl = `https://api.openweathermap.org/data/2.5/uvi/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
      const coordUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
      const coord5DayUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
      fetch(coordUrl).then(function(response) {
        return response.json();
      }).then(function(json) {
        addCity(json.name);
        displayCurrentForecast(json);
      })

      fetch(uvUrl).then(function(response) {
        return response.json();
      }).then(function(json) {
        uvDiv.textContent = "UV Index: " + json[0].value;
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
    // if there  are cities in the list, display the last searched cities forecast
  } else {
      let city = temp[index - 1];
      updateCityList();
      const uvUrl = `https://api.openweathermap.org/data/2.5/uvi/forecast?q=${city}&appid=${apiKey}`;
      const cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
      const city5DayUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
      fetch(cityUrl).then(function(response) {
          return response.json();
        }).then(function(json) {
          displayCurrentForecast(json);
        })

        fetch(uvUrl).then(function(response) {
          return response.json();
        }).then(function(json) {
          uvDiv.textContent = "UV Index: " + json[0].value;
        })

      fetch(city5DayUrl).then(function(response) {
          return response.json();
      }).then(function(json) {
          display5DayForecast(json);
      })

  }  
}
//event listener for clear button
clearButton.addEventListener("click", function() {
  resetLocalStorage();
  updateCityList();
})
// search button event listener
searchButton.addEventListener("click", () => {
    let city = input.value;
    if(city === ""){

    } else {
      addCity(city);
      const uvUrl = `https://api.openweathermap.org/data/2.5/uvi/forecast?q=${city}&appid=${apiKey}`;
      const cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
      const city5DayUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
      fetch(cityUrl).then(function(response) {
          return response.json();
        }).then(function(json) {
          displayCurrentForecast(json);
        })

        fetch(uvUrl).then(function(response) {
          return response.json();
        }).then(function(json) {
          uvDiv.textContent = "UV Index: " + json[0].value;
        })

      fetch(city5DayUrl).then(function(response) {
          return response.json();
      }).then(function(json) {
          display5DayForecast(json);
      })
    }
})
// kelvin to fahrenheit calculator
let kelvinToF = (k) => {
    return Math.round( ( (k - 273.15) * (9/5) ) + 32 );
}
init();
//display that days forecast
function displayCurrentForecast(json) {
    cityName.textContent = json.name;
    let iconId = json.weather[0].icon;
    iconUrl = `http://openweathermap.org/img/w/${iconId}.png`;
    iconDiv.setAttribute("src", iconUrl);
    date.textContent = "(" + moment().format('dddd MMMM Do') + ")";
    temp.textContent = "Temperature: " + kelvinToF(json.main.temp) + "F";
    humidity.textContent = "Humidity: " + json.main.humidity + "%";
    windSpeed.textContent = "Wind Speed: " + json.wind.speed + " MPH";
}
// displays 5 day forecast
function display5DayForecast(json) {
  forecastDiv.innerHTML = "";
    let forecast = json.list;
    for(let i = 0; i < 40; i += 8) {
        let index = i + 4;
        let newCard = document.createElement("div");
        newCard.setAttribute("id", "weatherCard");

        let dateHeader = document.createElement("h1");
        let icon = document.createElement("img");
        let tempHeader = document.createElement("p");
        let humidityHeader = document.createElement("p");
        
        let obj = forecast[index];
        let date = obj.dt_txt.split(" ");
        dateHeader.textContent = date[0];
        let iconId = obj.weather[0].icon;
        iconUrl = `http://openweathermap.org/img/w/${iconId}.png`;
        icon.setAttribute("src", iconUrl);
        tempHeader.textContent = "Temp: " + kelvinToF(obj.main.temp) + " F";
        humidityHeader.textContent = "Humidity: " + obj.main.humidity + "%";

        newCard.appendChild(dateHeader);
        newCard.appendChild(icon);
        newCard.appendChild(tempHeader);
        newCard.appendChild(humidityHeader);

        forecastDiv.appendChild(newCard);
    }
}