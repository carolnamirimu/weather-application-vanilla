function formartdate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${minutes}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours} : ${minutes}`;
}
function displayforecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHtml = `<div class="row">`;
let days= ["Sun","Mon", "Tue","Wed","Thur"];
days.forEach(function(day){

    forecastHtml = forecastHtml +
    `
   <div class="col-2">
       <div class="weather-forecast-date"></div>
     ${day}
     <img
       src="https://ssl.gstatic.com/onebox/weather/64/rain_s_cloudy.png"
       alt="cloudy"
       srcset=""
       id="icon" width="50"
     />
     <div class="weather-forcast-tempereture" >
     <span class="weather-forecast-tempereture-min">12°</span>
     <span class="weather-forecast-tempereture-max"> 30°</span> 
   </div>
   </div>
   `;
})
forecastHtml=forecastHtml+`</div>`;
forecastElement.innerHTML= forecastHtml;
}
function displaytemperatuer(response) {
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let temperatuerElement = document.querySelector("#temperatuer");
  celsiusTemperature = response.data.main.temp;
  temperatuerElement.innerHTML = Math.round(celsiusTemperature);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formartdate(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].icon);
}
function search(city) {
  let key = "441d1183262ff89540a8b2407eb2ee23";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;

  axios.get(url).then(displaytemperatuer);
}
function handlesubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFahrenheittemperature(event) {
  event.preventDefault();
  let FahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  celsiuslink.classList.remove("active");
  Fahrenheitlink.classList.add("active");
  let temperatureElement = document.querySelector("#temperatuer");
  temperatureElement.innerHTML = Math.round(FahrenheitTemperature);
}
function displaycelsiustemperature(event) {
  event.preventDefault();
  celsiuslink.classList.add("active");
  Fahrenheitlink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperatuer");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handlesubmit);

let Fahrenheitlink = document.querySelector("#Fahrenheit-link");
Fahrenheitlink.addEventListener("click", displayFahrenheittemperature);

let celsiuslink = document.querySelector("#celisius-link");
celsiuslink.addEventListener("click", displaycelsiustemperature);

search("kampala");
displayforecast();
