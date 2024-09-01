import { apiConfig, fetchKeys } from "./js/app.js";
import { GeonamesData } from "./js/getGeoname.js";
import { PixabayImage } from "./js/getPixabayImage.js";
import { WeatherData } from "./js/getWeatherbit.js";
import Swal from "sweetalert2";
import { displayTripData, showSpinner, hideSpinner } from "./js/displayResults.js";
import { saveTripToLocal } from './js/storeTrip.js';
// sass files
import "./styles/resets.scss";
import "./styles/base.scss";
import "./styles/footer.scss";
import "./styles/form.scss";
import "./styles/header.scss";
import "./styles/responsive.scss";
let daysRemaining;
// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const addTripButton = document.querySelector(".add-trip");
  const overlay = document.getElementById("overlay");
  const closeButton = document.querySelector(".close-btn");

  // Check if elements are present before adding event listeners
  if (addTripButton && overlay && closeButton) {
    addTripButton.addEventListener("click", () => {
      overlay.style.display = "flex";
      document.getElementById("country").value = "";
      document.getElementById("start-date").value = "";
    });

    closeButton.addEventListener("click", () => {
      overlay.style.display = "none";
      document.getElementById("country").value = "";
      document.getElementById("start-date").value = "";
    });

    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        overlay.style.display = "none";
        document.getElementById("country").value = "";
        document.getElementById("start-date").value = "";
      }
    });
  }

  displayTripData();
  handleNavigation();
});

const MAX_DAYS_AHEAD = 16; // Maximum number of days allowed in the future
const today = new Date();

// Check if element exists before adding event listener
const createTravelForm = document.getElementById("create-travel");
if (createTravelForm) {
  createTravelForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const country = document.getElementById("country").value;
    const startDate = new Date(document.getElementById("start-date").value);
    const diffInMs = startDate - today;
    const msPerDay = 24 * 60 * 60 * 1000;
    daysRemaining = Math.ceil(diffInMs / msPerDay);

    if (daysRemaining > MAX_DAYS_AHEAD) {
      Swal.fire({
        title: "Date Error",
        text: `You cannot add a trip more than ${MAX_DAYS_AHEAD} days in advance. Please select a closer date.`,
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      await fetchKeys();
      let info = await GeonamesData(country, startDate);
      saveTripToLocal(info);
      document.getElementById("country").value = "";
      document.getElementById("start-date").value = "";
      document.getElementById("overlay").style.display = "none";
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "There was an error while processing the trip details.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  });
}

// Function to handle navigation clicks
function handleNavigation() {
  const todayContainer = document.getElementById("today-container");
  const upcomingContainer = document.getElementById("upcoming-container");
  const oldContainer = document.getElementById("old-container");

  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      navItems.forEach((nav) => nav.classList.remove("active"));

      item.classList.add("active");
      todayContainer.style.display = "none";
      upcomingContainer.style.display = "none";
      oldContainer.style.display = "none";

      const target =
        event.target.getAttribute("href").substring(1) + "-container";
      const targetElement = document.getElementById(target);
      if (targetElement) {
        targetElement.style.display = "block";
      }
    });
  });

  if (todayContainer) {
    todayContainer.style.display = "block";
  }
}

export {
  apiConfig,
  fetchKeys,
  GeonamesData,
  PixabayImage,
  WeatherData,
  saveTripToLocal,
  displayTripData,
  showSpinner,
  hideSpinner,
  daysRemaining
};
