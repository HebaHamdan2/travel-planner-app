const serverURL = 'http://localhost:8081/api/travels';
export async function fetchDataAndStore() {
    try {
      // Fetch data from the server
      const response = await fetch(serverURL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const travels = await response.json();
      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  
      // Separate the data into upcoming and old travels
      const upcomingTravels = [];
      const oldTravels = [];
  
      travels.forEach(travel => {
        const departDate = new Date(travel.depart).toISOString().split('T')[0];
        if (departDate >= today) {
          upcomingTravels.push(travel);
        } else {
          oldTravels.push(travel);
        }
      });
  
      // Store in local storage
      localStorage.setItem('upcomingTravels', JSON.stringify(upcomingTravels));
      localStorage.setItem('oldTravels', JSON.stringify(oldTravels));
  
      console.log('Data successfully retrieved from server and stored in local storage');
    } catch (error) {
      console.error('Error fetching data from server or storing in local storage:', error);
    }
  }
  
  // Function to retrieve upcoming travels from local storage
  export function getUpcomingTravels() {
    return JSON.parse(localStorage.getItem('upcomingTravels')) || [];
  }
  
  // Function to retrieve old travels from local storage
  export function getOldTravels() {
    return JSON.parse(localStorage.getItem('oldTravels')) || [];
  }