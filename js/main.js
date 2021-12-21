"use strict";

const body = document.querySelector("body");
const iconoClima = document.querySelector("#iconoClima");
const temperatura = document.querySelector("#temperatura");
const ciudad = document.querySelector("#ciudad");
const ubicacion = document.querySelector("#ubicacion");

const loadScreen = document.querySelector(".loader-screen");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    ubicacion.style.display = "block";
    ubicacion.innerHTML =
      "La geolocalización no es soportada por este navegador :(";
    body.classList.add("rojo-error");
  }
}

function showError(error) {
  ubicacion.style.display = "block";
  body.classList.add("rojo-error");

  switch (error.code) {
    case error.PERMISSION_DENIED:
      ubicacion.innerHTML =
        "Activá la ubicación para que el cosito funcione :)";
      loadScreen.style.opacity = 0;
      break;
    case error.POSITION_UNAVAILABLE:
      ubicacion.innerHTML = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      ubicacion.innerHTML = "The request to get user location timed out.";
      break;
    case error.UNKNOWN_ERROR:
      ubicacion.innerHTML = "An unknown error occurred.";
      break;
  }
}

function showPosition(position) {
  const latitud = position.coords.latitude;
  const longitud = position.coords.longitude;

  fetch(
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
      latitud +
      "&lon=" +
      longitud +
      "&appid=091960382fa3f6e096e82ae3990d8325&units=Metric"
  )
    .then((response) => response.json())
    .then((data) => {
      loadScreen.style.opacity = 0;

      setTimeout(function(){
        loadScreen.style.zIndex = -1;
      }, 1000);

      const clima = data.weather[0].main;

      ciudad.innerHTML = data.name;

      let codigoIcono = data.weather[0].icon;

      let rutaIcono =
        "https://openweathermap.org/img/w/" + codigoIcono + ".png ";
      iconoClima.src = rutaIcono;

      temperatura.innerText = data.main.temp + "°";

      switch (clima) {
        case "Clear":
          body.classList.add("azul-bueno");
          break;
        case "Clouds":
          body.classList.add("violeta-inestable");
          break;
        case "Rain":
        case "Drizzle":
        case "Thunderstorm":
        case "Tornado":
        case "Squall":
          body.classList.add("rosa-lluvia");
          break;
        case "Mist":
        case "Smoke":
        case "Haze":
        case "Fog":
        case "Dust":
        case "Ash":
        case "Sand":
          body.classList.add("gris-niebla");
          break;
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

getLocation();
