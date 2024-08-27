// Save trip data to local storage
 export async function saveTripToLocal(data) {
  try {
    const depart = new Date(await data.depart);
    const weather = await data.weather;
    const ImageUrls = await data.ImageUrls;

    // Construct trip data object
    const tripData = {
      countryName: data.countryName,
      depart: depart.toISOString(), // Store in ISO format for consistency
      weather: {
        desc: weather?.desc || '',
        temp: weather?.temp || '',
        feelslike: weather?.feelslike || '' ,
        high: weather?.high || '',
        low: weather?.low || '',
      },
      imageUrls: ImageUrls,
    };

    // Retrieve existing data from local storage
    let tripArray = JSON.parse(localStorage.getItem('tripData')) || [];

    // Add new trip data to the array
    tripArray.push(tripData);

    // Save updated array back to local storage
    localStorage.setItem('tripData', JSON.stringify(tripArray));

    // Update the HTML
    displayTripData();

  } catch (error) {
    console.error('Error saving trip data:', error);
  }
}

// Function to display trip data
export function displayTripData(){
  const todayscontainer = document.getElementById('today-container');
  const upcomingscontainer = document.getElementById('upcoming-container');
  const oldscontainer = document.getElementById('old-container');
 // Initialize empty state messages
 let hasTodayTrips = false;
 let hasUpcomingTrips = false;
 let hasOldTrips = false;
  // Retrieve trip data from local storage
  const tripArray = JSON.parse(localStorage.getItem('tripData')) || [];
  // Clear existing content
  todayscontainer.innerHTML = 'Currently, there are no tody trips to display.';
  upcomingscontainer.innerHTML = 'Currently, there are no upcoming trips to display.';
  oldscontainer.innerHTML = 'Currently, there are no old trips to display.';
  const currentDate = new Date();

  // Helper function to format trip cards
  function createTripCard(data, category) {
    const depart = new Date(data.depart);
    return `
      <div class="trip-card ${category}">
        <h2>${data.countryName}</h2>
        <p><strong>Weather Description:</strong> ${data.weather.desc}</p>
        ${category === 'today' ? `
          <p><strong>Temperature:</strong> ${data.weather.temp}°C</p>
          <p><strong>Feels Like:</strong> ${data.weather.feelslike}°C</p>
        ` :` `}
         ${category === 'upcoming' ?`
          <p><strong>High Temperature:</strong> ${data.weather.high}°C</p>
          <p><strong>Low Temperature:</strong> ${data.weather.low}°C</p>`:""
         }
        <p><strong>Departure Date:</strong> ${depart.toLocaleDateString()}</p>
        <div class="images">
          ${data.imageUrls.map(url => `<img src="${url}" alt="Trip Image" />`).join('')}
        </div>
         <button type="submit" class="delete">Remove Trip</button>
      </div>
    `;
  }
  todayscontainer.innerHTML = '';
  upcomingscontainer.innerHTML = '';
  oldscontainer.innerHTML = '';


tripArray.forEach((data, index) => {
  const depart = new Date(data.depart);
  const isToday = depart.toDateString() === currentDate.toDateString();
  const isUpcoming = depart > currentDate;

  if (isToday) {
    todayscontainer.innerHTML += createTripCard(data, index, 'today');
    hasTodayTrips = true;
  } else if (isUpcoming) {
    upcomingscontainer.innerHTML += createTripCard(data, index, 'upcoming');
    hasUpcomingTrips=true;
  } else {
    oldscontainer.innerHTML += createTripCard(data, index, 'old');
    hasOldTrips=true;
  }
});
  // Show messages if no trips in a category
  if (!hasTodayTrips) {
    todayscontainer.innerHTML = 'Currently, there are no today trips to display.';
  }
  if (!hasUpcomingTrips) {
    upcomingscontainer.innerHTML = 'Currently, there are no upcoming trips to display.';
  }
  if (!hasOldTrips) {
    oldscontainer.innerHTML = 'Currently, there are no old trips to display.';
  }

// Attach delete button event listeners
document.querySelectorAll('.delete').forEach(button => {
  button.addEventListener('click', (event) => {
    const tripCard = event.target.closest('.trip-card');
    const index = tripCard.dataset.index;

    // Remove trip from local storage
    let tripArray = JSON.parse(localStorage.getItem('tripData')) || [];
    tripArray.splice(index, 1);
    localStorage.setItem('tripData', JSON.stringify(tripArray));

    // Redisplay updated data
    displayTripData();
  });
});


}