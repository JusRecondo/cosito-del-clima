"use strict";

let clima;
const body = document.querySelector("body");
const iconoClima = document.querySelector("#iconoClima");
const temperatura = document.querySelector("#temperatura");

fetch(
  "https://api.openweathermap.org/data/2.5/weather?id=3433955&appid=091960382fa3f6e096e82ae3990d8325&units=Metric"
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    clima = data.weather[0].description;
    console.log(clima);

    let codigoIcono = data.weather[0].icon;
    let rutaIcono = "http://openweathermap.org/img/w/" + codigoIcono + ".png ";
    iconoClima.src = rutaIcono;

    temperatura.innerText = data.main.temp + '°';
    

    switch (clima) {
      case "clear sky":
      case "few clouds":
        body.classList.add("azul-bueno");
        break;
      case "scattered clouds":
      case "broken clouds":
        body.classList.add("violeta-inestable");
        break;
      case "shower rain":
      case "rain":
      case "thunderstorm":
        body.classList.add("rosa-lluvia");
        break;
      case "mist":
        body.classList.add("gris-niebla");
        break;   
    }
});
