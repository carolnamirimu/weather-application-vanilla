function displaytemperatuer (response){
    console.log(response.data)
    let windElement = document.querySelector("#wind");
    windElement.innerHTML=Math.round(response.data.wind.speed);
let humidityElement = document.querySelector("#humidity");
humidityElement.innerHTML=Math.round(response.data.main.humidity);
    let descriptionElement=document.querySelector("#description");
    descriptionElement.innerHTML= (response.data.weather[0].description);
    let temperatuerElement = document.querySelector("#temperatuer");
    temperatuerElement.innerHTML=Math.round(response.data.main.temp);
    let  cityElement=document.querySelector("#city");
    cityElement.innerHTML=(response.data.name)

}
let key="441d1183262ff89540a8b2407eb2ee23"
let city = "London"
let url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`

axios.get(url).then(displaytemperatuer);
