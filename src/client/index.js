// js files
import { apiConfig, fetchKeys } from "./js/app.js";
import { GeonamesData } from "./js/getGeoname.js";
import { PixabayImage } from "./js/getPixabayImage.js";
import { WeatherData } from "./js/getWeatherbit.js";
import Swal from 'sweetalert2';
import {saveTripToLocal,displayTripData} from "./js/displayResults.js"
// sass files
import "./styles/resets.scss";
import "./styles/base.scss";
import "./styles/footer.scss";
import "./styles/form.scss";
import "./styles/header.scss";
// import logo from './imgs/logo.png';
// document.getElementById('logo').src = logo;
document.addEventListener('DOMContentLoaded', () => {
displayTripData();
handleNavigation();});
let daysRemaining = 0;
document.getElementById("create-travel").addEventListener("submit", async function (event) {
  event.preventDefault();
  const country = document.getElementById("country").value;
  const startDate = new Date(document.getElementById("start-date").value);

  const currentDate = new Date();
  const diffInMs = startDate - currentDate;
  const msPerDay = 24 * 60 * 60 * 1000;
   daysRemaining = Math.ceil(diffInMs / msPerDay);

  console.log(`Days remaining: ${daysRemaining}`);
  try {
    await fetchKeys(); 
  let info=  await GeonamesData(country, startDate); 
  console.log(info)
  saveTripToLocal(info);
 document.getElementById("country").value='';
document.getElementById("start-date").value='';
document.getElementById('overlay').style.display='none';
    // alert("Trip details have been processed.");
  } catch (error) {
    alert("An error occurred while processing the trip details.");
  }
});

// Function to handle navigation clicks
function handleNavigation() {
  const todayContainer = document.getElementById('today-container');
  const upcomingContainer = document.getElementById('upcoming-container');
  const oldContainer = document.getElementById('old-container');

  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', (event) => {
      event.preventDefault();
      navItems.forEach(nav => nav.classList.remove('active'));

      // Add 'active' class to the clicked nav item
      item.classList.add('active');
      // Hide all containers
      todayContainer.style.display = 'none';
      upcomingContainer.style.display = 'none';
      oldContainer.style.display = 'none';

      // Show the container based on the clicked link
      const target = event.target.getAttribute('href').substring(1) + '-container';
      document.getElementById(target).style.display = 'block';
    });
  });

  // Show default container (today)
  todayContainer.style.display = 'block';
}




export {
  apiConfig,
  GeonamesData,
  PixabayImage,
  WeatherData,
  daysRemaining,
  saveTripToLocal,displayTripData,Swal
};
