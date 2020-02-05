let save = document.querySelector('.save');
let close = document.querySelector('.close');
let change_location = document.querySelector('.change-location');
let btn_change = document.querySelector('.btn-change');
let change_city = document.querySelector('.change-city');

save.addEventListener('click',toggleWindow);
close.addEventListener('click',toggleWindow);
btn_change.addEventListener('click',toggleWindow);
// document.addEventListener("DOMContentLoaded",toggleWindow);

function toggleWindow(e){
    change_location.classList.toggle('hidden');
    e.preventDefault();
}

class UI {
    constructor(){
        this.location = document.querySelector('.current-city');
        this.general = document.querySelector('.general-weather');
        this.temperature = document.querySelector('.degrees');
        this.max = document.querySelector('#max');
        this.min = document.querySelector('#min');
        this.wind = document.querySelector('#wind');
        this.precipitation = document.querySelector('#precipitation');
        this.btn_change = document.querySelector('.btn-change');

        this.change_locationPopUp = document.querySelector('.change-location');
        this.save = document.querySelector('.save');
        this.close = document.querySelector('.close');
    }

    changeText(weather){
        this.location.innerHTML = `${weather.location}`;
        this.general.innerHTML = `The weather is fine`;
        this.temperature.innerHTML = `${weather.temperature} &#8451`;
        this.max.innerHTML = `Max temperature ${weather.max}`;
        this.min.innerHTML = `Min temperature ${weather.min}`;
        this.wind.innerHTML = `Wind speed ${weather.wind}`;
        this.precipitation.innerHTML = `Precipitation ${weather.precipitation}`;
    }
}


class Weather {
    constructor(weather){
        this.location = weather[27].replace(/"/g,'');
        this.temperature = weather[31];
        this.max = weather[29];
        this.min = weather[30];
        this.wind = weather[32];
        this.precipitation = weather[37];
    }

    static prepareData(weatherString) {
       let weather = weatherString.split(",");
       return weather;
    }
}