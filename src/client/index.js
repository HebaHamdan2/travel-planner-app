// js files
import {apiConfig}  from './js/app.js'
import {GeonamesData} from './js/getGeoname.js'
import { PixabayImage } from './js/getPixabayImage.js'
import { WeatherData } from './js/getWeatherbit.js'
// sass files
import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'
// import logo from './imgs/logo.png';
// document.getElementById('logo').src = logo;
let daysRemaining =0;
document.getElementById('creat-travel').addEventListener('submit', async function(event) {
    event.preventDefault();

    const country = document.getElementById('country').value;
    const startDate = new Date(document.getElementById('start-date').value);
    const currentDate = new Date();
    const diffInMs = startDate - currentDate;
const msPerDay = 24 * 60 * 60 * 1000;
  daysRemaining = Math.ceil(diffInMs / msPerDay);

// console.log(`Days remaining: ${daysRemaining}`);
   GeonamesData(country);

    
});

export{
    apiConfig,GeonamesData,PixabayImage,WeatherData,  daysRemaining 
}

