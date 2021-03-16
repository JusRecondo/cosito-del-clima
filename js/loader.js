'user strict';

const loadScreen = document.querySelector('.loader-screen');

const fadeEffect = setInterval(() => {
    if(!loadScreen.style.opacity) {
        loadScreen.style.opacity = 1;
    } 

    if(loadScreen.style.opacity > 0) {
        loadScreen.style.opacity -= 0.1;
    } else {
        clearInterval(fadeEffect);
    }
}, 120);

window.addEventListener('load', fadeEffect);