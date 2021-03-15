"use strict";

let clima;
const body = document.querySelector("body");
const iconoClima = document.querySelector("#iconoClima");
const temperatura = document.querySelector("#temperatura");
const ciudad = document.querySelector("#ciudad");

let ubicacion = document.querySelector("#ubicacion");
let latitud;
let longitud;


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else { 
    ubicacion.style.display = 'block';
    ubicacion.innerHTML = "La geolocalizaión no es soportada por ese navegador :(";
    body.classList.add("rojo-error");
  }

  return latitud;
}

function showError(error) {
  ubicacion.style.display = 'block';
  body.classList.add("rojo-error");
  switch(error.code) {
    case error.PERMISSION_DENIED:
      ubicacion.innerHTML = "Activá la ubicación para que el cosito funcione :)"
      break;
    case error.POSITION_UNAVAILABLE:
      ubicacion.innerHTML = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      ubicacion.innerHTML = "The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      ubicacion.innerHTML = "An unknown error occurred."
      break;
  }
}

function showPosition(position) {
  latitud = position.coords.latitude;
  longitud = position.coords.longitude;

  ubicacion.innerHTML = "Latitud: " + latitud + 
  "<br>Longitud: " + longitud;

  fetch(
    "https://api.openweathermap.org/data/2.5/weather?lat="+latitud+"&lon="+longitud+"&appid=091960382fa3f6e096e82ae3990d8325&units=Metric"
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      clima = data.weather[0].description;
      
      ciudad.innerHTML = data.name;
  
      let codigoIcono = data.weather[0].icon;
      let rutaIcono = "https://openweathermap.org/img/w/" + codigoIcono + ".png ";
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
}

getLocation();
