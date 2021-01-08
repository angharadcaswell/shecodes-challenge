//Current date and time
function formatDate() {
  let currentDate = new Date();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  let date = currentDate.getDate();
  let day = days[currentDate.getDay()];
  let month = months[currentDate.getMonth()];
  let hours = currentDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let formattedDate = `${day} ${month} ${date}, ${hours}:${minutes}`;
  return formattedDate;
}
let h2 = document.querySelector("#currentDate");
h2.innerHTML = formatDate();


// // Change temp conversion

// function convertToFahrenheit(event) {
//   event.preventDefault();
//   let temperatureElement = document.querySelector("#temperature");
//   temperatureElement.innerHTML = "87°";
// }

// function convertToCelcius(event) {
//   event.preventDefault();
//   let temperatureElement = document.querySelector("#temperature");
//   temperatureElement.innerHTML = "24°";
// }

// let fahrenheitLink = document.querySelector("#fahrenheit-link");
// fahrenheitLink.addEventListener("click", convertToFahrenheit);

// let celciusLink = document.querySelector("#celcius-link");
// celciusLink.addEventListener("click", convertToCelcius);

// Changes city when "Enter a new city"

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city-name");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;
}





// weather API 
function displayWeather(response){
 celsiusTemperature = response.data.main.temp;
document.querySelector("#city-name").innerHTML = response.data.name;
let showTemperature = Math.round(celsiusTemperature);
document.querySelector("#temperature").innerHTML= `${showTemperature} `;
document.querySelector("#description").innerHTML= response.data.weather[0].description;
document.querySelector("#humidity").innerHTML =response.data.main.humidity;
document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
let iconElement = document.querySelector("#icon");
 iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function displayForecast (response) {
  console.log( response.data);
}


function submitCity(event){
event.preventDefault();
let city = document.querySelector("#city-input").value;
let apiKey = "db87e0d32b4169f744dbe24ac4293afa";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayWeather);

apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(dispalyForecast);
}

let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", submitCity);


//Current location

function locationFinder(position) {
  let lat = `${position.coords.latitude}`;
  let lon = `${position.coords.longitude}`;
  let apiKey = "db87e0d32b4169f744dbe24ac4293afa";
  let apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function findCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(locationFinder);
}

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", findCurrentLocation);

// Temperature conversion


function displayFahrenheitTemperature(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#temperature");

// remove the active class to the celcious link and add the active class to the fahrenheit temp.
celsiuslink.classList.remove("active");
fahrenheitlink.classList.add("active");
let fahrenheitTemperature = (celsiusTemperature * 9)/ 5 +32;
temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature (event){
event.preventDefault();
let temperatureElement = document.querySelector("#temperature");
celsiuslink.classList.add("active");
fahrenheitlink.classList.remove("active");
temperatureElement.innerHTML = Math.round(celsiusTemperature);
}




 // Global Variables
let celsiusTemperature = null;

let fahrenheitlink = document.querySelector("#fahrenheit-link");
fahrenheitlink.addEventListener("click", displayFahrenheitTemperature);

let celsiuslink = document.querySelector("#celcius-link");
celsiuslink.addEventListener("click", displayCelsiusTemperature);














