//Current date and time
function formatDate(timestamp) {
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







//Show current date
let h2 = document.querySelector("#currentDate");
h2.innerHTML = formatDate();


// show time stamp
function formatHours(timestamp) {
  let currentDate = new Date(timestamp);
  let hours = currentDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return`${hours}:${minutes}`;
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
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function displayForecast (response) {

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML= null;
  let forecast= null;

   for (let index = 0; index < 6; index++) {
  forecast= response.data.list[index];
  forecastElement.innerHTML += `
  <div class="row forecastRow align-items-center">
                    <div class="col-4">
                      ${formatHours(forecast.dt*1000)}
                    </div>
                    <div class="col-4">
                        <strong>${Math.round(forecast.main.temp_max)}°</strong> / ${Math.round(forecast.main.temp_min)}°C
                    </div>
                    <div class="col-4">
                        <img
        src="https://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"
      />
                    </div>
                </div>
                `;
                 }
}




function submitCity(event){
event.preventDefault();
let city = document.querySelector("#city-input").value;
let apiKey = "db87e0d32b4169f744dbe24ac4293afa";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayWeather);

apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);


}

let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", submitCity);


//Current location

function locationFinder(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "db87e0d32b4169f744dbe24ac4293afa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
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


