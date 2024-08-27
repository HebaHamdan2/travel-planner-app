// js files
import { apiConfig, fetchKeys } from "./js/app.js";
import { GeonamesData } from "./js/getGeoname.js";
import { PixabayImage } from "./js/getPixabayImage.js";
import { WeatherData } from "./js/getWeatherbit.js";
import { postData } from "./js/sendTravelInfo.js";
import {
  fetchDataAndStore,
  getOldTravels,
  getUpcomingTravels,
} from "./js/getTravelandStore.js";
// sass files
import "./styles/resets.scss";
import "./styles/base.scss";
import "./styles/footer.scss";
import "./styles/form.scss";
import "./styles/header.scss";
// import logo from './imgs/logo.png';
// document.getElementById('logo').src = logo;
let daysRemaining = 0;
document.getElementById("create-travel").addEventListener("submit", async function (event) {
  event.preventDefault();

  // Get input values
  const country = document.getElementById("country").value;
  const startDate = new Date(document.getElementById("start-date").value);
  const currentDate = new Date();
  const diffInMs = startDate - currentDate;
  const msPerDay = 24 * 60 * 60 * 1000;
  const daysRemaining = Math.ceil(diffInMs / msPerDay);

  console.log(`Days remaining: ${daysRemaining}`);
  if (startDate < currentDate) {
    alert("The start date must be in the future.");
    return;
  }
  try {
    await fetchKeys(); 
    await GeonamesData(country, startDate); 
    alert("Trip details have been processed.");
  } catch (error) {
    console.error("An error occurred:", error);
    alert("An error occurred while processing the trip details.");
  }
});


export {
  apiConfig,
  GeonamesData,
  PixabayImage,
  WeatherData,
  daysRemaining,
  postData,
  fetchDataAndStore,
  getOldTravels,
  getUpcomingTravels,
};
